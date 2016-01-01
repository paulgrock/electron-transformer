import {expect} from 'chai';
import reducers from '../client/reducers';

describe('Reducers', () => {
	describe('No state', () => {
		it('Passing undefined state returns the initial state', () => {
			const initialState = {
				files: [],
				transforms: []
			};
			const newState = reducers(undefined, {});
			expect(initialState).to.deep.equal(newState);
		});
	});

	describe('Random aciton type', () => {
		it('Returns the initial state', () => {
			const initialState = {
				files: [],
				transforms: []
			};
			const newState = reducers(undefined, {
				type: 'spaghetti'
			});
			expect(initialState).to.deep.equal(newState);
		});
	});

	describe('Add File', () => {
		it('Adding a file returns a new state', () => {
			const action = {
				type: 'ADD_FILE',
				originalFileName: './bar/foo.js',
				path: './bar.js',
				updatedFileName: './bar/FOO.js'
			};

			const modifiedState = reducers(undefined, action);
			const newState = {
				files: [
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: './bar/FOO.js'
					}
				],
				transforms: []
			};

			expect(modifiedState).to.deep.equal(newState);
		});
	});

	describe('Add Transform', () => {
		it('To empty state', () => {
			const action = {
				type: 'ADD_TRANSFORM',
				style: './bar/foo.js',
				args: {}
			};
			const modifiedState = reducers(undefined, action);
			const newState = {
				files: [],
				transforms: [{
					style: './bar/foo.js',
					args: {}
				}]
			};

			expect(modifiedState).to.deep.equal(newState);
		});

		it('To preexisting a state', () => {
			const action = {
				type: 'ADD_TRANSFORM',
				style: './bar/foo.js',
				args: {}
			};
			const newAction = {
				type: 'ADD_TRANSFORM',
				style: 'upper-case',
				args: {}
			};

			const modifiedState = reducers(undefined, action);
			const updatedState = reducers(modifiedState, newAction);
			const newState = {
				files: [],
				transforms: [
					{
						style: './bar/foo.js',
						args: {}
					},
					{

						style: 'upper-case',
						args: {}
					}
				]
			};
			expect(updatedState).to.deep.equal(newState);
		});
	});

	describe('Change Transform', () => {
		it('Modifies transform', () => {
			const state = {
				files: [],
				transforms: [
					{
						style: 'upper-case',
						args: {}
					},
					{
						style: 'humanize',
						args: {}
					}
				]
			};

			const action = {
				type: 'CHANGE_TRANSFORM',
				index: 1,
				style: 'remove-characters',
				args: {
					from: 'start',
					amount: 3
				}
			};

			const newState = {
				files: [],
				transforms: [
					{
						style: 'upper-case',
						args: {}
					},
					{
						style: 'remove-characters',
						args: {
							from: 'start',
							amount: 3
						}
					}
				]
			};

			const modifiedState = reducers(state, action);

			expect(modifiedState).to.deep.equal(newState);
		});
	});

	describe('Remove Transform', () => {
		it('Removes transform', () => {
			const state = {
				files: [],
				transforms: [
					{
						style: 'upper-case',
						args: {}
					},
					{
						style: 'humanize',
						args: {}
					}
				]
			};

			const action = {
				type: 'REMOVE_TRANSFORM',
				index: 1
			};

			const newState = {
				files: [],
				transforms: [
					{
						style: 'upper-case',
						args: {}
					}
				]
			};

			const modifiedState = reducers(state, action);
			expect(modifiedState).to.deep.equal(newState);
		});
	});

	describe('Rename Files', () => {
		it('Renames all files with a single transform with no args', () => {
			const action = {
				type: 'RENAME_FILES'
			};
			const state = {
				files: [
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'foo.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'foo.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'foo.js'
					}
				],
				transforms: [
					{
						style: 'upper-case',
						args: {}
					}
				]
			};
			const modifiedState = reducers(state, action);
			const newState = {
				files: [
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'FOO.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'FOO.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'FOO.js'
					}
				],
				transforms: [
					{
						style: 'upper-case',
						args: {}
					}
				]
			};
			expect(modifiedState).to.deep.equal(newState);
		});

		it('Renames all files with a single transforms with args', () => {
			const action = {
				type: 'RENAME_FILES'
			};
			const state = {
				files: [
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'foo.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'foo.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'foo.js'
					}
				],
				transforms: [
					{
						style: 'remove-characters',
						args: {
							from: 'end',
							amount: 2
						}
					}
				]
			};
			const modifiedState = reducers(state, action);
			const newState = {
				files: [
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'f.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'f.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'f.js'
					}
				],
				transforms: [
					{
						style: 'remove-characters',
						args: {
							from: 'end',
							amount: 2
						}
					}
				]
			};
			expect(modifiedState).to.deep.equal(newState);
		});

		it('Renames all files with multiple transforms in order', () => {
			const action = {
				type: 'RENAME_FILES'
			};
			const state = {
				files: [
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'foo.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'foo.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'foo.js'
					}
				],
				transforms: [
					{
						style: 'upper-case',
						args: {}
					},
					{
						style: 'remove-characters',
						args: {
							from: 'end',
							amount: 2
						}
					}
				]
			};

			const modifiedState = reducers(state, action);
			const newState = {
				files: [
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'F.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'F.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: 'F.js'
					}
				],
				transforms: [
					{
						style: 'upper-case',
						args: {}
					},
					{
						style: 'remove-characters',
						args: {
							from: 'end',
							amount: 2
						}
					}
				]
			};
			expect(modifiedState).to.deep.equal(newState);
		});
	});

	describe('Clear Files', () => {
		it('Removes all files', () => {
			const action = {
				type: 'CLEAR_FILES'
			};

			const state = {
				files: [
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: './bar/FOO.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: './bar/FOO.js'
					},
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: './bar/FOO.js'
					}
				],
				transforms: []
			};
			const modifiedState = reducers(state, action);
			const newState = {
				files: [],
				transforms: []
			};
			expect(modifiedState).to.deep.equal(newState);
		});
	});
});
