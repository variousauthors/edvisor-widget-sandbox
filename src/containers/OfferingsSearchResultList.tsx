import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import OfferingsSearchResultList from '../components/OfferingsSearchResultList';

let OfferingsSearchResultListWithState = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(OfferingsSearchResultList);

let opts = { 
  options: (props) => {

    return { variables: { offeringTypes: props.offeringTypes } };
  },
  skip: (props) => {
    console.log(props)

    return props.offeringTypes.length < 1;
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
}

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
  }`, opts)(OfferingsSearchResultListWithState);

function mapStateToProps (state: any, props: any) {
  return state;
}

function mapDispatchToProps (dispatch: any) {
  return { };
}

export default OfferingsSearchResultListWithData;
