const initialFilters = {
  offeringTypes: [],
  age: 0,
  ageRange: 'lte',
  durationTypeId: 3,
  durationAmount: 1,
  durationTypeRange: 'any',
}

const stateShape = {
  current: initialFilters,
  next: initialFilters,
}

stateShape.next = stateShape.current;

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
