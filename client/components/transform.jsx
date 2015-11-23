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
		const formElementsNodeList = this.refs["transform-form"].querySelectorAll("[name]");
		var els = [...formElementsNodeList].
			reduce((prev, curr)=> {
				prev[curr.name] = curr.value;
				return prev;
			}, {});

		this.setState({
			selectedTransform: transformTypeEl.value
		});

		this.props.onChangeTransform({
			index: this.props.index,
			style: transformTypeEl.value,
			args: els
		})
	},
	handleRemove(idx) {
		this.props.onRemoveTransform(idx)
	},
	render() {
		let AdditionalTransformOptions;
		let AdditionalTransformOptionsList;
		const transformListArray = Object.keys(transformList);
		let selectedTransform = transformList[this.state.selectedTransform];
		let TransformOption = transformListArray.map(function(key) {
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
			<li className="list-group-item">
				<form onChange={this.handleChange} ref="transform-form">
					<select name="transform-type" ref="transform-type" className="form-control">
						{TransformOption}
					</select>
					{AdditionalTransformOptions}
				</form>
				<button onClick={this.handleRemove.bind(this, this.props.index)}><span className="icon icon-minus"></span></button>
			</li>
		)
	}
})
