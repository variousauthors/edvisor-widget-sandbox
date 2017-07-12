import * as React from 'react';

import Select from './Select';
import ModalComponents from './ModalComponents';

function DurationFilter (props: any) {
  const { duration, durationTypes, onChange } = props;
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

function LocationFilter (props: any) {
  const { location = "Select a Location", locations, onChange } = props;

  return (
    <div>
      <Select
        data={ locations }
        valueKey = "id"
        defaultText={ location }
        defaultValue=""
        onChange={ (value) => onChange({ googlePlaceIds: [value] }) }
      />
    </div>
  )
}

function CourseTypeFilter (props: any) {
  const { offeringTypes, onChange } = props;

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

interface FieldsForLanguageCoursesByLocationProps {
  locations: any,
  offeringTypes: any,
  duration: any,
  durationTypes: any,
  editSearchFilters: any,
}
function FieldsForLanguageCoursesByLocation (props: FieldsForLanguageCoursesByLocationProps) {
  const { locations, offeringTypes, duration, durationTypes, editSearchFilters } = props;

  return (
    <div>
      <LocationFilter 
        locations={ locations } 
        onChange={ editSearchFilters } />
      <CourseTypeFilter 
        offeringTypes={ offeringTypes } 
        onChange={ editSearchFilters } />
      <DurationFilter 
        duration={ duration }
        durationTypes={ durationTypes }
        onChange={ editSearchFilters } />
    </div>
  );
}

function FieldsForLanguageCoursesBySchool () {

  return (
    <div>HELLO</div>
  )
}

export default function FieldsForLanguageCourses ({ tabIndex, switchTabs, error, isLoading, ...props }) {

  if (error) {
    return ( <div>Error! {error}</div> );
  }

  if (isLoading) {
    return ( <div>Loading</div> );
  }

  const clickHandler = (e) => { switchTabs((e.target as HTMLButtonElement).value) };

  return (
    <div>
      <fieldset>
        <legend>Language Courses</legend>
        <div>
          <button value="0" onClick={ clickHandler }>By Location</button>
          <button value="1" onClick={ clickHandler }>By School</button>
        </div>
        <ModalComponents mode={ tabIndex }>
          <FieldsForLanguageCoursesByLocation { ...props as FieldsForLanguageCoursesByLocationProps } />
          <FieldsForLanguageCoursesBySchool/>
        </ModalComponents>
      </fieldset>
    </div>
  )
}
