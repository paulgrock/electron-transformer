import React from 'react';
import TransformOptionInput from './transform-option-input.jsx'
import TransformOptionSelect from './transform-option-select.jsx'
import transformList from '../transform-list';

export default React.createClass({
	getInitialState() {
		return {
			selectedTransform: null
		}
	},
	handleChange(e) {
		var transformTypeEl = this.refs["transform-type"];
		var els = [...this.refs["transform-form"].querySelectorAll("[name]")].
			reduce((prev, curr)=> {
				prev[curr.name] = curr.value;
				return prev;
			}, {});

		this.setState({
			selectedTransform: transformTypeEl.value
		});

		// Position is basically id
		this.props.onChangeTransform({
			position: this.props.position,
			style: transformTypeEl.value,
			args: els
		})
	},
	render() {
		let AdditionalTransformOptions;
		let AdditionalTransformOptionsList;
		let selectedTransform = transformList[this.state.selectedTransform];
		let TransformOption = Object.keys(transformList).
			map(function(key) {
				return (
					<option value={key}>{transformList[key].name}</option>
				)
			})

		if (selectedTransform && selectedTransform.options != null) {
			AdditionalTransformOptionsList = selectedTransform.options.map(function(transformOption) {
				if (transformOption.type === 'select') {
					return <TransformOptionSelect option={transformOption} ref="transform-option-select" />
				}
				if (transformOption.type === 'input') {
					return <TransformOptionInput option={transformOption} />
				}
			})

			AdditionalTransformOptions =(
				<div>
					{AdditionalTransformOptionsList}
				</div>
			)
		}

		return (
			<li>
				<form onChange={this.handleChange} ref="transform-form">
					<select name="transform-type" ref="transform-type">
						{TransformOption}
					</select>
					{AdditionalTransformOptions}
				</form>
			</li>
		)
	}
})
