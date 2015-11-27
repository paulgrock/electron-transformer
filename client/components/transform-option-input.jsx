import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({
	render() {
		let { style, name } = this.props.option;
		let placeholder;
		if (style === "number") {
			placeholder = 0;
		}
		return (
			<input type={style} name={name} placeholder={placeholder} className="form-control" onChange={this.props.handleChange} />
		);
	}
});
