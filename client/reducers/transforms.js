import * as types from '../actions/types';
import addTransform from './add-transform';
import changePosition from './change-position';
import changeTransform from './change-transform';
import removeTransform from './remove-transform';

export default function transforms(state = [], action) {
	switch (action.type) {
		case types.ADD_TRANSFORM:
			return addTransform(state, action);

		case types.CHANGE_POSITION:
			return changePosition(state, action);

		case types.CHANGE_TRANSFORM:
			return changeTransform(state, action);

		case types.REMOVE_TRANSFORM:
			return removeTransform(state, action);

		default:
			return state;
	}
}
