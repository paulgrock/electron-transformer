var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/app.jsx');
document.addEventListener('dragover', (event) => event.preventDefault());

ReactDOM.render(
	<App />,
	document.querySelector("main")
);
