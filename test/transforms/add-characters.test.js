import {expect} from 'chai';
import addCharacters from '../../client/transforms/add-characters';

describe('Add Characters', () => {
	it('Add characters to the beginning of a string', () => {
		const str = 'foo-foo__';
		const args = {
			'additional-characters': 'baz'
		};

		const newStr = addCharacters['add-characters'].method(str, args);
		const modifiedStr = 'bazfoo-foo__';
		expect(newStr).to.equal(modifiedStr);
	});

	it('Add characters to the end of a string', () => {
		const str = 'foo-foo__';
		const args = {
			'additional-characters': 'baz',
			from: 'end'
		};

		const newStr = addCharacters['add-characters'].method(str, args);
		const modifiedStr = 'foo-foo__baz';
		expect(newStr).to.equal(modifiedStr);
	});
});
