import path from 'path';

export default function addFile(state, action) {
	return state.concat([
		{
			id: path.join(action.path, action.originalFileName),
			originalFileName: action.originalFileName,
			path: action.path,
			updatedFileName: action.updatedFileName
		}
	]);
}
