import React from 'react';
import Transform from './transform.jsx';
import dragula from 'react-dragula';

export default React.createClass({
	componentDidMount: function () {
		const transformList = this.refs['transform-list'];
    var dragger = dragula([transformList]);

		dragger.on('drop', (el, target, source, sibling)=> {
			const previousPosition = el.dataset.position;
			let newPosition = this.props.transforms.length;
			if (sibling && sibling.dataset) {
				newPosition = sibling.dataset.position;
			}
			this.props.onPositionChange(previousPosition, newPosition);
		});
  },
	handleAddTransform: function(e) {
		e.preventDefault();
		this.props.onAddTransform()
	},
	render() {
		console.log(this.props.transforms);
		var transformList = this.props.transforms.map((transform, idx)=> <Transform key={idx} onChangeTransform={this.props.onChangeTransform} onRemoveTransform={this.props.onRemoveTransform} index={idx} transform={transform} /> )
		return (
			<aside className="pane-sm sidebar">
				<h3 className="padded-more">Transforms</h3>
				<ul className="list-group" ref="transform-list">
					{transformList}
				</ul>
				<div className="padded-more">
					<button onClick={this.handleAddTransform}>+</button>
				</div>
			</aside>
		)
	}
})
