export default function (state, action) {
	// TODO: Use a  better way of finding
	return [
		...state.slice(0, action.index),
		{
			style: action.style,
			args: action.args
		},
		...state.slice(action.index + 1)
	];
}
