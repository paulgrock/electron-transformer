import { CLEAR_FILES } from '../actions/types';
const initialState = {
	files: [],
	transforms: []
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CLEAR_FILES:
			return Object.assign({}, state, {files: []});

		default:
			return state;
	}
}
