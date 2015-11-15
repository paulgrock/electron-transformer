var ipc = window.require('ipc');
import React from 'react';
import File from './file.jsx';
import transformList from '../transform-list';

export default React.createClass({
	formatFileProperties: function(file) {
		return {
			originalFileName: file.name,
			path: file.path,
			updatedFileName: file.name
		}
	},
	handleClick: function(e) {
		e.preventDefault();
		ipc.send('write-files', this.props.files);
	},
	handleDrop: function(e) {
		e.preventDefault();
		Array.from(e.dataTransfer.files).
			map(this.formatFileProperties).
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
