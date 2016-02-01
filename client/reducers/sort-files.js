export default function addFile(state, action) {
	if (action.column === 'original') {
		state.sort((firstFile, secondFile) => {
			if (firstFile.originalFileName < secondFile.originalFileName) {
				return -1;
			}
			return 1;
		});
	}
	return state;
}
