import path from 'path';
import transformList from './transforms/list';

const renameFile = (file, transforms) => {
	if (transforms == null) {
		return file;
	}
	const extension = path.extname(file.originalFileName);
	const originalFileNameWithoutExt = path.basename(file.originalFileName, extension);
	const transformedFileName = transforms.reduce((file, transform) => {
		return transformList[transform.style].method(file, transform.args);
	}, originalFileNameWithoutExt);
	return {
		id: path.join(file.path, file.originalFileName),
		originalFileName: file.originalFileName,
		path: file.path,
		updatedFileName: `${transformedFileName}${extension}`
	};
};

export default renameFile;
