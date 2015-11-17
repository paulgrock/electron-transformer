import path from 'path';
import transformList from './transform-list';

const renameFile = (file, transforms)=> {
	var extension = path.extname(file.originalFileName);
	var originalFileNameWithoutExt = path.basename(file.originalFileName, extension);
	var transformedFileName = transforms.reduce(function(file, transform) {
		return transformList[transform.style].method(file);
	}, originalFileNameWithoutExt);
	return {
		originalFileName: file.originalFileName,
		path: file.path,
		updatedFileName: `${transformedFileName}${extension}`
	}
}

export default renameFile;
