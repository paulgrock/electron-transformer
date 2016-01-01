import {RENAME_FILES} from '../actions/types';
const initialState = {
	files: [],
	transforms: []
};

export default function (state = initialState, action) {
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
