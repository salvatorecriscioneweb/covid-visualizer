import { useMemo } from 'react';
import Select from 'react-select';
import { UIActions } from '../reducers/main';
import { ICountriesMenu } from "./Header";

export interface ICountriesPickerProps {
    countries?: ICountriesMenu[];
    dispatch: Function;
}

function CountriesPicker(props: ICountriesPickerProps) {
    const items = useMemo(() => props.countries?.filter((i: any) => i.continent), [props.countries])

    const { dispatch } = props
    return <>
        <Select<ICountriesMenu>
            id="country-select"
            className="react-select-spa-container w-[90%]"
            classNamePrefix="react-select-spa"
            getOptionLabel={(country: ICountriesMenu) => `${country.name} ${country.continent ? '(' + country.continent + ')' : ''}`}
            getOptionValue={(country: ICountriesMenu) => country.name}
            onChange={(value) => {
                dispatch({
                    type: UIActions.SET_COUNTRY,
                    data: {
                        country: value?.name,
                    }
                })
            }}
            placeholder={`Select Country`}
            isClearable={true}
            isSearchable={true}
            name="countries"
            options={items}
        />
    </>
}

export default CountriesPicker