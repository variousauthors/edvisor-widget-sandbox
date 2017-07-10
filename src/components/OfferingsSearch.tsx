import * as React from 'react';

function AgeFilter (props: any) {
  let rangeOptions = [
    { value: 'gte', name: "and older" },
    { value: 'lte', name: "and younger" },
    { value: 'eq', name: "exactly" },
  ]

  return (
    <div>
      <input 
        type='number' 
        min='0'
        step='1'
        onChange={ (e) => props.onChange({ age: parseInt(e.target.value) })  }/>
      <Select data={ rangeOptions } onChange={ (value) => props.onChange({ ageRange: value }) } />
    </div>
  );
}

function Select ({ data, onChange, map = (opt) => opt }) {
  let optionElements = data.map((opt: any, index: number) => {
    if (map) {
      opt = map(opt);
    }

    return (
      <option key={ index } value={ opt.value } >{ opt.name }</option>
    )
  })

  return (
    <select onChange={ (e) => { onChange(e.target.value); } }>
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
        onChange={ (value) => { props.editSearchFilters(value); } }
      />
      <Select 
        data={ optionData }
        map={ optionMap }
        onChange={ (value) => { props.editSearchFilters({ offeringTypes: [value]}); } }
      />
      <input type="submit" value="Find Courses" />
    </form>
  )
}
