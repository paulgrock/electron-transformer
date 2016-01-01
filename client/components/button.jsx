import React from 'react';

const Button = ({type, color="dark", handler}) => (
	<button onClick={handler} className={`btn btn-${color}`}>
		<span className={`icon icon-${type}`}></span>
	</button>
);

export default Button;
