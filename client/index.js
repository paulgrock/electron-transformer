import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/app.jsx';
import tranformerApp from './reducers';

const store = applyMiddleware(thunk)(createStore)(tranformerApp);

document.addEventListener('dragover', (event) => event.preventDefault());

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("main")
);
