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

ipc.on('error', (err)=> {
	console.error(err);
});

const App = React.createClass({
	render() {
		const {dispatch, files, transforms} = this.props;
		return (
			<div className="container">
				<FileList onFileDrop={files=> dispatch(addFile(files))} files={files} onClearClick={()=> dispatch(clearFiles())} transforms={transforms} />
			<Transforms transforms={transforms} onAddTransform={()=> dispatch(addTransform())} onChangeTransform={(transform)=> dispatch(changeTransform(transform))} />
			</div>
		)
	}
})

const select = (state)=> {
	return {
	  files: state.files,
		transforms: state.transforms
	}
}

export default connect(select)(App);
