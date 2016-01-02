export default function addTransform(state, action) {
	return state.concat([{
		style: action.style,
		args: action.args
	}]);
}
