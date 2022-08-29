import { ITabs } from "../pages/_app"
import Tab from "./Tab";

/// Props:
/// [currentTab]: Current active tab
/// [setCurrentTab]: Function to change Tab from parent
export interface IProps {
    currentTab: ITabs;
    setCurrentTab: Function;
}


/// Tabs Containers
function Tabs(props: IProps) {
    const { currentTab, setCurrentTab } = props

    return <div className={`flex w-full `} role="tabpanel">
        <Tab
            tab={ITabs.REPORTED}
            active={currentTab == ITabs.REPORTED}
            onClick={() => setCurrentTab(ITabs.REPORTED)}
        />
        <Tab
            tab={ITabs.RANKED}
            active={currentTab == ITabs.RANKED}
            onClick={() => setCurrentTab(ITabs.RANKED)}
        />
    </div>
}

export default Tabs