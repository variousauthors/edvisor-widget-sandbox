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
    // TODO this seems to run a bunch, eh?

    let offeringTypes = props.data.offeringCourseCategories.reduce((memo, category) => {
      if (category.depth < 2) {
        return memo;
      }

      memo.push({
        id: category.offeringCourseCategoryId,
        name: category.codeName
      })

      return memo;
    }, [])

    return {
      networkStatus: props.data.networkStatus,
      error: props.data.error ? props.data.error.message : null,
      isLoading: props.data.loading,
      offeringTypes: offeringTypes,
      locations: locations.sort((a, b) => { return a.name.localeCompare(b.name); }), // alphabetize,
      durationTypes: props.data.durationTypes.map((d) => { return { id: d.durationTypeId, name: d.codeName } }),
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
  durationTypes {
    durationTypeId
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
      console.log(filters);
      dispatch(editCourseSearchFilters(filters));
    },
  };
}

export default OfferingsSearchWithState;
