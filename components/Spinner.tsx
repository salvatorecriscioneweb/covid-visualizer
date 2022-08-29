import { RevolvingDot, } from 'react-loader-spinner'

function Spinner() {
    return <RevolvingDot
        height="100"
        width="100"
        color="rgba(255, 99, 132, 1)"
        secondaryColor=''
        ariaLabel="revolving-dot-loading"
        radius="5"
        wrapperStyle={{}}
        wrapperClass="mx-auto justify-center mb-10"
        visible={true}
    />
}

export default Spinner