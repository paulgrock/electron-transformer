import {expect} from 'chai';
import renameFile from '../client/rename-file';

describe('Rename file', () => {
	it('Returns unmodified file when no transforms are passed', () => {
		const file = {
			originalFileName: 'foo.js',
			path: '~/docs/',
			updatedFileName: 'foo.js'
		};

		const modifiedFile = renameFile(file);

		expect(modifiedFile).to.deep.equal(file);
	});

	it('Return modifies updatedFileName with one transform', () => {
		const file = {
			originalFileName: 'foo.js',
			path: '~/docs/',
			updatedFileName: 'foo.js'
		};

		const transforms = [
			{
				style: 'upper-case',
				args: []
			}
		];

		const updatedFile = {
			originalFileName: 'foo.js',
			path: '~/docs/',
			updatedFileName: 'FOO.js'
		};

		const modifiedFile = renameFile(file, transforms);

		expect(modifiedFile).to.deep.equal(updatedFile);
	});

	it('Return modifies updatedFileName with multiple transforms', () => {
		const file = {
			originalFileName: 'foo.js',
			path: '~/docs/',
			updatedFileName: 'foo.js'
		};

		const transforms = [
			{
				style: 'upper-case',
				args: {}
			},
			{
				style: 'add-characters',
				args: {
					from: 'start',
					'additional-characters': 'abc'
				}
			}
		];

		const updatedFile = {
			originalFileName: 'foo.js',
			path: '~/docs/',
			updatedFileName: 'abcFOO.js'
		};

		const modifiedFile = renameFile(file, transforms);
		expect(modifiedFile).to.deep.equal(updatedFile);
	});
});
