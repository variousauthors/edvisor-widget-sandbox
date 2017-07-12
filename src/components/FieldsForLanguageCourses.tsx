import * as React from 'react';

import Select from './Select';

function DurationFilter ({ duration, durationTypes, onChange }) {

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
    <div>
      <Select
        data={ locations }
        valueKey = "id"
        defaultText="Select a Location"
        defaultValue=""
        onChange={ (value) => onChange({ googlePlaceIds: [value] }) }
      />
    </div>
  )
}

function CourseTypeFilter ({ offeringTypes, onChange }) {

  return (
    <div>
      <label>
        <span>Course Type: </span>
        <Select 
          data={ offeringTypes }
          valueKey = "id"
          defaultText = "Select a Course Type"
          onChange={ (value) => { onChange({ offeringTypes: [value]}); } }
        />
      </label>
    </div>
  )
}
export default function FieldsForLanguageCourses ({ locations, offeringTypes, duration, durationTypes, onChange }) {

  return (
    <fieldset>
      <legend>Language Courses</legend>
      <LocationFilter 
        locations={ locations } 
        onChange={ onChange } />
      <CourseTypeFilter 
        offeringTypes={ offeringTypes } 
        onChange={ onChange } />
      <DurationFilter 
        duration={ duration }
        durationTypes={ durationTypes }
        onChange={ onChange } />
    </fieldset>
  )
}
