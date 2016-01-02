import {RENAME_FILES} from '../actions/types';
import renameFile from '../rename-file';

export default function (state, action) {
	const updatedFiles = state.files.map((file) => {
		return renameFile(file, state.transforms);
	});
	return Object.assign({}, state, {
		files: updatedFiles
	});
}
