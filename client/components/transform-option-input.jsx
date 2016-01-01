import React from 'react';

export default (props) => {
	const {style, name} = props.option;
	let placeholder;
	if (style === 'number') {
		placeholder = 0;
	}

	return (
		<input type={style} name={name} placeholder={placeholder} className="form-control" onChange={props.handleChange} value={props.transform.args[name]} />
	);
};
