import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import { publishCourseSearchFilters, editCourseSearchFilters } from '../actions/index';
import OfferingsSearch from '../components/OfferingsSearch';

let options = {
  props: (props) => {
    if (props.data.error) {
      return { error: props.data.error.message };
    }

    if (props.data.loading) {
      return { isLoading: true };
    }

    // pull the google places out and uniq them
    let locations = props.data.agencyCompany.connectedSchoolCompanies.reduce((memo, schoolCompany) => {
      schoolCompany.schools.forEach((school) => {
        if (school && school.googlePlace) {
          if (!memo.aset[school.googlePlace.googlePlaceId]) {
            memo.aset[school.googlePlace.googlePlaceId] = true;

            memo.locations.push({ 
              id: school.googlePlace.googlePlaceId,
              name: school.googlePlace.translation,
            });
          }
        }
      })

      return memo;
    }, { locations: [], aset: {} }).locations;

    return {
      networkStatus: props.data.networkStatus,
      error: props.data.error ? props.data.error.message : null,
      isLoading: props.data.loading,
      offeringTypes: props.data.offeringCourseCategories.filter((category) => (category.depth > 1)),
      locations: locations.sort((a, b) => { return a.name.localeCompare(b.name); }), // alphabetize,
    }
  }
}

let OfferingsSearchWithData = graphql<any, any, any>(gql`{
  agencyCompany {
    agencyCompanyId
    connectedSchoolCompanies {
      schoolCompanyId
      schools {
        googlePlace {
          googlePlaceId
          translation
        }
      }

    }
  }
  offeringCourseCategories {
    offeringCourseCategoryId
    depth
    codeName
  }
}`, options)(OfferingsSearch);

let OfferingsSearchWithState = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(OfferingsSearchWithData);

function mapStateToProps (state: any, props) {
  let current = state.searchFilters.next;

  let currentFilters = {
    age: {
      years: current.age,
      range: current.ageRange,
    },
    duration: {
      id: current.durationTypeId,
      range: current.durationTypeRange,
      amount: current.durationAmount,
    },
    offeringTypes: current.offeringTypes,
  }

  return currentFilters;
}

function mapDispatchToProps (dispatch: any) {
  return {
    publishSearchFilters: () => {
      dispatch(publishCourseSearchFilters());
    },
    editSearchFilters: (filters) => {
      dispatch(editCourseSearchFilters(filters));
    },
  };
}

export default OfferingsSearchWithState;
