'use strict';
import React from 'react';
import { connect } from 'react-redux';
import FileList from './file-list.jsx';
import Transforms from './transforms.jsx';
var ipc = window.require('ipc');
import addFile from '../actions/add-file';
import addTransform from '../actions/add-transform';
import changeTransform from '../actions/change-transform';
import removeTransform from '../actions/remove-transform';
import clearFiles from '../actions/clear-files';
import renameFiles from '../actions/rename-files';
import changePosition from '../actions/change-position';
var remote = window.require('remote');
var dialog = remote.require('dialog');
var fs = remote.require('fs');
var recursive = remote.require('recursive-readdir');
import { formatFilesFromPath } from '../utils/file-formatter';

ipc.on('error', (err)=> {
	console.error(err);
	dialog.showErrorBox('Something went wrong', err);
});

ipc.on('file-write-success', (fileCount)=> {
	dialog.showMessageBox({
		type: 'info',
		message: 'Wrote ' + fileCount + ' files',
		buttons: ["OK"]
	})
});

const App = React.createClass({
	handleAddFiles(files) {
		this.props.dispatch(clearFiles());
		files.forEach((file)=> {
			fs.stat(file.path, (err, stats)=> {
				if (stats.isDirectory()) {
					recursive(file.path, ['.*'], (err, files)=> {
						formatFilesFromPath(files).forEach((file)=> this.props.dispatch(addFile(file)));
					});
				} else {
					this.props.dispatch(addFile(file));
				}
			});
		})
		this.props.dispatch(renameFiles());
	},
	handleAddTransform() {
		this.props.dispatch(addTransform());
		this.props.dispatch(renameFiles());
	},
	handleRemoveTransform(index) {
		var self = this;
		this.props.dispatch(removeTransform(index))
		this.props.dispatch(renameFiles());
	},
	handleChangeTransform(transform) {
		this.props.dispatch(changeTransform(transform));
		this.props.dispatch(renameFiles());
	},
	handlePositionChange(previousPosition, newPosition) {
		this.props.dispatch(changePosition(previousPosition, newPosition));
		this.props.dispatch(renameFiles());
	},
	render() {
		const {dispatch, files, transforms} = this.props;
		return (
			<div className="pane-group">
				<FileList onAddFiles={this.handleAddFiles} files={files} onClearClick={()=> dispatch(clearFiles())} />
				<Transforms transforms={transforms}
					onAddTransform={this.handleAddTransform}
					onChangeTransform={this.handleChangeTransform}
					onRemoveTransform={this.handleRemoveTransform}
					onPositionChange={this.handlePositionChange} />
			</div>
		)
	}
})

const select = (state)=> {
	return state
}

export default connect(select)(App);
