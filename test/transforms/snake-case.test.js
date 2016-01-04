import {expect} from 'chai';
import snakeCase from '../../client/transforms/snake-case';

describe('Snake case', () => {
	it('Converts a string to snake case', () => {
		const str = 'foo-foo';
		const newStr = snakeCase['snake-case'].method(str);
		const modifiedStr = 'foo_foo';
		expect(newStr).to.equal(modifiedStr);
	});
});
