import React from 'react';

export default React.createClass({
	render() {
		var file = this.props.file;
		return (
			<tr>
				<td>{file.oldFileName}</td>
				<td>{file.newFileName}</td>
			</tr>
		)
	}
})
