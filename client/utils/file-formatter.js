import path from 'path';

export const formatFileProperties = (file) => {
	return {
		id: path.join(file.path, file.name),
		originalFileName: file.name,
		path: file.path,
		updatedFileName: file.name
	};
};

export const formatFileFromPath = (file) => {
	return formatFileProperties({
		name: path.basename(file),
		path: file
	});
};

export const formatFilesFromPath = (files) => {
	return files.map(formatFileFromPath);
};
