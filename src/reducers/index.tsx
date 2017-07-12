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
  tabGroups: {
    offeringSearch: { 
      id: "offeringSearch",
      tabIndex: 0,
    },
    fieldsForLanguageCourses: { 
      id: "fieldsForLanguageCourses",
      tabIndex: 0,
    },
  }
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

interface TabGroup {
  id: string,
  tabIndex: number,
}
function tabGroup (state: TabGroup, action) {

  switch (action.type) {
    case 'SWITCH_TABS': {
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        tabIndex: action.tabIndex,
      }
    }

    default:
      return state;
  }
}

function tabGroups (state = {}, action) {

  switch (action.type) {
    case 'SWITCH_TABS': {

      return Object.keys(state).reduce((memo, id) => {
        memo[id] = tabGroup(state[id], action);

        return memo;
      }, {})
    }

    default:
      return state;
  }
}

export function ui (state = UIStateShape, action) {

  switch (action.type) {
    case 'SWITCH_TABS': {
      
      return {
        ...state,
        tabGroups: tabGroups(state.tabGroups, action),
      }
    }

    default:
      return state;
  }
}
