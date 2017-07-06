import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import OfferingsSearchResultList from '../components/OfferingsSearchResultList';

let opts = { 
  options: ({ offeringTypes }) => { 
    return { variables: { offeringTypes: offeringTypes } };
  } 
}

let OfferingSearchResultListWithData = graphql(gql`
  query Stuff($offeringTypes: [Int]) {
    offeringSearch(filter:{
      offeringCourseCategoryIds: $offeringTypes
    }) {
      offeringId
    }
  }`, opts)(OfferingsSearchResultList);

function mapStateToProps (state: any) {
  return state;
}

function mapDispatchToProps (dispatch: any) {
  return { };
}

let OfferingsSearchResultListWithState = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(OfferingSearchResultListWithData);

export default OfferingsSearchResultListWithState;
