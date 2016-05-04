import {ADD_FILE} from './types';
import path from 'path';

export default (file) => {
	const filePath = path.dirname(file.path);
	return {
		type: ADD_FILE,
		id: file.path,
		originalFileName: file.originalFileName,
		path: filePath,
		updatedFileName: file.updatedFileName
	};
};
