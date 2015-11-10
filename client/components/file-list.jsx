var ipc = window.require('ipc');
import React from 'react';
import path from 'path';
import File from './file.jsx';

export default React.createClass({
	renameFile: function(file) {
		console.log(this.props.transforms);
		var filePath = path.dirname(file.path);
		var extension = path.extname(file.name);
		var fileName = path.basename(file.name, extension);
		var updatedFileName = `${fileName}2${extension}`;
		var updatedFilePath = path.join(filePath, updatedFileName);
		return {
			originalFileName: file.name,
			originalFilePath: file.path,
			updatedFileName: updatedFileName,
			updatedFilePath: updatedFilePath
		}
	},
	handleClick: function(e) {
		e.preventDefault();
		ipc.send('write-files', this.state.files);
	},
	handleDrop: function(e) {
		e.preventDefault();
		Array.from(e.dataTransfer.files).
			map(this.renameFile).
			forEach(this.props.onFileDrop);
	},
	render() {
		let ListOfFiles = this.props.files.map((file)=> {
			return <File file={file} key={file.originalFileName} />
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
			<button onClick={this.props.onClearClick}>Clear</button>
			</div>
		)
	}
})
