const initialFilters = {
  offeringTypes: [],
  age: 10,
  ageRange: 'gte',
  durationTypeId: 3,
  durationAmount: 4,
  durationTypeRange: 'any',
  googlePlaceIds: [],
}

const stateShape = {
  current: initialFilters,
  next: initialFilters,
}

const UIStateShape = {
  tab: "0",
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

export function ui (state = UIStateShape, action) {

  switch (action.type) {
    case 'SWITCH_TABS':

      return {
        ...state,
        ...action,
      };

    default:
      return state;
  }
}
