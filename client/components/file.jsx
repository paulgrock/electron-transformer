import React from 'react';

export default React.createClass({
	render() {
		var {file} = this.props;
		return (
			<tr>
				<td>{file.originalFileName}</td>
				<td>{file.updatedFileName}</td>
			</tr>
		)
	}
})
