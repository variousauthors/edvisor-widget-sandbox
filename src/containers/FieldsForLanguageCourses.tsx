import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import { editCourseSearchFilters } from '../actions/index';
import Base from '../components/FieldsForLanguageCourses';

const options = {
  props: mapApolloToProps
}

const query = gql`{ 
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
}`;

function mapStateToProps (state: any, props) {
  const filters = state.searchFilters.next;

  return {
    duration: {
      id: filters.durationTypeId,
      range: filters.durationTypeRange,
      amount: filters.durationAmount,
    },
    offeringTypes: filters.offeringTypes,
  };
}

function mapApolloToProps (apollo) {
    if (apollo.data.error) {
      return { error: apollo.data.error.message };
    }

    if (apollo.data.loading) {
      return { isLoading: true };
    }

    // pull the google places out and uniq them
    let locations = apollo.data.agencyCompany.connectedSchoolCompanies.reduce((memo, schoolCompany) => {
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

    let offeringTypes = apollo.data.offeringCourseCategories.reduce((memo, category) => {
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
      networkStatus: apollo.data.networkStatus,
      error: apollo.data.error ? apollo.data.error.message : null,
      isLoading: apollo.data.loading,
      offeringTypes: offeringTypes,
      locations: locations.sort((a, b) => { return a.name.localeCompare(b.name); }), // alphabetize,
      durationTypes: apollo.data.durationTypes.map((d) => { return { id: d.durationTypeId, name: d.codeName } }),
    }
}

function mapDispatchToProps (dispatch: any) {
  return {
    editSearchFilters: (filters) => {
      console.log("editSearchFilters: ");
      console.log(filters);
      dispatch(editCourseSearchFilters(filters));
    },
  };
}

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(graphql<any, any, any>(query, options)(Base));
