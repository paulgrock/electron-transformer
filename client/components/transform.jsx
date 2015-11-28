import React from 'react';
import TransformOptionInput from './transform-option-input.jsx'
import TransformOptionSelect from './transform-option-select.jsx'
import transformList from '../transforms/list';

export default React.createClass({
	handleStyleChange(e) {
		const transformName = e.target.value
		const opts = transformList[transformName].options;
		this.props.onChangeTransform({
			index: this.props.index,
			style: transformName,
			args: {}
		})
	},
	handleChange(e) {
		this.props.transform.args[e.target.name] = e.target.value;
		this.props.transform.index = this.props.index
		this.props.onChangeTransform(this.props.transform);
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
			AdditionalTransformOptionsList = selectedTransform.options.map((transformOption, index) => {
				if (transformOption.type === 'select') {
					return <TransformOptionSelect option={transformOption} transform={this.props.transform} key={`transform-option-select-${index}`} handleChange={this.handleChange} />
				}
				if (transformOption.type === 'input') {
					return <TransformOptionInput option={transformOption} transform={this.props.transform} key={`transform-option-input-${index}`}
						handleChange={this.handleChange} />
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
					<select name="transform-type" ref="transform-type" className="form-control" value={transform.style}  onChange={this.handleStyleChange}>
						{TransformOption}
					</select>
					{AdditionalTransformOptions}
				</form>
				<button onClick={this.handleRemove}><span className="icon icon-minus"></span></button>
			</li>
		)
	}
})
