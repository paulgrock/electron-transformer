import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/app.jsx';
import { default as reducer, reducers } from './reducers';

// TODO: combinedStore is a mess. Should be more like remove-transform
let combinedStore = applyMiddleware(thunk)(createStore)(reducers)

const store = applyMiddleware(thunk)(createStore)(reducer);

document.addEventListener('dragover', (event) => event.preventDefault());

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("main-window")
);
