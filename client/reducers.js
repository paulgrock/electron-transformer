import * as types from './actions/types';
import renameFile from './rename-file';

const initialState = {
	files: [],
	transforms: []
}

const tranformerApp = function(state = initialState, action) {
	switch (action.type) {
		case types.ADD_FILE:
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
		case types.ADD_TRANSFORM:
			return Object.assign({}, state, {
				transforms: [
					...state.transforms,
					{
						style: action.style,
						args: action.args
					}
				]
			})
		case types.CHANGE_TRANSFORM:
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
		case types.REMOVE_TRANSFORM:
			return Object.assign({}, state, {
				transforms: [
					...state.transforms.slice(0, action.index),
					...state.transforms.slice(action.index + 1)

				]
			})

		case types.RENAME_FILES:
			let updatedFiles = state.files.map((file)=> {
				return renameFile(file, state.transforms);
			});
			return Object.assign({}, state, {
				files: updatedFiles
			});

		case types.CLEAR_FILES:
			return Object.assign({}, state, {files: []});
		default:
      return state
	}
}

export default tranformerApp;
