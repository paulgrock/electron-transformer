import React from 'react';
import File from './file.jsx';
import {formatFileProperties} from '../utils/file-formatter';
import Button from './button.jsx';
import DialogHandler from './dialog-handler.jsx';
import SortHeader from './sort-header.jsx';

const FileList = React.createClass({
	handleDrop(e) {
		e.preventDefault();
		const fileList = [...e.dataTransfer.files].map(formatFileProperties);
		this.props.onAddFiles(fileList);
	},
	render() {
		const {handleAddFiles, handleSaveFiles, onSortFiles, onClearClick} = this.props;

		const ListOfFiles = this.props.files.map((file) => {
			return <File file={file} key={file.id} />;
		});

		return (
			<div className="pane" onDrop={this.handleDrop}>
				<table className="table-striped">
					<thead>
						<tr>
							<SortHeader text="Original" handleSort={onSortFiles} />
							<SortHeader text="New" handleSort={onSortFiles} />
						</tr>
					</thead>
					<tbody>
						{ListOfFiles}
					</tbody>
				</table>
				<div className="btn-group padded-more pull-right">
					<Button type="folder" handler={handleAddFiles} />
					<Button type="floppy" handler={handleSaveFiles} />
					<button className="btn btn-dark" onClick={onClearClick}>
						Clear
					</button>
				</div>
			</div>
		);
	}
});

export default DialogHandler(FileList);
