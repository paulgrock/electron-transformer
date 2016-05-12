'use strict';
import React from 'react';
import {connect} from 'react-redux';
const {remote, ipcRenderer: ipc} = window.require('electron');
const {dialog} = remote;
const recursive = remote.require('recursive-readdir');
const fs = remote.require('fs');

import FileList from './file-list.jsx';
import Transforms from './transforms.jsx';
import Header from './header.jsx';

import addFile from '../actions/add-file';
import addTransform from '../actions/add-transform';
import changeTransform from '../actions/change-transform';
import removeTransform from '../actions/remove-transform';
import clearFiles from '../actions/clear-files';
import changePosition from '../actions/change-position';

import {formatFilesFromPath} from '../utils/file-formatter';

ipc.on('error', (event, err) => {
	console.error(err);
	dialog.showErrorBox('Something went wrong', err);
});

ipc.on('file-write-success', (event, fileCount) => {
	dialog.showMessageBox({
		type: 'info',
		message: `Wrote ${fileCount} files`,
		buttons: ['OK']
	});
});

const App = React.createClass({
	dispatchAddFile(file) {
		this.props.dispatch(addFile(file));
	},
	handleAddFiles(files) {
		this.props.dispatch(clearFiles());
		files.forEach((file) => {
			fs.stat(file.path, (err, stats) => {
				if (stats.isDirectory()) {
					recursive(file.path, ['.*'], (err, files) => {
						formatFilesFromPath(files).forEach(this.dispatchAddFile);
					});
				} else {
					this.dispatchAddFile((file));
				}
			});
		});
	},
	handleAddTransform() {
		this.props.dispatch(addTransform());
	},
	handleRemoveTransform(index) {
		this.props.dispatch(removeTransform(index));
	},
	handleChangeTransform(transform) {
		this.props.dispatch(changeTransform(transform));
	},
	handlePositionChange(previousPosition, newPosition) {
		this.props.dispatch(changePosition(previousPosition, newPosition));
	},
	render() {
		const {dispatch, files, transforms} = this.props;
		return (
			<div className="window">
				<Header onAddFiles={this.handleAddFiles} files={files} />
				<div className="window-content">
					<div className="pane-group">
						<FileList onAddFiles={this.handleAddFiles} files={files} onClearClick={() => dispatch(clearFiles())} />
						<Transforms transforms={transforms}
							onAddTransform={this.handleAddTransform}
							onChangeTransform={this.handleChangeTransform}
							onRemoveTransform={this.handleRemoveTransform}
							onPositionChange={this.handlePositionChange}
							/>
					</div>
				</div>
			</div>
		);
	}
});

const select = (state) => state;

export default connect(select)(App);
