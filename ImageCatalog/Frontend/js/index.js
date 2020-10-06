import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { store } from './store/configureStore';
import { App } from './App';

import { BrowserRouter as Router } from 'react-router-dom';

const history = createBrowserHistory({ basename: '/' });

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    rootElement);
