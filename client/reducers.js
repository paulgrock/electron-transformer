import {combineReducers} from 'redux';
import reduceReducer from 'reduce-reducers';
import files from './reducers/files';
import transforms from './reducers/transforms';
import renameFiles from './reducers/rename-files';

export default reduceReducer(
	combineReducers({
		files,
		transforms
	}),
	renameFiles
);
