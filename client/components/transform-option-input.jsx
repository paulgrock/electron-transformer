import React from 'react';
import ReactDOM from 'react-dom';
import transformList from '../transform-list';

export default React.createClass({
	render() {
		let { style, name } = this.props.option;
		let placeholder;
		if (style === "number") {
			placeholder = 0;
		}
		return (
			<input type={style} name={name} placeholder={placeholder} />
		);
	}
});
