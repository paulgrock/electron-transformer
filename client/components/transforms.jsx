import React from 'react';
import Transform from './transform.jsx';
import dragula from 'react-dragula';

export default React.createClass({
	componentDidMount: function () {
		// FIXME: This whole drag thing isn't working
		// const transformList = this.refs['transform-list'];
    // var dragger = dragula([transformList]);
		//
		// dragger.on('drop', (el, target, source, sibling)=> {
		// 	const previousPosition = el.dataset.position;
		// 	let newPosition = this.props.transforms.length;
		// 	if (sibling && sibling.dataset) {
		// 		newPosition = sibling.dataset.position;
		// 	}
		// 	this.props.onPositionChange(previousPosition, newPosition);
		// });
  },
	handleAddTransform: function(e) {
		e.preventDefault();
		this.props.onAddTransform()
	},
	render() {
		var transformList = this.props.transforms.map((transform, idx)=> {
			return <Transform key={idx} onChangeTransform={this.props.onChangeTransform} onRemoveTransform={this.props.onRemoveTransform} index={idx} transform={transform} />
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
					<button className="btn btn-dark" onClick={this.handleAddTransform}>
						<span className="icon icon-plus"></span>
					</button>
				</div>
			</aside>
		)
	}
})
