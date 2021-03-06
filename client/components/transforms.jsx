import React from 'react';
import Transform from './transform.jsx';
import Button from './button.jsx';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-mixed-backend';

const TransformList = React.createClass({
	handleAddTransform(e) {
		e.preventDefault();
		this.props.onAddTransform();
	},
	render() {
		const transformList = this.props.transforms.map((transform, idx) => {
			return <Transform key={idx} {...this.props} index={idx} transform={transform} />;
		});
		return (
			<aside className="pane-sm sidebar">
				<ul className="list-group" ref="transform-list">
					<li className="list-group-header">
						<h4>Transforms</h4>
						<Button type="plus" handler={this.handleAddTransform} />
					</li>
					{transformList}
				</ul>
			</aside>
		);
	}
});

export default DragDropContext(HTML5Backend)(TransformList);
