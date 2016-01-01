var ipc = window.require("electron").ipcRenderer;
import React from 'react';
import File from './file.jsx';
import { formatFileProperties, formatFilesFromPath } from '../utils/file-formatter';
import openDialog from '../utils/open-dialog';
import saveDialog from '../utils/save-dialog';
import Button from './button.jsx';

export default React.createClass({
	addFiles: function(files) {
		var formattedFiles = formatFilesFromPath(files);
		this.props.onAddFiles(formattedFiles);
	},
	componentWillMount: function() {
		ipc.on('new-files', (event, files) => this.addFiles(files) );
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
	handleDrop: function(e) {
		e.preventDefault();
		const fileList = [...e.dataTransfer.files].map(formatFileProperties);
		this.props.onAddFiles(fileList);
	},
	handleAddFiles() {
		openDialog(null, (err, files)=>{
			if (err) {
				return console.error(err);
			}
			return this.addFiles(files);
		});
	},
	render() {
		let ListOfFiles = this.props.files.map((file)=> {
			return <File file={file} key={file.originalFileName} />
		});

		return (
			<div className="pane" onDrop={this.handleDrop}>
				<table className="table-striped">
					<thead>
						<tr>
							<th>Original File Name</th>
							<th>New File Name</th>
						</tr>
					</thead>
					<tbody>
						{ListOfFiles}
					</tbody>
				</table>
				<div className="btn-group padded-top-more pull-right">
					<Button type="folder" handler={this.handleAddFiles} />
					<Button type="floppy" handler={this.handleSaveFiles} />
					<button className="btn btn-dark" onClick={this.props.onClearClick}>
						Clear
					</button>
				</div>
			</div>
		)
	}
})
