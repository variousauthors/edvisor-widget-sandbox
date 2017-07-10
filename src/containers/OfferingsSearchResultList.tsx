import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import OfferingsSearchResultList from '../components/OfferingsSearchResultList';

let OfferingsSearchResultListWithData = graphql<any, any, any>(gql`
  query Stuff($offeringTypes: [Int], $durationTypeId: Int, $durationAmount: IntegerRangeInput) {
    offeringSearch(filter:{
      offeringCourseCategoryIds: $offeringTypes,
      durationTypeId: $durationTypeId,
      durationAmount: $durationAmount
    }) {
      startDate
      durationAmount
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
      let filters = props.searchFilters;
      let durationAmount = (filters.durationTypeRange !== 'any')? {
        [filters.durationTypeRange]: filters.durationAmount 
      } : null;


      return { 
        variables: { 
          offeringTypes: filters.offeringTypes,
          durationTypeId: filters.durationTypeId,
          durationAmount: durationAmount,
        } 
      };
    },
    props: (props) => {
      if (props.data.loading) {
        return { isLoading: true };
      }

      if (props.data.error) {
        return { error: props.data.error.message };
      }

      return {
        networkStatus: props.data.networkStatus,
        isLoading: props.data.loading,
        results: props.data.offeringSearch.map((searchResult) => {
          return {
            durationAmount: searchResult.durationAmount,
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
