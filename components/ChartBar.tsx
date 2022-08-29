import React, { useMemo, useRef } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import ChartOptions2, { DeathOrTotal } from '../types/ChartOptions2'

// Types
import { ICountry } from '../types/Country'
import { IDate } from '../types/Date'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


/// Chart Bar Props
export interface IProps {
    options: ChartOptions2;
    currentData: Object;
    countryHighlighted: string;
    themeDark: boolean;
}

/// Chart Bar ( First Chart Tab )
function ChartBar(props: IProps) {
    // Get the current ref of chart
    const chartRef: any = useRef(null);

    // UseMemo to reduce workload every render
    const dataRaw: Map<string, number> = useMemo(() => {
        // Empty data set, using map to fast get through the informations
        let dataSet: Map<string, number> = new Map<string, number>();

        // Loop between values, filter for the continent to check only countries, and not part of the world (for example, we want to filter "World" from this step )
        Object.values(props.currentData).filter((i: ICountry) => i.continent).forEach((nation: ICountry) => {
            let counter = 0;
            // Loop between every day of single country
            nation.data?.forEach((day: IDate) => {
                if (props.options.firstSelector == DeathOrTotal.DEATH) {
                    counter += (day.new_deaths || 0)
                } else {
                    counter += (day.new_cases || 0)
                }
            })
            dataSet.set(nation.location, counter)
        })

        // Sort function to check 
        const sortCountries = (a: [string, number], b: [string, number]) => {
            if (a[1] === Infinity || isNaN(b[1]))
                return 1;
            else if (isNaN(a[1]) || (a[1] === Infinity))
                return -1;
            else
                return a[1] - b[1];
        }

        // Return the Map
        return new Map(
            Array
                .from(dataSet)
                .sort(sortCountries)
                .reverse()
        )
    }, [props.currentData, props.options, props.countryHighlighted])


    // Chart JS Options
    const options: any = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `Top ${props.options.secondSelector} countries`,
                color: props.themeDark ? '#333' : 'black',
            },
        },
        scales: {
            y: {
                ticks: {
                    color: props.themeDark ? 'white' : 'black',
                    font: {
                        size: 12,
                    },
                    beginAtZero: true
                },
                grid: {
                    display: false,
                }
            },
            x: {
                ticks: {
                    color: props.themeDark ? 'white' : 'black',
                    font: {
                        size: 10,
                    },
                    beginAtZero: true
                },
                grid: {
                    borderColor: props.themeDark ? 'white' : 'black',
                    tickColor: props.themeDark ? 'white' : 'black',
                    color: props.themeDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                }
            }
        }
    };

    // Chartjs Options
    const labels: string[] = Array.from(dataRaw.keys()).slice(0, props.options.secondSelector)

    // If searched country missing from list, add it at the bottom
    if (props.countryHighlighted && labels.indexOf(props.countryHighlighted) < 0) {
        labels.push(props.countryHighlighted)
    }

    // Data set Chart
    const data: any = {
        labels,
        datasets: [
            {
                label: 'Number',
                data: labels.map((label) => dataRaw.get(label)),
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: (context: any) => {
                    if (props.countryHighlighted) {
                        const i: number = labels.indexOf(props.countryHighlighted)
                        if (i >= 0) {
                            if (context.dataIndex == i) {
                                return '#488f31'
                            }
                        }
                    }
                    return 'rgb(125,211,252)'
                },
            },
        ],
    };


    return <div className={`w-full sm:w-[80vw] mx-auto h-[64vh]`}>
        <Bar
            ref={chartRef}
            options={options}
            data={data}
        />
    </div>
}
export default ChartBar