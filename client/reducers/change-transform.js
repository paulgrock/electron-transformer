import { CHANGE_TRANSFORM } from '../actions/types';
const initialState = {
	files: [],
	transforms: []
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CHANGE_TRANSFORM:
			// TODO: Use a  better way of finding
			return Object.assign({}, state, {
				transforms: [
					...state.transforms.slice(0, action.index),
					{
						style: action.style,
						args: action.args
					},
					...state.transforms.slice(action.index + 1)
				]
			})

		default:
			return state;
	}
}
