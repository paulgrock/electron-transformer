export default function addFile(state, action) {
	return state.concat([
		{
			originalFileName: action.originalFileName,
			path: action.path,
			updatedFileName: action.updatedFileName
		}
	]);
}
