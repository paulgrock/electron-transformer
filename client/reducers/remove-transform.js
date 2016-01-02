export default function (state, action) {
	return [
		...state.slice(0, action.index),
		...state.slice(action.index + 1)
	];
}
