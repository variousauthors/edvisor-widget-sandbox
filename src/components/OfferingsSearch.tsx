import * as React from 'react';

import './OfferingsSearch.css';
import FieldsForStudentInformation from '../containers/FieldsForStudentInformation';
import FieldsForLanguageCourses from '../containers/FieldsForLanguageCourses';
import ModalComponents from './ModalComponents';

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
          <div>
            <fieldset>
              <legend>Post Secondary</legend>
            </fieldset>
          </div>
          <div>
            <fieldset>
              <legend>Highschool</legend>
            </fieldset>
          </div>
        </ModalComponents>
      </div>
      <div>
        <input type="submit" value="Find Courses" />
      </div>
    </form>
  )
}

