import renameFile from '../rename-file';

export default function (state) {
	const updatedFiles = state.files.map((file) => {
		return renameFile(file, state.transforms);
	});
	return Object.assign({}, state, {
		files: updatedFiles
	});
}
