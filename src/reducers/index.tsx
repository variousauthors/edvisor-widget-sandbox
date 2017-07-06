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
			console.log(filters);
			let offeringTypes = state.offeringTypes.slice();
			let age = Object.assign({}, state.age, filters.age);

			if (filters.offeringTypes) {
				offeringTypes = offeringTypes.concat(filters.offeringTypes);
			}

			console.log({
				...state,
				age,
				offeringTypes,
			});

			return {
				...state,
				age,
				offeringTypes,
			};
		default:
			return state;

	}
}
