import React from 'react';
import ReactDOM from 'react-dom';
import transformList from '../transform-list';

export default React.createClass({
	render() {
		let { style, name } = this.props.option;
		return (
			<input type={style} name={name} ref={name} />
		);
	}
});
