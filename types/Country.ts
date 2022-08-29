import { IDate } from "./Date";

/// Country Interface, ignoring the rest because not useful
export interface ICountry {
    // Continent
    continent?: string;
    // Location
    location:  string;
    // Days
    data: IDate[]
}
