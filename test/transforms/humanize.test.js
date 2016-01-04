import {expect} from 'chai';
import humanize from '../../client/transforms/humanize';

describe('Humanize', () => {
	it('Humanizes a string', () => {
		const str = 'foo-foo__';
		const newStr = humanize.humanize.method(str);
		const modifiedStr = 'Foo foo';
		expect(newStr).to.equal(modifiedStr);
	});
});
