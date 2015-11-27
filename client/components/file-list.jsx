var ipc = window.require('ipc');
import React from 'react';
import File from './file.jsx';
import { formatFileProperties, formatFilesFromPath } from '../utils/file-formatter';
var remote = window.require('remote');
var dialog = remote.require('dialog');
import openDialog from '../utils/open-dialog';

export default React.createClass({
	addFiles: function(files) {
		var formattedFiles = formatFilesFromPath(files);
		this.props.onAddFiles(formattedFiles);
	},
	componentWillMount: function() {
		ipc.on('new-files', this.addFiles);
	},
	handleClick(e) {
		e.preventDefault();
		const dialogButtons = ['Yes', 'Cancel'];
		const opts = {
			type: 'question',
			message: `About to change ${this.props.files.length}. Are you cool with that?`,
			buttons: dialogButtons
		};
		dialog.showMessageBox(opts, (response)=> {
			if (dialogButtons[response] !== 'Cancel') {
				ipc.send('write-files', this.props.files);
			}
		})
	},
	handleDrop: function(e) {
		e.preventDefault();
		const fileList = [...e.dataTransfer.files].map(formatFileProperties);
		this.props.onAddFiles(fileList);
	},
	handleAddFiles() {
		const opts = {
			title: 'Add files to be transmformed',
			properties: ['openFile', 'multiSelections', 'createDirectory']
		};

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
				<div className="padded-more">
					<h1>File List</h1>
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
						<button onClick={this.handleAddFiles}>Add Files</button>
						<button onClick={this.handleClick}>Change</button>
						<button onClick={this.props.onClearClick}>Clear</button>
					</div>
				</div>
			</div>
		)
	}
})
