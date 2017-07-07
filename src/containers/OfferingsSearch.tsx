import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import { setSearchFilters } from '../actions/index';
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
  },
  skip: (props) => {
    console.log("OfferingSearch Skip");
    return false;
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
  console.log("OfferingSearch mapStateToProps");
  return { };
}

function mapDispatchToProps (dispatch: any) {
  return {
    onChange: (filters) => {
      dispatch(setSearchFilters(filters));
    }
  };
}

export default OfferingsSearchWithState;
