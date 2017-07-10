import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import { publishCourseSearchFilters, editCourseSearchFilters } from '../actions/index';
import OfferingsSearch from '../components/OfferingsSearch';

let options = {
  props: (props) => {
    if (props.data.loading) {
      return { isLoading: true };
    }

    return {
      networkStatus: props.data.networkStatus,
      error: props.data.error ? props.data.error.message : null,
      isLoading: props.data.loading,
      results: props.data.offeringCourseCategories.filter((category) => (category.depth > 1)),
    }
  }
}

let OfferingsSearchWithData = graphql<any, any, any>(gql`{
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
  return { };
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
