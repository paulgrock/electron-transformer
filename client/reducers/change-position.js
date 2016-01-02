export default function (state, action) {
	const stateCopy = state.slice();
	const removedTransform = stateCopy.splice(action.previousPosition, 1);
	stateCopy.splice(action.newPosition, 0, removedTransform[0]);
	return stateCopy;
}
