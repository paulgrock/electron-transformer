import {SORT_FILES} from './types';

export default function (column) {
	return {
		type: SORT_FILES,
		column
	};
}
