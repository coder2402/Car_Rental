import { describe, test, expect } from 'bun:test';
import { calculateCarRent } from '../index';

describe('calculateCarRent', () => {
  const currentYear = new Date().getFullYear();

  test('should calculate the base rent for a new car with average MPG', () => {
    // 50 (base) + (20 * 0.1) (mileage) + (0 * 0.05) (age) = 52
    const rent = calculateCarRent(20, currentYear);
    expect(rent).toBe('52');
  });

  test('should increase rent for higher MPG (mileage factor)', () => {
    // 50 (base) + (50 * 0.1) (mileage) + (0 * 0.05) (age) = 55
    const rent = calculateCarRent(50, currentYear);
    expect(rent).toBe('55');
  });

  test('should increase rent for older cars (age factor)', () => {
    // 50 (base) + (20 * 0.1) (mileage) + (20 * 0.05) (age) = 50 + 2 + 1 = 53
    const rent = calculateCarRent(20, currentYear - 20);
    expect(rent).toBe('53');
  });

  test('should handle rounding correctly (round up)', () => {
    // 50 (base) + (20 * 0.1) (mileage) + (10 * 0.05) (age) = 50 + 2 + 0.5 = 52.5 -> "53"
    const rent = calculateCarRent(20, currentYear - 10);
    expect(rent).toBe('53');
  });

  test('should handle rounding correctly (round down)', () => {
    // 50 (base) + (24 * 0.1) (mileage) + (0 * 0.05) (age) = 50 + 2.4 + 0 = 52.4 -> "52"
    const rent = calculateCarRent(24, currentYear);
    expect(rent).toBe('52');
  });

  test('should handle very old cars', () => {
    // 50 (base) + (10 * 0.1) (mileage) + (50 * 0.05) (age) = 50 + 1 + 2.5 = 53.5 -> "54"
    const rent = calculateCarRent(10, currentYear - 50);
    expect(rent).toBe('54');
  });
});
