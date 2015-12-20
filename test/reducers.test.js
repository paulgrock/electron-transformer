import { expect } from 'chai';
import reducers from '../client/reducers';

describe('Reducers', () => {
	describe('No state', ()=> {
		it('Passing undefined state returns the initial state', ()=> {
			const initialState = {
				files: [],
				transforms: []
			};
			const newState = reducers(undefined, {});
			expect(initialState).to.deep.equal(newState);
		});
	});

	describe('Random aciton type', ()=> {
		it('Returns the initial state', ()=> {
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

	describe('Add File', ()=> {
		it('Adding a file returns a new state', ()=> {
			const action = {
				type: "ADD_FILE",
				originalFileName: './bar/foo.js',
				path: './bar.js',
				updatedFileName: './bar/FOO.js'
			}
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
			}
			expect(modifiedState).to.deep.equal(newState);
		})
	});

	describe('Add Transform', ()=> {
		it('Returns a new state with updated transforms', ()=> {
			const action = {
				type: "ADD_TRANSFORM",
				style: './bar/foo.js',
				args: []
			};
			const state = {
				files: [
					{
						originalFileName: './bar/foo.js',
						path: './bar.js',
						updatedFileName: './bar/FOO.js'
					}
				],
				transforms: []
			}
			const modifiedState = reducers(undefined, action);
			const newState = {
				files: [],
				transforms: [{
					style: './bar/foo.js',
					args: []
				}]
			}
			expect(modifiedState).to.deep.equal(newState);
		})
	});

	describe('Clear Files', ()=> {
		it('Removes all files', ()=> {
			const action = {
				type: "CLEAR_FILES"
			}
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
			}
			const modifiedState = reducers(state, action);
			console.log(modifiedState);
			const newState = {
				files: [],
				transforms: []
			}
			expect(modifiedState).to.deep.equal(newState);
		})
	});
});
