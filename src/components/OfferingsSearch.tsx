import * as React from 'react';

import FieldsForStudentInformation from '../containers/FieldsForStudentInformation';
import FieldsForLanguageCourses from '../containers/FieldsForLanguageCourses';

export default function OfferingsSearch ({ publishSearchFilters }) {

  return (
    <form onSubmit={ (e) => { e.preventDefault(); publishSearchFilters(); } } >
      <FieldsForStudentInformation />
      <FieldsForLanguageCourses />
      <div>
        <input type="submit" value="Find Courses" />
      </div>
    </form>
  )
}

