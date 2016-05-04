import React from 'react';

export default React.createClass({
	render() {
		return (
			<th onClick={this.props.handleSort}>{this.props.text} Files Name</th>
		);
	}
});
