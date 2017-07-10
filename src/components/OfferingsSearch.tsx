import * as React from 'react';

function DurationFilter (props: any) {

  // TODO fetch these
  let durationTypeOptions = [
    { value: '3', name: 'Weeks' },
    { value: '5', name: 'Years' },
  ];

  let rangeOptions = [
    { value: 'any', name: "any" },
    { value: 'gte', name: "at least" },
  ]

  let durationTypeDetails = (props.duration.range === 'any')? null : (
    <span>
      <input type='number' min='0' step='1' value={ props.duration.amount } onChange={ (e) => props.onChange({ durationAmount: e.target.value }) } />
      <Select defaultValue={ props.duration.id } data={ durationTypeOptions } onChange={ (value) => props.onChange({ durationTypeId: value }) } />
    </span>
  );

  return (
    <div>
      <label>Duration:
        <Select 
          defaultValue={ props.duration.range }
          data={ rangeOptions } 
          onChange={ (value) => props.onChange({ durationTypeRange: value }) } />

        { durationTypeDetails }
      </label>
    </div>
  )
}

function AgeFilter (props: any) {
  let rangeOptions = [
    { value: 'gte', name: "and older" },
    { value: 'lte', name: "and younger" },
    { value: 'eq', name: "exactly" },
  ]

  return (
    <div>
      <label>Age: </label>
      <input 
        type='number' 
        min='0'
        step='1'
        value={ props.age.years }
        onChange={ (e) => props.onChange({ age: e.target.value })  }/>
      <Select defaultValue={ props.age.range } data={ rangeOptions } onChange={ (value) => props.onChange({ ageRange: value }) } />
    </div>
  );
}

function Select ({ data, onChange, defaultValue = "", map = (opt) => opt }) {
  let optionElements = data.map((opt: any, index: number) => {
    if (map) {
      opt = map(opt);
    }

    return (
      <option key={ index } value={ opt.value } >{ opt.name }</option>
    )
  })

  return (
    <select defaultValue={ defaultValue } onChange={ (e) => { onChange(e.target.value); } }>
      { optionElements }
    </select>
  )
}

export default function OfferingsSearch (props: any) {

  if (props.isLoading) {
    return ( <div>Loading</div> );
  }

  if (props.error) {
    return ( <div>Error! {props.error.message}</div> );
  }

  let optionData = props.results;
  let optionMap = ({ offeringCourseCategoryId, codeName }) => ({
    value: offeringCourseCategoryId,
    name: codeName,
  });

  return (
    <form onSubmit={ (e) => { e.preventDefault(); props.publishSearchFilters(); } } >
      <AgeFilter
        age={ props.age }
        onChange={ (value) => { props.editSearchFilters(value); } }
      />
      <label>
        <span>Course Type: </span>
        <Select 
          data={ optionData }
          map={ optionMap }
          onChange={ (value) => { props.editSearchFilters({ offeringTypes: [value]}); } }
        />
      </label>
      <DurationFilter 
        duration={ props.duration }
        onChange={ (value) => { props.editSearchFilters(value) } }
       />
      <div>
        <input type="submit" value="Find Courses" />
      </div>
    </form>
  )
}
