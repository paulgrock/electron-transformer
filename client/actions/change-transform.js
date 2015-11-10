import { CHANGE_TRANSFORM } from './types';

export default (transform) => ({
	type: CHANGE_TRANSFORM,
	position: transform.position,
	style: transform.style,
	variations: transform.variations
})
