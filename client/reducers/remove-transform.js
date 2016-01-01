import {REMOVE_TRANSFORM} from '../actions/types';
const initialState = [];

export default function (state = initialState, action) {
	switch (action.type) {
		case REMOVE_TRANSFORM:
			return Object.assign({}, state, [
				...state.transforms.slice(0, action.index),
				...state.transforms.slice(action.index + 1)
			]);

		default:
			return state;
	}
}
