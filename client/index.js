import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import { createStore } from 'redux';
import tranformerApp from './reducers';
import { Provider } from 'react-redux';

let store = createStore(tranformerApp);

store.subscribe(() =>
  console.log(store.getState())
);

document.addEventListener('dragover', (event) => event.preventDefault());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("main")
);
