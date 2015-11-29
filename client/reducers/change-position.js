import { CHANGE_POSITION } from '../actions/types';
const initialState = {
	files: [],
	transforms: []
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CHANGE_POSITION:
			var stateCopy = state.transforms.slice();
			var removedTransform = stateCopy.splice(action.previousPosition, 1);
			stateCopy.splice(action.newPosition, 0, removedTransform[0]);
			console.log(stateCopy);
			return Object.assign({}, state, {
				transforms: stateCopy
			})

		default:
			return state;
	}
}
