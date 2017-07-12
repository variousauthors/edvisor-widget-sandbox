import * as React from 'react';

import './OfferingsSearch.css';
import FieldsForStudentInformation from '../containers/FieldsForStudentInformation';
import FieldsForLanguageCourses from '../containers/FieldsForLanguageCourses';

function ModalComponents ({ children, mode }) {

  return (
    <div>
      { children[mode] }
    </div>
  );
}

export default function OfferingsSearch ({ tabIndex, offeringTypeCategories, publishSearchFilters, switchTabs }) {

  const clickHandler = (e) => { switchTabs((e.target as HTMLButtonElement).value) };

  return (
    <form className="OfferingSearch__Form" onSubmit={ (e) => { e.preventDefault(); publishSearchFilters(); } } >
      <FieldsForStudentInformation />
      <div>
        <div>
          <button value="0" onClick={ clickHandler }>Languages</button>
          <button value="1" onClick={ clickHandler }>Post Secondary</button>
          <button value="2" onClick={ clickHandler }>Highschool</button>
        </div>
        <ModalComponents mode={ tabIndex }>
          <FieldsForLanguageCourses/>
          <div>Post Secondary</div>
          <div>Highschool</div>
        </ModalComponents>
      </div>
      <div>
        <input type="submit" value="Find Courses" />
      </div>
    </form>
  )
}

