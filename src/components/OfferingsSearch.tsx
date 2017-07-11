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

function DurationFilter ({ duration, durationTypes, onChange }) {
  console.log(duration);

  let rangeOptions = [
    { value: 'any', name: "any" },
    { value: 'gte', name: "at least" },
  ]

  let durationTypeDetails = (duration.range !== 'gte')? null : (
    <span>
      <input type='number' min='0' step='1' value={ duration.amount } onChange={ (e) => onChange({ durationAmount: e.target.value }) } />
      <Select defaultValue={ duration.id } data={ durationTypes } valueKey="id" onChange={ (value) => onChange({ durationTypeId: value }) } />
    </span>
  );

  return (
    <div>
      <label>Duration:
        <Select 
          defaultValue={ duration.range }
          data={ rangeOptions } 
          onChange={ (value) => onChange({ durationTypeRange: value }) } />

        { durationTypeDetails }
      </label>
    </div>
  )
}

function LocationFilter ({ location = "Select a Location", locations, onChange }) {

  return (
      <Select
        data={ locations }
        valueKey = "id"
        defaultText="Select a Location"
        defaultValue=""
        onChange={ (value) => onChange({ googlePlaceIds: [value] }) }
      />
  )
}

function CourseTypeFilter ({ offeringTypes, onChange }) {

  return (
    <label>
      <span>Course Type: </span>
      <Select 
        data={ offeringTypes }
        valueKey = "id"
        defaultText = "Select a Course Type"
        onChange={ (value) => { onChange({ offeringTypes: [value]}); } }
      />
    </label>
  )
}

export default function OfferingsSearch (props: any) {

  if (props.error) {
    return ( <div>Error! {props.error}</div> );
  }

  if (props.isLoading) {
    return ( <div>Loading</div> );
  }

  let setFilter = (value) => props.editSearchFilters(value);

  return (
    <form onSubmit={ (e) => { e.preventDefault(); props.publishSearchFilters(); } } >
      <LocationFilter 
        locations={ props.locations } 
        onChange={ setFilter } />
      <AgeFilter age={ props.age } onChange={ setFilter } />
      <CourseTypeFilter offeringTypes={ props.offeringTypes } onChange={ setFilter } />
      <DurationFilter 
        duration={ props.duration }
        durationTypes={ props.durationTypes }
        onChange={ (value) => { props.editSearchFilters(value) } }
       />
      <div>
        <input type="submit" value="Find Courses" />
      </div>
    </form>
  )
}

