import * as types from './actions/types';
import renameFile from './rename-file';
import {combineReducers} from 'redux';
import addFile from './reducers/add-file';
import addTransform from './reducers/add-transform';
import changePosition from './reducers/change-position';
import changeTransform from './reducers/change-transform';
import clearFiles from './reducers/clear-files';
import removeTransform from './reducers/remove-transform';
import renameFiles from './reducers/rename-files';

const initialState = {
	files: [],
	transforms: []
};

const reducers = combineReducers({
	addFile,
	addTransform,
	changePosition,
	changeTransform,
	clearFiles,
	transforms: removeTransform,
	renameFiles
});

const tranformerApp = function (state = initialState, action) {
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
			});

		case types.ADD_TRANSFORM:
			return Object.assign({}, state, {
				transforms: [
					...state.transforms,
					{
						style: action.style,
						args: action.args
					}
				]
			});

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
			});

		case types.CHANGE_POSITION: {
			const stateCopy = state.transforms.slice();
			const removedTransform = stateCopy.splice(action.previousPosition, 1);
			stateCopy.splice(action.newPosition, 0, removedTransform[0]);
			return Object.assign({}, state, {
				transforms: stateCopy
			});
		}

		case types.REMOVE_TRANSFORM:
			return Object.assign({}, state, {
				transforms: [
					...state.transforms.slice(0, action.index),
					...state.transforms.slice(action.index + 1)
				]
			});

		case types.RENAME_FILES: {
			const updatedFiles = state.files.map((file) => {
				return renameFile(file, state.transforms);
			});
			return Object.assign({}, state, {
				files: updatedFiles
			});
		}

		case types.CLEAR_FILES:
			return Object.assign({}, state, {files: []});
		default:
			return state;
	}
};

export default tranformerApp;

export {reducers};
