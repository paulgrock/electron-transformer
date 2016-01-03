import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';

import TransformForm from './transform-form.jsx';
import Button from './button.jsx';

const specDrag = {
	beginDrag(props) {
		return {
			transformId: props.index
		};
	}
};

const collectDrag = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
};

const specDrop = {
	drop(props, monitor) {
		const previousPosition = monitor.getItem().transformId;
		const newPosition = props.index;
		props.onPositionChange(previousPosition, newPosition);
	}
};

const collectDrop = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
};

const Transform = React.createClass({
	handleRemove() {
		this.props.onRemoveTransform(this.props.index);
	},
	render() {
		const {index, transform, onChangeTransform, connectDragSource, isOver, isDragging, connectDropTarget} = this.props;
		const draggingClass = isDragging ? ' is-moving' : '';
		const overClass = isOver ? ' is-over' : '';
		return connectDropTarget(connectDragSource(
			<li className={`list-group-item${draggingClass}${overClass}`}>
				<TransformForm transform={transform} onChangeTransform={onChangeTransform} index={index} />
				<div className="minus-button-container pull-right">
					<Button type="minus" handler={this.handleRemove} />
				</div>
			</li>
		));
	}
});

export default DropTarget('TRANSFORM', specDrop, collectDrop)(DragSource('TRANSFORM', specDrag, collectDrag)(Transform));
