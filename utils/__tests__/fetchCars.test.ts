import { describe, test, expect, beforeEach, afterEach, mock } from 'bun:test';
import { fetchCars } from '../index';
import { FilterProps } from '@/types';

describe('fetchCars', () => {
    let fetchMock: any;

    beforeEach(() => {
        fetchMock = mock(() => Promise.resolve({
            json: () => Promise.resolve([])
        }));
        global.fetch = fetchMock;
    });

    afterEach(() => {
        global.fetch = undefined as any;
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
});
