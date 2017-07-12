import * as React from 'react';

import FieldsForStudentInformation from '../containers/FieldsForStudentInformation';
import FieldsForLanguageCourses from './FieldsForLanguageCourses';

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
      <FieldsForStudentInformation />
      <FieldsForLanguageCourses 
        locations={ props.locations } 
        offeringTypes={ props.offeringTypes } 
        duration={ props.duration }
        durationTypes={ props.durationTypes }
        onChange={ setFilter } />
      <div>
        <input type="submit" value="Find Courses" />
      </div>
    </form>
  )
}

