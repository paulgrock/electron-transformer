import React from 'react';
import transformList from '../transform-list';

export default React.createClass({
	handleChange(e) {
		this.props.onChangeTransform({
			position: this.props.position,
			style: e.currentTarget.value,
			variations: []
		})
	},
	render() {
		let TransformOption = Object.keys(transformList).
			map(function(key) {
				return (
					<option value={key}>{transformList[key].name}</option>
				)
			})

		return (
			<li>
				<select onChange={this.handleChange}>
					{TransformOption}
				</select>
			</li>
		)
	}
})
