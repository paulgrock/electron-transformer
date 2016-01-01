var ipc = window.require("electron").ipcRenderer;
import React from 'react';
import openDialog from '../utils/open-dialog';
import saveDialog from '../utils/save-dialog';
import { formatFilesFromPath } from '../utils/file-formatter';

const DialogHandler = (Wrapped) => React.createClass({
	addFiles: function(files) {
		var formattedFiles = formatFilesFromPath(files);
		this.props.onAddFiles(formattedFiles);
	},
	handleAddFiles() {
		openDialog(null, (err, files)=>{
			if (err) {
				return console.error(err);
			}
			return this.addFiles(files);
		});
	},
	handleSaveFiles(e) {
		e.preventDefault();
		saveDialog(this.props.files, (err, files) => {
			if (err) {
				return console.error(err);
			}
			ipc.send('write-files', files);
		})
	},
	render() {
		return (
			<Wrapped {...this.props} handleAddFiles={this.handleAddFiles} handleSaveFiles={this.handleSaveFiles} {...this.state} />
		)
	}
});

export default DialogHandler;
