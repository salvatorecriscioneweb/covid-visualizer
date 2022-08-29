import '../styles/globals.css'
import { useState, useEffect, useMemo, useReducer } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Header, { ICountriesMenu } from '../components/Header'
import Tabs from '../components/Tabs'
import Chart from '../components/ChartLine'
import Loader from '../components/Loader'
import axios from 'axios'

import { reducer, initialState } from '../reducers/main'
export enum ITabs {
  REPORTED,
  RANKED
}

import type { AppProps } from 'next/app'
import ChartLine from '../components/ChartLine'
import ChartBar from '../components/ChartBar'

// Only during development
// const ORIGIN = '/owid-covid-data.json';
//
const ORIGIN = "https://covid.ourworldindata.org/data/owid-covid-data.json"
// import ExampleData from '../data/owid-covid-data.json'

function MyApp({ }: AppProps) {
  /// Data Fetched
  const [currentData, setCurrentData] = useState({})

  /// Logic for current Tab
  const [currentTab, setCurrentTab] = useState(ITabs.REPORTED)

  /// Logic to Data Fetch
  const [isLoaded, setIsLoaded] = useState(false)

  /// Redux
  const [state, dispatch] = useReducer(reducer, initialState)

  const listOfCountryMenu: ICountriesMenu[] = useMemo(() => Object.values(currentData).map((item: any) => {
    return {
      name: item.location,
      continent: item.continent,
    }
  }), [currentData])

  // Fetch the public data
  useEffect(() => {
    axios.get(ORIGIN).then((res: any) => {
      setCurrentData(res.data)
      setIsLoaded(true)
    })
  }, [])

  // Handle Dark Theme
  useEffect(() => {
    // Check for SSR
    if (typeof window != "undefined" && state.themeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [state.themeDark])

  // If not loaded, show the loader
  if (!isLoaded) {
    return <Loader />
  }
  return (
    <>
      <Head>
        <title>Covid Cases Viewer</title>
      </Head>
      <div className={`min-h-screen bg-white dark:bg-slate-700 duration-300`}>
        <Header
          countries={listOfCountryMenu}
          dispatch={dispatch}
          theme={state.themeDark}
        />
        <div className="min-h-full">
          <Tabs
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
          />
          <main role="main" className={`px-4 flex w-full h-auto p-8 pb-32 bg-gray-100 dark:bg-slate-800 duration-300`}>
            {
              currentTab == ITabs.REPORTED ?
                <ChartLine
                  currentData={currentData}
                  options={state.firstGraphOptions}
                  country={state.country}
                  themeDark={state.themeDark}
                /> :
                <ChartBar
                  currentData={currentData}
                  options={state.secondGraphOptions}
                  countryHighlighted={state.country}
                  themeDark={state.themeDark}
                />
            }
          </main>
        </div>
        <Footer
          currentTab={currentTab}
          firstGraphOptions={state.firstGraphOptions}
          dispatch={dispatch}
          secondGraphOptions={state.secondGraphOptions}
        />
      </div>
    </>
  )
  return
}

export default MyApp
