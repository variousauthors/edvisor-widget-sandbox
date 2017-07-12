import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import { publishCourseSearchFilters, switchTabs } from '../actions/index';
import Base from '../components/OfferingsSearch';

const options = {
  props: mapApolloToProps
}

const query = gql`{ 
  offeringCourseCategories {
    offeringCourseCategoryId
    depth
    codeName
  }
}`;

function mapApolloToProps (apollo) {
    if (apollo.data.error) {
      return { error: apollo.data.error.message };
    }

    if (apollo.data.loading) {
      return { isLoading: true };
    }

    let offeringTypeCategories = apollo.data.offeringCourseCategories.reduce((memo, category) => {
      if (category.depth > 0) {
        return memo;
      }

      memo.push({
        id: category.offeringCourseCategoryId,
        depth: category.depth,
        name: category.codeName,
      })

      return memo;
    }, [])

    return {
      networkStatus: apollo.data.networkStatus,
      error: apollo.data.error ? apollo.data.error.message : null,
      isLoading: apollo.data.loading,
      offeringTypeCategories: offeringTypeCategories,
    }
}

function mapStateToProps (state: any, props) { 

  return {
    currentTab: state.ui.tabName,
  };
}

function mapDispatchToProps (dispatch: any) {
  return {
    publishSearchFilters: () => {
      dispatch(publishCourseSearchFilters());
    },
    switchTabs: (tabName) => {
      dispatch(switchTabs(tabName));
    }
  };
}

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(graphql<any, any, any>(query, options)(Base));
