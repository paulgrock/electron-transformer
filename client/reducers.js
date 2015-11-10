import * as types from './actions/types';
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
						originalFilePath: action.originalFilePath,
						updatedFileName: action.updatedFileName,
						updatedFilePath: action.updatedFilePath
					}
				]
			})
		case types.ADD_TRANSFORM:
			return Object.assign({}, state, {
				transforms: [
					...state.transforms,
					{
						style: action.style,
						variations: action.variations
					}
				]
			})
		case types.CHANGE_TRANSFORM:
			return Object.assign({}, state, {
				transforms: [
					...state.transforms.slice(0, action.position),
					{
						style: action.style,
						variations: action.variations
					},
					...state.transforms.slice(action.position + 1)
				]
			})
		case types.REMOVE_TRANSFORM:
			// TODO: Use a  better way of finding
			return Object.assign({}, state, {
				transforms: [
					...state.transforms.slice(0, action.id),
					{
						style: action.style
					}
				]
			})
		case types.CLEAR_FILES:
			return Object.assign({}, state, {files: []});
		default:
      return state
	}
}

export default tranformerApp;
