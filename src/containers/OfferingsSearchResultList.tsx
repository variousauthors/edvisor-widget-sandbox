import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import OfferingsSearchResultList from '../components/OfferingsSearchResultList';

let opts = { 
  options: ({ offeringTypes }) => { 
    return { variables: { offeringTypes: offeringTypes } };
  },
  props: (props) => {
    if (props.data.loading) {
      return { isLoading: true };
    }

    return {
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

let OfferingsSearchResultListWithState = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(OfferingsSearchResultList);

let OfferingsSearchResultListWithData = graphql(gql`
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
  console.log(state, props);
  return state;
}

function mapDispatchToProps (dispatch: any) {
  return { };
}

export default OfferingsSearchResultListWithData;
