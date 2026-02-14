import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import { generateCarImageUrl } from '../index';
import { CarProps } from '@/types';

const mockCar: CarProps = {
  city_mpg: 23,
  class: "compact car",
  combination_mpg: 24,
  cylinders: 4,
  displacement: 1.6,
  drive: "fwd",
  fuel_type: "gas",
  highway_mpg: 26,
  make: "toyota",
  model: "corolla altis",
  transmission: "a",
  year: 2022,
};

describe('generateCarImageUrl', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  test('should return a valid URL string', () => {
    const url = generateCarImageUrl(mockCar);
    expect(typeof url).toBe('string');
    expect(url).toContain('https://cdn.imagin.studio/getimage');
  });

  test('should correctly append car details to URL', () => {
    const url = generateCarImageUrl(mockCar);
    expect(url).toContain('make=toyota');
    expect(url).toContain('modelFamily=corolla');
    expect(url).toContain('modelYear=2022');
  });

  test('should include the API key from environment variables', () => {
    const url = generateCarImageUrl(mockCar);
    expect(url).toContain('customer=test-api-key');
  });

  test('should use empty string if API key is missing', () => {
    delete process.env.NEXT_PUBLIC_IMAGIN_API_KEY;
    const url = generateCarImageUrl(mockCar);
    expect(url).toContain('customer=&');
  });

  test('should correctly handle the angle parameter', () => {
    const url = generateCarImageUrl(mockCar, '29');
    expect(url).toContain('angle=29');
  });

  test('should handle missing angle parameter', () => {
    const url = generateCarImageUrl(mockCar);
    expect(url).toContain('angle=undefined');
  });

  test('should correctly extract modelFamily from model string with spaces', () => {
    const carWithLongModel: CarProps = { ...mockCar, model: 'model-a model-b' };
    const url = generateCarImageUrl(carWithLongModel);
    expect(url).toContain('modelFamily=model-a');
  });
});
