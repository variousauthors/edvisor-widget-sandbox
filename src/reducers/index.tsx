const initialSearchParameters = {
	offeringTypes: [],
	age: {
		years: 0,
		range: 'gte',
	}
}

export function searchParameters(state = initialSearchParameters, { type, filters }) {

	switch (type) {
		case 'SET_SEARCH_FILTERS':
			let offeringTypes = state.offeringTypes.slice();
			let age = Object.assign({}, state.age, filters.age);

			if (filters.offeringTypes) {
				offeringTypes = offeringTypes.concat(filters.offeringTypes);
			}

			return {
				...state,
				age,
				offeringTypes,
			};
		default:
			return state;

	}
}
