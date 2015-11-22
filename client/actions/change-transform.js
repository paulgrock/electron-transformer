import { CHANGE_TRANSFORM } from './types';

export default (transform) => ({
	type: CHANGE_TRANSFORM,
	index: transform.index,
	style: transform.style,
	args: transform.args
})
