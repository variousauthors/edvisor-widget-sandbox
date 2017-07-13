import * as React from 'react';

import IntegerRangeInput from './IntegerRangeInput';
import Select from './Select';

function AgeFilter ({ age={ years: "0", range: "lte" }, onChange }) {

  let boundsOptions = [
    { value: 'gte', name: "and older" },
    { value: 'lte', name: "and younger" },
    { value: 'eq', name: "exactly" },
  ]

  return (
    <IntegerRangeInput 
      initialValue={ age.years }
      initialBounds={ age.range }
      vocab={ { value: "age", bounds: "ageRange" } }
      boundsOptions={ boundsOptions } 
      onChange={ (value) => { onChange(value) } } 
    />
  )
}

function NationalityFilter ({ countries, onChange }) {

  return (
    <Select
      data={ countries }
      valueKey = "countryId"
      nameKey = "nameTranslation"
      defaultValue=""
      onChange={ (value) => onChange({ nationalityId: value }) }
    />
  )
}

export default function FieldsForStudentInformation (ownProps: any) {
  const { age, countries, editSearchFilters, error, isLoading } = ownProps;

  if (error) {
    return ( <div>Error! {error}</div> );
  }

  if (isLoading) {
    return ( <div>Loading</div> );
  }

  debugger

  return (
    <fieldset>
      <legend>Student Information</legend>
      <NationalityFilter countries= { countries } onChange={ editSearchFilters } />
      <AgeFilter age={ age } onChange={ editSearchFilters } />
    </fieldset>
  )
}
