import React from 'react';
import Transform from './transform.jsx';
import Button from './button.jsx';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const TransformList =  React.createClass({
	handleAddTransform: function(e) {
		e.preventDefault();
		this.props.onAddTransform()
	},
	render() {
		var transformList = this.props.transforms.map((transform, idx)=> {
			return <Transform key={idx} {...this.props} index={idx} transform={transform} />
		})
		return (
			<aside className="pane-sm sidebar">
				<ul className="list-group" ref="transform-list">
					<li className="list-group-header">
						<h3>Transforms</h3>
					</li>
					{transformList}
				</ul>
				<div className="padded-more">
					<Button type="plus" handler={this.handleAddTransform} />
				</div>
			</aside>
		)
	}
});

export default DragDropContext(HTML5Backend)(TransformList);
