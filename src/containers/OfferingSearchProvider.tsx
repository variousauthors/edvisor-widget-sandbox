import * as React from 'react';

import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

function OfferingsSearchProvider (props) {
  console.log("Provider Render");
  console.log(props);

  // child needs to provide argument to refetch    return { variables: { offeringTypes: props.offeringTypes } };
  let children = React.Children.map(props.children, (child) => {
    let bob = React.cloneElement(child as React.ReactElement<any>, {
      refetch: props.refetch,
      results: props.results,
    });

    return bob;

  });

  return (
    <div>{ children }</div>
  )
}

let opts = { 
  options: (props) => {

    return { variables: { offeringTypes: [] } };
  },
  skip: (props) => {
    console.log("Provider Skip?");
    console.log(props);

    return !props.offeringTypes || props.offeringTypes.length < 1;
  },
  props: (props) => {
    console.log("Provider PROVIDES");
    if (props.data.loading) {
      return { isLoading: true };
    }

    return {
      refetch: props.data.refetch,
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

let OfferingsSearchProviderWithData = graphql<any, any, any>(gql`
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
  }`, opts)(OfferingsSearchProvider);

let OfferingsSearchProviderWithState = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: true }
)(OfferingsSearchProviderWithData);

function mapStateToProps (state: any, props: any) {
  console.log("Provider mapStateToProps");
  console.log(state, props);
  return {
    offeringTypes: state.searchParameters.offeringTypes 
  };
}

function mapDispatchToProps (dispatch: any) {
  return { };
}

export default OfferingsSearchProviderWithState;
