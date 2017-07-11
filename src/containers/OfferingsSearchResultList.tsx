import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import OfferingsSearchResultList from '../components/OfferingsSearchResultList';

let OfferingsSearchResultListWithData = graphql<any, any, any>(gql`
  query Stuff($offeringTypes: [Int], $durationTypeId: Int, $durationAmount: IntegerRangeInput, $googlePlaceIds: [String]) {
    offeringSearch(filter:{
      offeringCourseCategoryIds: $offeringTypes,
      durationTypeId: $durationTypeId,
      durationAmount: $durationAmount,
      googlePlaceIds: $googlePlaceIds,
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
        school {
          name
          googlePlace {
            translation
          }
        }
      }
    }
  }`, {
    skip: ({ searchFilters }) => {

      return searchFilters.googlePlaceIds.length === 0;
    },
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
          googlePlaceIds: filters.googlePlaceIds,
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

            offering: {
              name: searchResult.offering.name,
              courseType: searchResult.offering.offeringCourse.offeringCourseCategory.codeName,

              school: {
                name: searchResult.offering.school.name,
                location: searchResult.offering.school.googlePlace.translation,
              }
            }
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
