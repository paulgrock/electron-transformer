import { ADD_FILE } from '../actions/types';
const initialState = {
	files: [],
	transforms: []
}

export default function addFile(state = initialState, action) {
	switch (action.type) {
		case ADD_FILE:
			return Object.assign({}, state, {
				files: [
					...state.files,
					{
						originalFileName: action.originalFileName,
						path: action.path,
						updatedFileName: action.updatedFileName
					}
				]
			})
		default:
			return state;
	}
}
