
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

