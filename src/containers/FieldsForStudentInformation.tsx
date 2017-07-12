import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import { editCourseSearchFilters } from '../actions/index';
import Base from '../components/FieldsForStudentInformation';

const options = {
  props: mapApolloToProps
}

const query = gql`{ 
  countries {
    countryId
    nameTranslation
  }
}`;

function mapStateToProps (state: any, props) {
  const filters = state.searchFilters.next;

  return {
    age: {
      years: filters.age,
      range: filters.ageRange,
    }
  };
}

function mapApolloToProps (apollo) {
    if (apollo.data.error) {
      return { error: apollo.data.error.message };
    }

    if (apollo.data.loading) {
      return { isLoading: true };
    }

    return {
      networkStatus: apollo.data.networkStatus,
      error: apollo.data.error ? apollo.data.error.message : null,
      isLoading: apollo.data.loading,
      countries: apollo.data.countries,
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
