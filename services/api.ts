import axios from "axios";
import { Car, ApiResponse, FilterParams } from "@/types/car";

const API_URL = "https://car-rental-api.goit.study/cars";

export const fetchCarById = async (id: string): Promise<Car> => {
  const { data } = await axios.get<Car>(`https://car-rental-api.goit.study/cars/${id}`);
  return data;
};

export const fetchCars = async ({ 
  pageParam = 1, 
  filters 
}: { 
  pageParam: number; 
  filters: FilterParams; 
}): Promise<Car[]> => {
  
 
  const { data } = await axios.get<ApiResponse>(API_URL);
  
  let filteredData = [...data.cars];

 
  if (filters.brand) {
    const searchBrand = filters.brand.toLowerCase();
    filteredData = filteredData.filter((car) => 
      car.brand.toLowerCase() === searchBrand
    );
  }

 
  if (filters.maxPrice) {
    const max = Number(filters.maxPrice);
    filteredData = filteredData.filter((car) => {
      const numericPrice = Number(car.rentalPrice.replace(/[^0-9]/g, ""));
      return numericPrice <= max;
    });
  }

  
  if (filters.minMileage) {
    const minMil = Number(filters.minMileage);
    filteredData = filteredData.filter((car) => car.mileage >= minMil);
  }

  
  if (filters.maxMileage) {
    const maxMil = Number(filters.maxMileage);
    filteredData = filteredData.filter((car) => car.mileage <= maxMil);
  }

  
  const limit = 12;
  const startIndex = 0;
  const endIndex = pageParam * limit;

  return filteredData.slice(startIndex, endIndex);
};
