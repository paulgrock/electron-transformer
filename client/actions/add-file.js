import { ADD_FILE } from './types';

export default function(file) {
	return {
		type: ADD_FILE,
		originalFileName: file.originalFileName,
		path: file.path,
		updatedFileName: file.updatedFileName
	}
}
