export function switchTabs (tabName) {

	return { 
		type: "SWITCH_TABS",
		tabName,
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

