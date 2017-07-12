import { connect } from 'react-redux';

import { publishCourseSearchFilters } from '../actions/index';
import Base from '../components/OfferingsSearch';

function mapStateToProps (state: any, props) { 
  return {

  };
}

function mapDispatchToProps (dispatch: any) {
  return {
    publishSearchFilters: () => {
      dispatch(publishCourseSearchFilters());
    },
  };
}

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(Base);
