import React from 'react';

export default ({type, color = 'dark', handler}) => (
	<button onClick={handler} className={`btn btn-${color}`}>
		<span className={`icon icon-${type}`}></span>
	</button>
);
