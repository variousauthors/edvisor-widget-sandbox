import { connect } from 'react-redux';

import OfferingsSearchResultList from '../components/OfferingsSearchResultList';

let OfferingsSearchResultListWithState = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(OfferingsSearchResultList);

function mapStateToProps (state: any, props: any) {
  return { };
}

function mapDispatchToProps (dispatch: any) {
  return { };
}

export default OfferingsSearchResultListWithState;
