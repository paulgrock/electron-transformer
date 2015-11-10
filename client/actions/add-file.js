import { ADD_FILE } from './types';

export default function(file) {
	return {
		type: ADD_FILE,
		originalFileName: file.originalFileName,
		originalFilePath: file.originalFilePath,
		updatedFileName: file.updatedFileName,
		updatedFilePath: file.updatedFilePath
	}
}
