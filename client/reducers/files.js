import * as types from '../actions/types';
import addFile from './add-file';
import clearFiles from './clear-files';
import renameFiles from './rename-files';

export default function files(state = [], action) {
	switch (action.type) {
		case types.ADD_FILE:
			return addFile(state, action);

		case types.CLEAR_FILES:
			return clearFiles(state, action);

		default:
			return state;
	}
}
