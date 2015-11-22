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
import renameFiles from '../actions/rename-files'

ipc.on('error', (err)=> {
	console.error(err);
});

const App = React.createClass({
	handleAddFiles(dispatch, files) {
		dispatch(clearFiles());
		files.forEach((file)=> {
			dispatch(addFile(file));
		})
		dispatch(renameFiles());
	},
	handleAddTransform(dispatch) {
		dispatch(addTransform());
		dispatch(renameFiles());
	},
	handleRemoveTransform(dispatch, index) {
		dispatch(removeTransform(index));
		dispatch(renameFiles());
	},
	handleChangeTransform(dispatch, transform) {
		dispatch(changeTransform(transform));
		dispatch(renameFiles());
	},
	render() {
		const {dispatch, files, transforms} = this.props;
		return (
			<div className="container">
				<FileList onFileDrop={(files)=> this.handleAddFiles(dispatch, files)} files={files} onClearClick={()=> dispatch(clearFiles())} />
				<Transforms transforms={transforms}
					onAddTransform={()=> {this.handleAddTransform(dispatch)}}
					onChangeTransform={(transform)=> {this.handleChangeTransform(dispatch, transform)}}
					onRemoveTransform={(idx)=> this.handleRemoveTransform(dispatch, idx)}/>
			</div>
		)
	}
})

const select = (state)=> {
	return state
}

export default connect(select)(App);
