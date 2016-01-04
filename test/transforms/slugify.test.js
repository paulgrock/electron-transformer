import {expect} from 'chai';
import slugify from '../../client/transforms/slugify';

describe('Slugify', () => {
	it('Slugifies a string', () => {
		const str = 'foo foo';
		const newStr = slugify.slugify.method(str);
		const modifiedStr = 'foo-foo';
		expect(newStr).to.equal(modifiedStr);
	});
});
