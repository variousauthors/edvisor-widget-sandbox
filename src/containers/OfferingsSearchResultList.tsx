import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import OfferingsSearchResultList from '../components/OfferingsSearchResultList';

let OfferingsSearchResultListWithData = graphql<any, any, any>(gql`
  query Stuff($offeringTypes: [Int]) {
    offeringSearch(filter:{
      offeringCourseCategoryIds: $offeringTypes
    }) {
      startDate
      durationType {
        codeName
      }
      offering {
        name
        offeringCourse {
          offeringCourseCategory {
            codeName
          }
        }
      }
    }
  }`, {
    options: (props) => {

      return { variables: { offeringTypes: props.searchFilters.offeringTypes } };
    },
    props: (props) => {
      if (props.data.loading) {
        return { isLoading: true };
      }

      return {
        networkStatus: props.data.networkStatus,
        error: props.data.error ? props.data.error.message : null,
        isLoading: props.data.loading,
        results: props.data.offeringSearch.map((searchResult) => {
          return {
            durationType: searchResult.durationType.codeName,
            startDate: searchResult.startDate,
            name: searchResult.offering.name,
            courseType: searchResult.offering.offeringCourse.offeringCourseCategory.codeName,
          }
        })
      }
    }
  })(OfferingsSearchResultList);

let OfferingsSearchResultListWithState = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(OfferingsSearchResultListWithData);

function mapStateToProps (state: any, props: any) {
  return {
    searchFilters: state.searchFilters.current
  };
}

function mapDispatchToProps (dispatch: any) {
  return { };
}

export default OfferingsSearchResultListWithState;
