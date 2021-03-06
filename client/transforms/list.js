import slugify from './slugify';
import replaceChars from './replace-characters';
import addChars from './add-characters';
import removeChars from './remove-characters';
import lowerCase from './lower-case';
import upperCase from './upper-case';
import snakeCase from './snake-case';
import humanize from './humanize';

const defaultTransformList = {
	noop: {
		name: 'Select a transform',
		method(str) {
			return str;
		}
	}
};

const transformList = Object.assign({}, defaultTransformList, slugify, lowerCase, upperCase, replaceChars, addChars, removeChars, snakeCase, humanize);

export default transformList;
