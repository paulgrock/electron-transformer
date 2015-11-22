import React from 'react';
import Transform from './transform.jsx';

export default React.createClass({
	handleAddTransform: function(e) {
		e.preventDefault();
		this.props.onAddTransform()
	},
	render() {
		var transformList = this.props.transforms.map((transform, idx)=> <Transform key={idx} onChangeTransform={this.props.onChangeTransform} onRemoveTransform={this.props.onRemoveTransform} index={idx} /> )
		return (
			<aside className="fileTransforms">
				<h3>Transformers</h3>
				<ul>
					{transformList}
				</ul>
				<button onClick={this.handleAddTransform}>+</button>
			</aside>
		)
	}
})
