import { DailyOrComulative, DeathOrConfirmed } from "../types/ChartOptions1";
import { DeathOrTotal } from "../types/ChartOptions2";

/// Redux Initial State
export const initialState = {
    country: null,
    firstGraphOptions: {
        firstSelector: DeathOrConfirmed.DEATH,
        secondSelector: DailyOrComulative.DAILY,
    },
    secondGraphOptions: {
        firstSelector: DeathOrTotal.DEATH,
        secondSelector: 10,
    },
    themeDark: false,
}

export enum UIActions {
    SET_COUNTRY,
    SWITCH_FIRST_SELECTOR_FIRST_CHART,
    SWITCH_SECOND_SELECTOR_FIRST_CHART,
    SWITCH_FIRST_SELECTOR_SECOND_CHART,
    SWITCH_SECOND_SELECTOR_SECOND_CHART,
    SWITCH_THEME,
}

export interface IAction {
    type: UIActions;
    data: any;
}

export function reducer(state : any, action:IAction) {
    switch(action.type) {
        case UIActions.SWITCH_THEME:
            return {
                ...state,
                themeDark: !state.themeDark,
            }
        case UIActions.SET_COUNTRY:
            return {
                ...state,
                country: action.data.country,
            }
        case UIActions.SWITCH_FIRST_SELECTOR_FIRST_CHART:
            return {
                ...state,
                firstGraphOptions: {
                    ...state.firstGraphOptions,
                    firstSelector: state.firstGraphOptions.firstSelector == DeathOrConfirmed.DEATH ? DeathOrConfirmed.CONFIRMED_CASES : DeathOrConfirmed.DEATH , 
                }
            }
        case UIActions.SWITCH_SECOND_SELECTOR_FIRST_CHART:
            return {
                ...state,
                firstGraphOptions: {
                    ...state.firstGraphOptions,
                    secondSelector: state.firstGraphOptions.secondSelector == DailyOrComulative.DAILY ? DailyOrComulative.COMULATIVE : DailyOrComulative.DAILY,
                }
            }
        case UIActions.SWITCH_FIRST_SELECTOR_SECOND_CHART:
            return {
                ...state,
                secondGraphOptions: {
                    ...state.secondGraphOptions,
                    firstSelector: state.secondGraphOptions.firstSelector == DeathOrTotal.DEATH ? DeathOrTotal.TOTAL_CASES : DeathOrTotal.DEATH,
                }
            }
        case UIActions.SWITCH_SECOND_SELECTOR_SECOND_CHART:
            return {
                ...state,
                secondGraphOptions: {
                    ...state.secondGraphOptions,
                    secondSelector: action.data.counter,
                }
            }
            
    }
}