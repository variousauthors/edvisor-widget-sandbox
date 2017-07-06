const initialSearchParameters = {
	offeringTypes: [],
}

export function searchParameters(state = initialSearchParameters, action: any) {

	switch (action.type) {
		case 'SET_OFFERING_TYPES':
			let offeringTypes = state.offeringTypes.concat(action.offeringTypes);

			return {
				... state,
				offeringTypes
			};
		default:
			return state;

	}
}
