var remote = window.require('remote');
var dialog = remote.require('dialog');

export default function(window, cb) {
	const options = {
		title: 'Add files to be transmformed',
		properties: ['openFile', 'openDirectory', 'multiSelections']
	};

	dialog.showOpenDialog(window, options, function(files) {
		if (files == null) {
			return cb(new Error('No Files'));
		}
		cb(null, files);
	});
}
