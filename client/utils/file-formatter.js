import path from 'path';

export const formatFileProperties = function(file) {
	return {
		originalFileName: file.name,
		path: file.path,
		updatedFileName: file.name
	}
}

export const formatFileFromPath = function(file) {
	return formatFileProperties({
		name: path.basename(file),
		path: file
	});
};

export const formatFilesFromPath = function(files) {
	return files.map(formatFileFromPath);
};
