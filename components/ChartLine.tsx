import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import ChartOptions1, { DailyOrComulative, DeathOrConfirmed } from '../types/ChartOptions1'
import { useMemo } from 'react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export interface IProps {
    currentData: Object;
    options: ChartOptions1;
    country?: string;
    themeDark: boolean;
}

function ChartLine(props: IProps) {
    const dataRaw: any = useMemo(() => {
        let dataSet: Map<string, number> = new Map<string, number>();

        Object.values(props.currentData).filter((i: any) => i.continent).filter((i: any) => props.country ? i.location == props.country : true).forEach((nation: any) => {
            nation.data?.forEach((day: any) => {
                if (props.options.firstSelector == DeathOrConfirmed.DEATH) {
                    if (props.options.secondSelector == DailyOrComulative.COMULATIVE) {
                        dataSet.set(day.date, day.total_deaths ? (dataSet.get(day.date) ?? 0) + day.total_deaths : (dataSet.get(day.date) ?? 0))
                    } else {
                        dataSet.set(day.date, day.new_deaths ? (dataSet.get(day.date) ?? 0) + day.new_deaths : (dataSet.get(day.date) ?? 0))
                    }
                } else {
                    if (props.options.secondSelector == DailyOrComulative.COMULATIVE) {
                        dataSet.set(day.date, day.total_cases ? (dataSet.get(day.date) ?? 0) + day.total_cases : (dataSet.get(day.date) ?? 0))
                    } else {
                        dataSet.set(day.date, day.new_cases ? (dataSet.get(day.date) ?? 0) + day.new_cases : (dataSet.get(day.date) ?? 0))
                    }
                }
            })
        })
        const sortStringKeys = (a: [string, number], b: [string, number]) => {
            return (new Date(a[0]).getTime()) - (new Date(b[0]).getTime());
        }
        return new Map(
            Array
                .from(dataSet)
                .sort(sortStringKeys)
        )
    }, [props.currentData, props.options, props.country])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                color: props.themeDark ? 'white' : 'black',
                text: props.options.firstSelector == DeathOrConfirmed.DEATH ? 'Covid Deaths counter' : 'Confirmed Cases Counter',
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
                    borderColor: props.themeDark ? 'white' : 'black',
                    tickColor: props.themeDark ? 'white' : 'black',
                    color: props.themeDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
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
                    display: false,
                }
            }
        }
    };

    const labels = Array.from(dataRaw.keys())

    const data = {
        labels,
        datasets: [
            {
                label: 'Number',
                data: labels.map((label) => dataRaw.get(label)),
                borderColor: props.options.firstSelector == DeathOrConfirmed.DEATH ? 'rgb(255, 99, 132)' : 'rgb(132, 99, 255)',
                backgroundColor: props.options.firstSelector == DeathOrConfirmed.DEATH ? 'rgba(255, 99, 132, 0.5)' : 'rgb(132, 99, 255, 0.5)',
            },
        ],
    };


    return <div className={`w-full sm:w-[80vw] mx-auto h-[64vh]`}>
        <Line options={options} data={data} />
    </div>
}
export default ChartLine