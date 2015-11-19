import React from 'react';
import ReactDOM from 'react-dom';
import transformList from '../transform-list';

export default React.createClass({
	handleChange(e) {
		var transformTypeEl = this.refs["transform-type"];
		var els = Object.keys(this.refs).
			filter((el) => {
				if (el !== "transform-type") {
					return true;
				}
			}).
			reduce((prev, curr)=> {
				prev[curr] = this.refs[curr].value;
				return prev;
			}, {});
		this.props.onChangeTransform({
			position: this.props.position,
			style: transformTypeEl.value,
			args: els
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
				<form onChange={this.handleChange}>
					<select name="transform-type" ref="transform-type">
						{TransformOption}
					</select>
					<select name="from" ref="from">
						<option value="start">Start</option>
						<option value="end">end</option>
					</select>
					<input type="number" name="amount" ref="amount" />
				</form>
			</li>
		)
	}
})
