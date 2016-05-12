const {remote} = window.require('electron');
const {dialog} = remote;

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
