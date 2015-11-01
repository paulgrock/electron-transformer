'use strict';
import React from 'react';
import FileList from './file-list.jsx';
import Transforms from './transforms.jsx';
var ipc = window.require('ipc');

ipc.on('error', (err)=> {
	console.error(err);
});

export default React.createClass({
	render() {
		return (
			<div className="container">
				<FileList />
				<Transforms />
			</div>
		)
	}
})
