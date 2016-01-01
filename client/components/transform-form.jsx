import React from 'react';
import transformList from '../transforms/list';
import AdditionalTransformOptions from './transform-options.jsx';

export default React.createClass({
	handleStyleChange(e) {
		const transformName = e.target.value;
		this.props.onChangeTransform({
			index: this.props.index,
			style: transformName,
			args: {}
		});
	},
	handleChange(e) {
		this.props.transform.args[e.target.name] = e.target.value;
		this.props.transform.index = this.props.index;
		this.props.onChangeTransform(this.props.transform);
	},
	render() {
		const {transform, index} = this.props;
		const transformListArray = Object.keys(transformList);
		const selectedTransform = transformList[transform.style];
		const TransformOptions = transformListArray.map((key) => {
			return (
				<option value={key} key={key}>{transformList[key].name}</option>
			);
		});

		return (
			<form>
				<select name="transform-type" className="form-control" value={transform.style} onChange={this.handleStyleChange}>
					{TransformOptions}
				</select>
				<AdditionalTransformOptions index={index} transform={transform} handleChange={this.handleChange} selectedTransform={selectedTransform} />
			</form>
		);
	}
});
