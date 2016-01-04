import {expect} from 'chai';
import upperCase from '../../client/transforms/upper-case';

describe('Upper case', () => {
	it('Converts a string to upper case', () => {
		const str = 'foo';
		const newStr = upperCase['upper-case'].method(str);
		const modifiedStr = 'FOO';
		expect(newStr).to.equal(modifiedStr);
	});
});
