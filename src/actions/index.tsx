export function switchTabs (id, tabIndex) {

	return { 
		type: "SWITCH_TABS",
		id,
		tabIndex,
 	}
}

export function editCourseSearchFilters (filters) {

	return {
		type: 'EDIT_COURSE_SEARCH_FILTERS',
		filters: filters,
	}
}

export function publishCourseSearchFilters () {

	return {
		type: 'PUBLISH_COURSE_SEARCH_FILTERS'
	}
}

