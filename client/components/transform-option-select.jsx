import React from 'react';

export default (props) => {
	let { name, options } = props.option;

	let OptionList = options.map((selectOption, index) =>{
		return (
			<option value={selectOption.slug} key={`${selectOption.slug}-${index}`}>{selectOption.name}</option>
		)
	})

	return (
		<div>
			<select name={name} className="form-control" value={props.transform.args[name]} onChange={props.handleChange}>
				{OptionList}
			</select>
		</div>
	);
}
