var ipc = window.require('ipc');
import React from 'react';
import path from 'path';
import File from './file.jsx';

var renameFile = function(file) {
	var filePath = path.dirname(file.path);
	var extension = path.extname(file.name);
	var fileName = path.basename(file.name, extension);
	var newFileName = `${fileName}2${extension}`;
	var newFilePath = path.join(filePath, newFileName);
	return {
		oldFileName: file.name,
		oldFilePath: file.path,
		newFileName: newFileName,
		newFilePath: newFilePath
	}
}

export default React.createClass({
	getInitialState() {
		return {
			files: []
		}
	},
	handleClick: function(e) {
		e.preventDefault();
		ipc.send('write-files', this.state.files);
	},
	handleDrop: function(e) {
		e.preventDefault();
		let files = Array.from(e.dataTransfer.files).map(function(file) {
			return {
				name: file.name,
				path: file.path
			}
		}).map(renameFile);
		this.setState({
			files: files
		})
	},
	render() {
		let ListOfFiles = this.state.files.map((file)=> {
			return <File file={file} key={file.oldFileName} />
		});

		return (
			<div className="fileContainer" onDrop={this.handleDrop}>
				<h1>Component</h1>
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
			</div>
		)
	}
})
