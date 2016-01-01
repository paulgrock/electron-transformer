import React from 'react';

import Button from './button.jsx';
import DialogHandler from './dialog-handler.jsx';

const Header = React.createClass({
	render() {
		const { handleAddFiles, handleSaveFiles } = this.props;
		return (
			<header className="toolbar toolbar-header">
				<h1 className="title">Transformer</h1>
				<div className="toolbar-actions">
					<div className="btn-group">
						<Button type="folder" handler={handleAddFiles} color="default" />
						<Button type="floppy" handler={handleSaveFiles} color="default" />
					</div>
				</div>
			</header>
		)
	}
});


export default DialogHandler(Header);
