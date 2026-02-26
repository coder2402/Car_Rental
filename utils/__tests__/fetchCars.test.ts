import { describe, test, expect, beforeEach, afterEach, mock } from 'bun:test';
import { fetchCars } from '../index';
import { FilterProps } from '@/types';

describe('fetchCars', () => {
    let fetchMock: any;

    beforeEach(() => {
        fetchMock = mock(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve([])
        }));
        global.fetch = fetchMock;
    });

    afterEach(() => {
        global.fetch = undefined as any;
    });

    test('should return error message when fetch rejects', async () => {
        fetchMock.mockImplementation(() => Promise.reject(new Error('Network error')));

        const result = await fetchCars({ manufacturer: 'Toyota' });

        expect(result).toEqual({ message: "An error occurred while fetching cars. Please try again later." });
    });

    test('should return error message when response is not ok', async () => {
        fetchMock.mockImplementation(() => Promise.resolve({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
        }));

        const result = await fetchCars({ manufacturer: 'Toyota' });

        expect(result).toEqual({ message: "Failed to fetch cars: 500 Internal Server Error" });
    });

    test('should return error message when json parsing fails', async () => {
        fetchMock.mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.reject(new Error('Invalid JSON'))
        }));

        const result = await fetchCars({ manufacturer: 'Toyota' });

        expect(result).toEqual({ message: "An error occurred while fetching cars. Please try again later." });
    });

    test('should properly encode special characters in query parameters', async () => {
        const filters: FilterProps = {
            manufacturer: 'Ford & Co',
            year: 2022,
            model: 'Focus ST',
            limit: 10,
            fuel: 'gas'
        };

        await fetchCars(filters);

        const calledUrl = fetchMock.mock.calls[0][0];

        // We expect parameters to be URL encoded
        // Space -> %20 or +
        // & -> %26
        expect(calledUrl).toContain('make=Ford+%26+Co');
        expect(calledUrl).toContain('model=Focus+ST');
    });

    test('should construct URL with correct base and parameters', async () => {
        const filters: FilterProps = {
            manufacturer: 'Toyota',
            year: 2023,
            model: 'Camry',
            limit: 5,
            fuel: 'hybrid'
        };

        await fetchCars(filters);

        const calledUrl = fetchMock.mock.calls[0][0];
        expect(calledUrl).toContain('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars');
        expect(calledUrl).toContain('make=Toyota');
        expect(calledUrl).toContain('year=2023');
        expect(calledUrl).toContain('model=Camry');
        expect(calledUrl).toContain('limit=5');
        expect(calledUrl).toContain('fuel_type=hybrid');
    });

    describe('validation', () => {
        test('should return error for invalid manufacturer (too long)', async () => {
            const result = await fetchCars({ manufacturer: 'a'.repeat(101) });
            expect(result).toEqual({ message: "Invalid manufacturer" });
        });

        test('should return error for invalid model (too long)', async () => {
            const result = await fetchCars({ model: 'a'.repeat(101) });
            expect(result).toEqual({ message: "Invalid model" });
        });

        test('should return error for invalid fuel type (too long)', async () => {
            const result = await fetchCars({ fuel: 'a'.repeat(101) });
            expect(result).toEqual({ message: "Invalid fuel type" });
        });

        test('should return error for invalid year (too small)', async () => {
            const result = await fetchCars({ year: 1884 });
            expect(result).toEqual({ message: "Invalid year" });
        });

        test('should return error for invalid year (too large)', async () => {
            const result = await fetchCars({ year: 2101 });
            expect(result).toEqual({ message: "Invalid year" });
        });

        test('should return error for invalid limit (too small)', async () => {
            const result = await fetchCars({ limit: 0 });
            expect(result).toEqual({ message: "Invalid limit" });
        });

        test('should return error for invalid limit (too large)', async () => {
            const result = await fetchCars({ limit: 51 });
            expect(result).toEqual({ message: "Invalid limit" });
        });

        test('should handle numeric strings for year and limit', async () => {
            // @ts-ignore
            await fetchCars({ year: '2022', limit: '10' });
            const calledUrl = fetchMock.mock.calls[0][0];
            expect(calledUrl).toContain('year=2022');
            expect(calledUrl).toContain('limit=10');
        });

        test('should return error for non-numeric strings for year', async () => {
            // @ts-ignore
            const result = await fetchCars({ year: 'abc' });
            expect(result).toEqual({ message: "Invalid year" });
        });
    });
});
