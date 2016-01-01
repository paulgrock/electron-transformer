import snakeCase from 'lodash.snakecase';

export default {
	'snake-case': {
		name: 'Snake Case',
		method(str) {
			return snakeCase(str);
		}
	}
};
