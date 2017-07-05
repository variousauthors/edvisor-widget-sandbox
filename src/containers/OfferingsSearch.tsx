import { graphql, gql } from 'react-apollo';
//import { connect } from 'react-redux';

import OfferingsSearch from '../components/OfferingsSearch';

export default graphql(gql`{
  offeringCourseCategories {
    codeName
  }
}`, { })(OfferingsSearch);

