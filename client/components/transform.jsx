import React from 'react';
import TransformOptionInput from './transform-option-input.jsx'
import TransformOptionSelect from './transform-option-select.jsx'
import transformList from '../transforms/list';
import { DragSource, DropTarget } from 'react-dnd';
import Button from './button.jsx';

var transformSource = {
	beginDrag: function (props) {
		return {
			transformId: props.index
		};
  }
}

const collectDrag = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

var dropTarget = {
	drop(props, monitor) {
		const previousPosition = monitor.getItem().transformId;
		const newPosition = props.index;
		props.onPositionChange(previousPosition, newPosition);
  }
};

const collectDrop = (connect, monitor) =>{
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
};

const Transform =  React.createClass({
	changeStyle() {

	},
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
		let { index, transform, connectDragSource, isDragging, connectDropTarget } = this.props;

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

		return connectDropTarget(connectDragSource(
			<li className="list-group-item" style={{
        opacity: isDragging ? 0.5 : 1}}>
				<form ref="transform-form">
					<select name="transform-type" ref="transform-type" className="form-control" value={transform.style}  onChange={this.handleStyleChange}>
						{TransformOption}
					</select>
					{AdditionalTransformOptions}
				</form>
				<Button type="minus" handler={this.handleRemove} />
			</li>
		))
	}
})

export default DropTarget("TRANSFORM", dropTarget, collectDrop)(DragSource("TRANSFORM", transformSource, collectDrag)(Transform));
