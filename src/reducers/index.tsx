const stateShape = {
  current: {
    offeringTypes: [],
    age: 0,
    ageRange: 'gte',
  },
  next: {
    offeringTypes: [],
    age: 0,
    ageRange: 'gte',
  }
}

export function searchFilters(state = stateShape, action) {

  switch (action.type) {
    case 'EDIT_COURSE_SEARCH_FILTERS':

      let next = editCourseSearchFilters(state.next, action)

      return {
        ...state,
        next,
      }

    case 'PUBLISH_COURSE_SEARCH_FILTERS':

      let current = state.next;

      return {
        ...state,
        current,
      }
    default:
      return state;

  }
}

function editCourseSearchFilters(state, action) {

  switch (action.type) {
    case 'EDIT_COURSE_SEARCH_FILTERS':

      return {
        ...state,
        ...action.filters,
      };

    default:
      return state;
  }
}
