const remote = window.require('remote');
const dialog = remote.require('dialog');

export default (window, cb) => {
	const options = {
		title: 'Add files to be transmformed',
		properties: ['openFile', 'openDirectory', 'multiSelections']
	};

	dialog.showOpenDialog(window, options, (files) => {
		if (files == null) {
			return cb(new Error('No Files'));
		}
		cb(null, files);
	});
};
