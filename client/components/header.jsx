var ipc = window.require("electron").ipcRenderer;
import React from 'react';
import openDialog from '../utils/open-dialog';
import saveDialog from '../utils/save-dialog';
import { formatFilesFromPath } from '../utils/file-formatter';

export default React.createClass({
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
			<header className="toolbar toolbar-header">
				<h1 className="title">Transformer</h1>
				<div className="toolbar-actions">
					<div className="btn-group">
						<button className="btn btn-default" onClick={this.handleAddFiles}>
							<span className="icon icon-folder"></span>
						</button>
						<button className="btn btn-default" onClick={this.handleSaveFiles}>
							<span className="icon icon-floppy"></span>
						</button>
					</div>
				</div>
			</header>
		)
	}
})
