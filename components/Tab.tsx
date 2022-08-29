import { ITabs } from "../pages/_app";

/// Props
export interface Props {
    tab: ITabs;
    active: boolean;
    onClick: Function;
}

/// Define the Tab Style
interface TabStyle {
    text: string;
    color: string;
    colorActive: string;
}

/// Custom Tailwind Tab for Covid Visualizer
function Tab(props: Props) {
    /// Current Style
    let tabText: TabStyle

    // Customize the Tab based on Type
    switch (props.tab) {
        case ITabs.REPORTED:
            tabText = {
                text: 'Reported cases',
                color: 'bg-sky-300 dark:bg-sky-700',
                colorActive: 'bg-gray-100 dark:bg-slate-800',
            }
            break
        case ITabs.RANKED:
            tabText = {
                text: 'Ranked charts',
                color: 'bg-sky-300 dark:bg-sky-700',
                colorActive: 'bg-gray-100 dark:bg-slate-800',
            }
            break

    }
    return <div
        onClick={() => props.onClick()}
        className={`w-1/2 rounded-t-2xl sm:rounded-t-3xl text-center dark:text-white py-4 px-8 duration-300 ${props.active ? tabText.colorActive : tabText.color + ' hover:bg-gray-300 hover:dark:bg-sky-600'} ${props.active ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'} `}>
        <span className={`text-md sm:text-xl`}>{tabText?.text ?? '-'}</span>
    </div>
}

export default Tab