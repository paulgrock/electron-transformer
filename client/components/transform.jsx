import React from 'react';

export default React.createClass({
	handleChange(e) {
		this.props.onChangeTransform({
			position: this.props.position,
			style: e.currentTarget.value,
			variations: []
		})
	},
	render() {
		return (
			<li>
				<select onChange={this.handleChange}>
					<option value="slugify">Slugify</option>
					<option value="remove-characters">Remove Characters</option>
					<option value="add-characters">Add Characters</option>
				</select>
			</li>
		)
	}
})
