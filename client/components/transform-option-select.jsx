import React from 'react';

export default React.createClass({
	render() {
		let { name, options } = this.props.option;

		let OptionList = options.map((selectOption, index) =>{
			return (
				<option value={selectOption.slug} key={`${selectOption.slug}-${index}`}>{selectOption.name}</option>
			)
		})

		return (
			<div>
				<select name={name} className="form-control" value={this.props.transform.args[name]} onChange={this.props.handleChange}>
					{OptionList}
				</select>
			</div>
		);
	}
})
