/// Date Covid, optional fields because not all countries have the same covid data accuracy
export interface IDate {
    date:                            string;
    new_cases?:                       number;
    new_cases_per_million?:           number;
    new_cases_smoothed?:              number;
    new_cases_smoothed_per_million?:  number;
    new_deaths?:                      number;
    new_deaths_per_million?:          number;
    new_deaths_smoothed?:             number;
    new_deaths_smoothed_per_million?: number;
    new_tests?:                       number;
    new_tests_per_thousand?:          number;
    new_tests_smoothed?:              number;
    new_tests_smoothed_per_thousand?: number;
    positive_rate?:                   number;
    reproduction_rate?:               number;
    stringency_index?:                number;
    tests_per_case?:                  number;
    tests_units?:                     string;
    total_cases?:                     number;
    total_cases_per_million?:         number;
    total_deaths?:                    number;
    total_deaths_per_million?:        number;
    total_tests?:                     number;
    total_tests_per_thousand?:        number;
}
