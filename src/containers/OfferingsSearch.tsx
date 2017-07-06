import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import { setOfferingTypes } from '../actions/index';
import OfferingsSearch from '../components/OfferingsSearch';

let OfferingsSearchWithData = graphql(gql`{
  offeringCourseCategories {
    offeringCourseCategoryId
    codeName
  }
}`, { })(OfferingsSearch);

function mapStateToProps (state: any) {
  return state;
}

function mapDispatchToProps (dispatch: any) {
  return {
    onChange: (offeringTypes: any) => {
      dispatch(setOfferingTypes(offeringTypes));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OfferingsSearchWithData);
