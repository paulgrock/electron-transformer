import path from 'path';
import transformList from './transforms/list';

const renameFile = (file, transforms)=> {
	var extension = path.extname(file.originalFileName);
	var originalFileNameWithoutExt = path.basename(file.originalFileName, extension);
	var transformedFileName = transforms.reduce(function(file, transform) {
		return transformList[transform.style].method(file, transform.args);
	}, originalFileNameWithoutExt);
	return {
		originalFileName: file.originalFileName,
		path: file.path,
		updatedFileName: `${transformedFileName}${extension}`
	}
}

export default renameFile;
