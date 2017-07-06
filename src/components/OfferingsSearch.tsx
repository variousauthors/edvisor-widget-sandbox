import * as React from 'react';

function Select (props: any) {
  let optionElements = props.data.map((opt: any, index: number) => {
    return (
      <option key={ index } value={ opt.offeringCourseCategoryId } >{ opt.codeName }</option>
    )
  })

  return (
    <select onChange={ (e) => {
      props.onChange([e.target.value]);
    } }>
      { optionElements }
    </select>
  )
}

export default function OfferingsSearch (props: any) {
  let data = props.data;

  if (data.networkStatus === 1) {
    return ( <div>BUSY</div> );
  }

  if (data.error) {
    return ( <div>Error! {data.error.message}</div> );
  }

  return (
    <form>
      <Select 
        data={ props.data.offeringCourseCategories } 
        onChange={ props.onChange }
      />
    </form>
  )
}
