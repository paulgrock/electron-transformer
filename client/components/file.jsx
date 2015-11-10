import React from 'react';

export default React.createClass({
	render() {
		var file = this.props.file;
		return (
			<tr>
				<td>{file.originalFileName}</td>
				<td>{file.updatedFileName}</td>
			</tr>
		)
	}
})
