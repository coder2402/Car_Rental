import { describe, test, expect } from 'bun:test';
import { checkIsDataEmpty } from '../index';

describe('checkIsDataEmpty', () => {
    test('should return true for null', () => {
        expect(checkIsDataEmpty(null)).toBe(true);
    });

    test('should return true for undefined', () => {
        expect(checkIsDataEmpty(undefined)).toBe(true);
    });

    test('should return true for an empty array', () => {
        expect(checkIsDataEmpty([])).toBe(true);
    });

    test('should return true for a non-array object (e.g., error response)', () => {
        expect(checkIsDataEmpty({ message: 'Error' })).toBe(true);
    });

    test('should return false for a non-empty array', () => {
        const cars = [{ make: 'Toyota', model: 'Camry', year: 2022 }];
        expect(checkIsDataEmpty(cars)).toBe(false);
    });
});
