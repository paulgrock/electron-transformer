import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import TransformForm from './transform-form.jsx';
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
	handleRemove() {
		this.props.onRemoveTransform(this.props.index)
	},
	render() {
		let { index, transform, onChangeTransform, connectDragSource, isDragging, connectDropTarget } = this.props;
		return connectDropTarget(connectDragSource(
			<li className="list-group-item" style={{
        opacity: isDragging ? 0.5 : 1}}>
				<TransformForm transform={transform} onChangeTransform={onChangeTransform} index={index} />
				<div className="minus-button-container pull-right">
					<Button type="minus" handler={this.handleRemove} />
				</div>
			</li>
		))
	}
})

export default DropTarget("TRANSFORM", dropTarget, collectDrop)(DragSource("TRANSFORM", transformSource, collectDrag)(Transform));
