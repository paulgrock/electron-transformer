import React from 'react';

export default (props) => {
	const {name, options} = props.option;

	const OptionList = options.map((selectOption, index) => {
		return (
			<option value={selectOption.slug} key={`${selectOption.slug}-${index}`}>{selectOption.name}</option>
		);
	});

	return (
		<div>
			<select name={name} className="form-control select" value={props.transform.args[name]} onChange={props.handleChange}>
				{OptionList}
			</select>
		</div>
	);
};
