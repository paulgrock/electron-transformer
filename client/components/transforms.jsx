import React from 'react';
import Transform from './transform.jsx';

export default React.createClass({
	handleAddTransform: function(e) {
		e.preventDefault();
		this.props.onAddTransform()
	},
	render() {
		var transformList = this.props.transforms.map((transform, idx)=> <Transform key={idx} onChangeTransform={this.props.onChangeTransform} onRemoveTransform={this.props.onRemoveTransform} index={idx} transform={transform} /> )
		return (
			<aside className="pane-sm sidebar">
				<h3 className="padded-more">Transforms</h3>
				<ul className="list-group">
					{transformList}
				</ul>
				<div className="padded-more">
					<button onClick={this.handleAddTransform}>+</button>
				</div>
			</aside>
		)
	}
})
