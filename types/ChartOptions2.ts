/// Death Or Total Second option ENUM
export enum DeathOrTotal {
    DEATH,
    TOTAL_CASES,
}

/// Options for second chart
/// [firstSelector]: Death or Total Cases
/// [secondSelector]: Number of countries to show
export default interface ChartOptions2 {
    firstSelector: DeathOrTotal;
    secondSelector: number;
}