import {CHANGE_POSITION} from './types';

export default (previousPosition, newPosition) => ({
	type: CHANGE_POSITION,
	previousPosition,
	newPosition
});
