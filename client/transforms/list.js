import slugify from './slugify';
import replaceChars from './replace-characters';
import addChars from './add-characters';
import removeChars from './remove-characters';
import lowerCase from './lower-case';
import upperCase from './upper-case';

const defaultTransformList = {
	"noop": {
		name: "Select a transform",
		method: function(str) {
			return str;
		}
	}
};

const transformList = Object.assign({}, defaultTransformList, slugify, lowerCase, upperCase, replaceChars, addChars, removeChars);

export default transformList;
