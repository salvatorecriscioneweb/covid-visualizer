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

import { reducer, initialState, UIActions } from '../reducers/main'
export enum ITabs {
  REPORTED,
  RANKED
}

import type { AppProps } from 'next/app'
import ChartLine from '../components/ChartLine'
import ChartBar from '../components/ChartBar'

// Only during development
// const ORIGIN = '/owid-covid.json';
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

  /// List of country for menu, cleaned from the original to don't pass as props a big array and save memory
  const listOfCountryMenu: ICountriesMenu[] = useMemo(() => Object.values(currentData).map((item: any) => {
    return {
      name: item.location,
      continent: item.continent,
    }
  }), [currentData]) /* Update only on change data */

  useEffect(() => {
    // Check for Dark Theme at first render
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      // If user already have a theme, keep it
      dispatch({
        type: UIActions.SWITCH_THEME,
        data: undefined
      })
    }

    // Fetch the data
    axios.get(ORIGIN).then((res: any) => {
      setCurrentData(res.data)
      setIsLoaded(true)
    })
  }, []) /* Do Only Once */

  // Handle Dark Theme
  useEffect(() => {
    // Check for SSR
    if (typeof window != "undefined" && state.themeDark) {
      document.documentElement.classList.add('dark')
      // save theme to local storage
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      // save theme to local storage
      localStorage.theme = 'light'
    }
  }, [state.themeDark])

  // If not loaded, show the loader
  if (!isLoaded) {
    return <Loader />
  }

  return (
    <>
      <Head>
        <title>Covid Visualizer</title>
      </Head>
      <div className={`min-h-screen bg-white dark:bg-slate-700 duration-300`}>
        {/* Header */}
        <Header
          countries={listOfCountryMenu}
          theme={state.themeDark}
          dispatch={dispatch}
        />
        <div className="min-h-full">
          {/* Tabs */}
          <Tabs
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
          />
          {/* Graphs */}
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
        {/* Footer */}
        <Footer
          currentTab={currentTab}
          firstGraphOptions={state.firstGraphOptions}
          secondGraphOptions={state.secondGraphOptions}
          dispatch={dispatch}
        />
      </div>
    </>
  )
  return
}

export default MyApp
