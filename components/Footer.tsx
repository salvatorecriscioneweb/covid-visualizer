import { ITabs } from "../pages/_app"
import { UIActions } from "../reducers/main";
import Select from 'react-select';
import ChartOptions1, { DailyOrComulative, DeathOrConfirmed } from "../types/ChartOptions1";
import ChartOptions2, { DeathOrTotal } from "../types/ChartOptions2";

/// Footer Props
/// [currentTab]: Current Tab
/// [firstGraphOptions]: Options first Chart
/// [secondGraphOptions]: Options second Chart
/// [dispatch]: Dispatch Function for Redux
export interface IProps {
    currentTab: ITabs;
    firstGraphOptions: ChartOptions1;
    secondGraphOptions: ChartOptions2;
    dispatch: Function;
}

/// Number Options Interface
interface NumberOption {
    label: string;
    value: number;
}

/// Footer, Panel Chart Control
function Footer(props: IProps) {
    const { dispatch } = props

    return <footer className="flex h-24 w-full justify-center px-8 items-center rounded-t-[3rem] border-t dark:border-t-black bg-white dark:text-white dark:bg-slate-700 fixed bottom-0 left-0">
        {
            props.currentTab == ITabs.REPORTED ?
                <>
                    <label
                        htmlFor="first-ui-selector"
                        className="flex items-center cursor-pointer"
                    >
                        <div className="relative">
                            <input
                                id="first-ui-selector"
                                onChange={(evt) => {
                                    dispatch({
                                        type: UIActions.SWITCH_FIRST_SELECTOR_FIRST_CHART,
                                    })
                                }}
                                checked={props.firstGraphOptions.firstSelector == DeathOrConfirmed.CONFIRMED_CASES}
                                type="checkbox"
                                className="sr-only"
                            />
                            <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                        </div>
                        <div className="ml-3 text-gray-700 dark:text-white font-medium">
                            Show Confirmed Cases
                        </div>
                    </label>
                    <label
                        htmlFor="second-ui-selector"
                        className="flex items-center cursor-pointer ml-16"
                    >
                        <div className="relative">
                            <input
                                id="second-ui-selector"
                                onChange={(evt) => {
                                    dispatch({
                                        type: UIActions.SWITCH_SECOND_SELECTOR_FIRST_CHART,
                                    })
                                }}
                                checked={props.firstGraphOptions.secondSelector == DailyOrComulative.COMULATIVE}
                                type="checkbox"
                                className="sr-only"
                            />
                            <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                        </div>
                        <div className="ml-3 text-gray-700 dark:text-white font-medium">
                            Show Comulative Cases
                        </div>
                    </label>
                </> : <>
                    <label
                        htmlFor="second-ui-selector"
                        className="flex items-center cursor-pointer"
                    >
                        <div className="relative">
                            <input
                                id="second-ui-selector"
                                onChange={(evt) => {
                                    dispatch({
                                        type: UIActions.SWITCH_FIRST_SELECTOR_SECOND_CHART,
                                    })
                                }}

                                type="checkbox"
                                className="sr-only"
                            />
                            <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                        </div>
                        <div className="ml-3 text-gray-700 dark:text-white font-medium">
                            Show Confirmed Cases
                        </div>
                    </label>
                    <Select<NumberOption>
                        id="chart-control-2"
                        className="react-select-spa-container ml-16"
                        classNamePrefix="react-select-spa"
                        placeholder={`Country to show`}
                        defaultValue={{
                            value: 10,
                            label: '10'
                        }}
                        onChange={(value) => {
                            dispatch({
                                type: UIActions.SWITCH_SECOND_SELECTOR_SECOND_CHART,
                                data: {
                                    counter: value?.value || 10
                                }
                            })
                        }}
                        isClearable={false}
                        isSearchable={false}
                        menuPlacement={'top'}
                        options={[
                            {
                                value: 10,
                                label: '10'
                            }, {
                                value: 20,
                                label: '20'
                            }, {
                                value: 30,
                                label: '30'
                            },
                        ]}
                        getOptionLabel={(option: NumberOption) => option.label}
                        getOptionValue={(option: NumberOption) => option.value.toString()}

                    />
                </>
        }
    </footer>
}

export default Footer