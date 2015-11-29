import { ADD_TRANSFORM } from '../actions/types';
const initialState = {
	files: [],
	transforms: []
}

export default function addTransform(state = initialState, action) {
	switch (action.type) {
		case ADD_TRANSFORM:
			return Object.assign({}, state, {
				transforms: [
					...state.transforms,
					{
						style: action.style,
						args: action.args
					}
				]
			})

		default:
			return state;

	}
}
