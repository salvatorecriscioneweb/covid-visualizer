import { useState, useEffect } from 'react'
import Spinner from './Spinner'

/// Loader's Props, not accepting any props
export interface IProps { }

/// Loader
function Loader(props: IProps) {
    // Just for the animation :)
    const [currentDot, setCurrentDot] = useState(0)

    useEffect(() => {
        // Not required Interval because function is called every time currentDot changes
        let timer = setTimeout(() => {
            setCurrentDot((current) => (current + 1) % 4)
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [currentDot])

    return <div className="fixed z-50 bg-white dark:bg-slate-900 bg-opacity-90 w-full grid top-0 left-0 place-items-center h-screen">
        <div>
            <Spinner />
            <h3 className='text-black dark:text-white font-mono text-center'>Loading data
                {
                    Array(currentDot)
                        .fill('.')
                        .map((i, ii) => <span key={`dot-${ii}`}>.</span>)
                }
                {
                    /* Add Spaces to avoid the problem of text center moving */
                    Array(3 - currentDot)
                        .fill('.')
                        .map((i, ii) => <span key={`space-${ii}`}>&nbsp;</span>)
                }
            </h3>
        </div>
    </div>
}

export default Loader