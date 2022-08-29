import { UIActions } from "../reducers/main";
import CountriesPicker from "./CountriesPicker";

export interface ICountriesMenu {
    name: string;
    continent: string;
}

export interface IProps {
    countries?: ICountriesMenu[];
    dispatch: Function;
    theme: boolean;
}

function Header(props: IProps) {
    const { dispatch } = props

    return <header className={`dark:bg-slate-700 h-20 w-full mx-auto px-4 sm:px-20 pt-2 text-center flex justify-between align-top`}>
        <h1 className="pt-3 text-md text-left sm:text-center sm:text-2xl text-slate-600 dark:text-white">
            {''}
            Simple Covid Visualizer
        </h1>
        <div className="flex">
            <div className="pt-3 w-[200px] sm:w-[400px]">
                <CountriesPicker
                    dispatch={dispatch}
                    countries={props.countries}
                />
            </div>
            <button
                id="theme-toggle"
                type="button"
                role="switch"
                aria-checked={props.theme}
                className="text-gray-500 dark:text-gray-400 focus:outline-non dark:focus:ring-gray-700 rounded-lg h-16 px-2.5"
                onClick={() => {
                    dispatch({
                        type: UIActions.SWITCH_THEME
                    })
                }}
            >
                <svg id="theme-toggle-dark-icon" className={`${!props.theme ? '' : 'hidden'} w-5 h-5`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                <svg
                    id="theme-toggle-light-icon"
                    className={`${props.theme ? '' : 'hidden'} w-5 h-5`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fillRule="evenodd" clipRule="evenodd">
                    </path>
                </svg>
            </button>
        </div>
    </header>
}

export default Header