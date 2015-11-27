import React from 'react';
import TransformOptionInput from './transform-option-input.jsx'
import TransformOptionSelect from './transform-option-select.jsx'
import transformList from '../transforms/list';

export default React.createClass({
	handleChange(e) {
		var transformTypeEl = this.refs["transform-type"];
		const formElementsNodeList = this.refs["transform-form"].querySelectorAll("[name]");
		var els = [...formElementsNodeList].
			reduce((prev, curr)=> {
				prev[curr.name] = curr.value;
				return prev;
			}, {});

		this.props.onChangeTransform({
			index: this.props.index,
			style: transformTypeEl.value,
			args: els
		})
	},
	handleRemove() {
		this.props.onRemoveTransform(this.props.index)
	},
	render() {
		let { index, transform } = this.props;
		let AdditionalTransformOptions;
		let AdditionalTransformOptionsList;
		const transformListArray = Object.keys(transformList);
		let selectedTransform = transformList[transform.style];
		let TransformOption = transformListArray.map((key, idx) =>{
			return (
				<option value={key} key={key}>{transformList[key].name}</option>
			)
		})

		if (selectedTransform && selectedTransform.options != null) {
			AdditionalTransformOptionsList = selectedTransform.options.map((transformOption) => {
				if (transformOption.type === 'select') {
					return <TransformOptionSelect option={transformOption} ref="transform-option-select" handleChange={this.handleChange} />
				}
				if (transformOption.type === 'input') {
					return <TransformOptionInput option={transformOption} handleChange={this.handleChange} />
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
				<form ref="transform-form">
					<select name="transform-type" ref="transform-type" className="form-control" value={transform.style}  onChange={this.handleChange}>
						{TransformOption}
					</select>
					{AdditionalTransformOptions}
				</form>
				<button onClick={this.handleRemove}><span className="icon icon-minus"></span></button>
			</li>
		)
	}
})
