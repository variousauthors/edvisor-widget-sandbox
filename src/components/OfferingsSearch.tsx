import * as React from 'react';

import './OfferingsSearch.css';
import FieldsForStudentInformation from '../containers/FieldsForStudentInformation';
import FieldsForLanguageCourses from '../containers/FieldsForLanguageCourses';

function showCurrentTab (tab) {
  switch (tab) {
    case "LANGUAGES": {
      return (<FieldsForLanguageCourses />);
    }
    case "POST_SECONDARY": {
      return (<div>Post Secondary</div>);
    }
    case "HIGHSCHOOL": {
      return (<div>Highschool</div>);
    }
    default: {
      return (<div>HELLO</div>);
    }
  }
}

export default function OfferingsSearch ({ currentTab, offeringTypeCategories, publishSearchFilters, switchTabs }) {

  const clickHandler = (e) => { switchTabs((e.target as HTMLButtonElement).value) };

  return (
    <form className="OfferingSearch__Form" onSubmit={ (e) => { e.preventDefault(); publishSearchFilters(); } } >
      <FieldsForStudentInformation />
      <div>
        <div>
          <button value="LANGUAGES" onClick={ clickHandler }>Languages</button>
          <button value="POST_SECONDARY" onClick={ clickHandler }>Post Secondary</button>
          <button value="HIGHSCHOOL" onClick={ clickHandler }>Highschool</button>
        </div>
        <div>
          { showCurrentTab(currentTab) }
        </div>
      </div>
      <div>
        <input type="submit" value="Find Courses" />
      </div>
    </form>
  )
}

