import { Environment } from "@/environment/environment";
import axios from "axios";
import { Country } from "../models/country";

const axiosInstance = axios.create({
  baseURL: Environment.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// check the endpoint that response is based on the fields that we need :P
// https://restcountries.com/v3.1/all?fields=name,capital,currencies
const requireFields = 'name,population,region,subregion,capital,tld,currencies,languages,borders,flags';

export const getAllCountries = async(): Promise<Country[]> => {

  try {
    const response = await axiosInstance.get(`/all?fields=${requireFields}`);
    console.log(response.data[0]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  } 

}

export const getCountriesByRegion = async(region: string): Promise<Country[]> => {

  try {
    const response = await axiosInstance.get(`/region/${region}?fields=${requireFields}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

export const getCountryByName = async(name: string): Promise<Country[]> => {

  try {
    const response = await axiosInstance.get(`/name/${name}?fields=${requireFields}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

export const getCountryByAlphaCode = async(code: string): Promise<Country> => {

  try {
    const response = await axiosInstance.get(`/alpha/${code}?fields=${requireFields}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}