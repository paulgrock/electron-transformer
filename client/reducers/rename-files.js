import {RENAME_FILES} from '../actions/types';
import renameFile from '../rename-file';

export default function (state, action) {
	switch (action.type) {
		case RENAME_FILES: {
			const updatedFiles = state.files.map((file) => {
				return renameFile(file, state.transforms);
			});
			return Object.assign({}, state, {
				files: updatedFiles
			});
		}

		default:
			return state;
	}
}
