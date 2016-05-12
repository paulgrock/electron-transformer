const {remote} = window.require('electron');
const {dialog} = remote;

export default (files, cb) => {
	const fileLength = files.length;
	const filesPluralized = fileLength === 1 ? 'file' : 'files';
	const dialogButtons = ['Yes', 'Cancel'];
	const opts = {
		type: 'question',
		message: `About to change ${fileLength} ${filesPluralized}. Are you cool with that?`,
		buttons: dialogButtons
	};

	dialog.showMessageBox(opts, (response) => {
		if (dialogButtons[response] !== 'Cancel') {
			cb(null, files);
		}
	});
};
