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
                    <input
                        type="checkbox"
                        onChange={(evt) => {
                            dispatch({
                                type: UIActions.SWITCH_FIRST_SELECTOR_FIRST_CHART,
                            })
                        }}
                        checked={props.firstGraphOptions.firstSelector != DeathOrConfirmed.DEATH}
                    />
                    <span className="pl-2">
                        Show Confirmed Cases</span>
                    <input
                        className="ml-16"
                        type="checkbox"
                        onChange={(evt) => {
                            dispatch({
                                type: UIActions.SWITCH_SECOND_SELECTOR_FIRST_CHART,
                            })
                        }}
                        checked={props.firstGraphOptions.secondSelector != DailyOrComulative.DAILY}
                    />
                    <span className="pl-2">
                        Show Comulative Cases</span>
                </> : <>
                    <input
                        type="checkbox"
                        onChange={(evt) => {
                            dispatch({
                                type: UIActions.SWITCH_FIRST_SELECTOR_SECOND_CHART,
                            })
                        }}
                        checked={props.secondGraphOptions?.firstSelector != DeathOrTotal.DEATH}
                    />
                    <span className="pl-2">Show Confirmed Cases</span>
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