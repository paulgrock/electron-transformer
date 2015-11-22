var ipc = window.require('ipc');
import React from 'react';
import File from './file.jsx';
import transformList from '../transform-list';
import path from 'path';
var remote = window.require('remote');
var dialog = remote.require('dialog');

export default React.createClass({
	componentWillMount: function() {
		ipc.on('new-files', (files)=> {
			var fileList = files.map((file)=> {
				return this.formatFileProperties({
					name: path.basename(file),
					path: file
				})
			});
			this.props.onAddFiles(fileList);
		});
	},
	formatFileProperties: function(file) {
		return {
			originalFileName: file.name,
			path: file.path,
			updatedFileName: file.name
		}
	},
	handleClick(e) {
		e.preventDefault();
		const dialogButtons = ['Yes', 'Cancel'];
		dialog.showMessageBox.call(this, {
			type: 'question',
			message: `About to change ${this.props.files.length}. Are you cool with that?`,
			buttons: dialogButtons
		}, (response)=> {
			console.log(this);
			if (dialogButtons[response] !== 'Cancel') {
				ipc.send('write-files', this.props.files);
			}
		})
	},
	handleDrop: function(e) {
		e.preventDefault();
		const fileList = [...e.dataTransfer.files].map(this.formatFileProperties);
		this.props.onAddFiles(fileList);
	},
	render() {
		let ListOfFiles = this.props.files.map((file)=> {
			return <File file={file} key={file.originalFileName} />
		});

		return (
			<div className="fileContainer" onDrop={this.handleDrop}>
				<h1>File List</h1>
				<table>
					<thead>
						<tr>
							<td>Original File Name</td>
							<td>New File Name</td>
						</tr>
					</thead>
					<tbody>
						{ListOfFiles}
					</tbody>
				</table>
				<button onClick={this.handleClick}>Change</button>
				<button onClick={this.props.onClearClick}>Clear</button>
			</div>
		)
	}
})
