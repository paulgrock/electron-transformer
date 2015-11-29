import React from 'react';

export default React.createClass({
	render() {
		return (
			<header className="toolbar toolbar-header">
				<h1 className="title">Transformer</h1>
				<div className="toolbar-actions">
					<div className="btn-group">
						<button className="btn btn-default">
							<span className="icon icon-folder"></span>
						</button>
						<button className="btn btn-default">
							<span className="icon icon-floppy"></span>
						</button>
					</div>
				</div>
			</header>
		)
	}
})
