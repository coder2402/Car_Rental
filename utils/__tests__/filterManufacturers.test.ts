import { describe, test, expect } from 'bun:test';
import { filterManufacturers } from '../index';

describe('filterManufacturers', () => {
  const manufacturers = [
    "Acura",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
  ];

  test('should return all manufacturers when query is empty', () => {
    const result = filterManufacturers("", manufacturers);
    expect(result).toEqual(manufacturers);
  });

  test('should return matching manufacturers case insensitive', () => {
    const result = filterManufacturers("alfa", manufacturers);
    expect(result).toEqual(["Alfa Romeo"]);
  });

  test('should return matching manufacturers ignoring spaces', () => {
    const result = filterManufacturers("alfaromeo", manufacturers);
    expect(result).toEqual(["Alfa Romeo"]);
  });

  test('should return matching manufacturers with spaces in query', () => {
    const result = filterManufacturers("alfa romeo", manufacturers);
    expect(result).toEqual(["Alfa Romeo"]);
  });

  test('should return multiple matches', () => {
    const result = filterManufacturers("a", manufacturers);
    // Acura, Alfa Romeo, Aston Martin, Audi
    expect(result).toEqual(["Acura", "Alfa Romeo", "Aston Martin", "Audi"]);
  });

  test('should return empty array if no match', () => {
      const result = filterManufacturers("xyz", manufacturers);
      expect(result).toEqual([]);
  });
});
