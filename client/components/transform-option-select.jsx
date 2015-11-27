import React from 'react';

export default React.createClass({
	render() {
		const { name, options } = this.props.option;
		let OptionList = options.map(function(selectOption) {
			return (
				<option value={selectOption.slug}>{selectOption.name}</option>
			)
		})

		return (
			<div>
				<select name={name} className="form-control" onChange={this.props.handleChange}>
					{OptionList}
				</select>
			</div>
		);
	}
})
