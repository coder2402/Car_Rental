import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps){
    const {manufacturer, year, model, limit, fuel} = filters;

    // Validation
    const isValidString = (val: any) => typeof val === 'string' && val.length <= 100;
    const isValidNumber = (val: any, min: number, max: number) => {
        const num = typeof val === 'number' ? val : parseInt(val as string);
        return !isNaN(num) && num >= min && num <= max;
    };

    if (manufacturer !== undefined && !isValidString(manufacturer)) return { message: "Invalid manufacturer" };
    if (model !== undefined && !isValidString(model)) return { message: "Invalid model" };
    if (fuel !== undefined && !isValidString(fuel)) return { message: "Invalid fuel type" };
    if (year !== undefined && !isValidNumber(year, 1885, 2100)) return { message: "Invalid year" };
    if (limit !== undefined && !isValidNumber(limit, 1, 50)) return { message: "Invalid limit" };

    const headers = {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const url = new URL("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars");

    if (manufacturer) url.searchParams.append('make', manufacturer);
    if (year) url.searchParams.append('year', `${year}`);
    if (model) url.searchParams.append('model', model);
    if (limit) url.searchParams.append('limit', `${limit}`);
    if (fuel) url.searchParams.append('fuel_type', fuel);

    try {
        const response = await fetch(url.toString(), {
            headers: headers,
        });

        if (!response.ok) {
            return { message: `Failed to fetch cars: ${response.status} ${response.statusText}` };
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error("Error fetching cars:", error);
        return { message: "An error occurred while fetching cars. Please try again later." };
    }
}

const currentYear = new Date().getFullYear();

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; 
    const mileageFactor = 0.1; 
    const ageFactor = 0.05; 
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (currentYear - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;

    url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || "");
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value);
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    return newPathname;
  };
