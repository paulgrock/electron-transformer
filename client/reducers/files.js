import * as types from '../actions/types';
import addFile from './add-file';
import clearFiles from './clear-files';
import sortFiles from './sort-files';

export default function files(state = [], action) {
	switch (action.type) {
		case types.ADD_FILE:
			return addFile(state, action);

		case types.CLEAR_FILES:
			return clearFiles(state, action);

		case types.SORT_FILES:
			return sortFiles(state, action);

		default:
			return state;
	}
}
