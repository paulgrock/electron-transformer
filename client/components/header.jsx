var ipc = window.require("electron").ipcRenderer;
import React from 'react';
import openDialog from '../utils/open-dialog';
import saveDialog from '../utils/save-dialog';
import { formatFilesFromPath } from '../utils/file-formatter';
import Button from './button.jsx';

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
						<Button type="folder" handler={this.handleAddFiles} color="default" />
						<Button type="floppy" handler={this.handleSaveFiles} color="default" />
					</div>
				</div>
			</header>
		)
	}
})
