/// Death Or Confirmed First Option ENUM
export enum DeathOrConfirmed {
    DEATH,
    CONFIRMED_CASES,
}
/// Daily or Comulative First Option ENUM
export enum DailyOrComulative {
    DAILY,
    COMULATIVE
}

/// Options for the first graph:
/// [firstSelector]: Death or Confirmed Cases
/// [secondSelector]: Daily or Comulative cases
export default interface ChartOptions1 {
    firstSelector: DeathOrConfirmed;
    secondSelector: DailyOrComulative;
}