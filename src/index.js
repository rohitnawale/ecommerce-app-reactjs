import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore,  combineReducers, compose} from 'redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import cartReducer from './store/reducers/cart'
import authReducer from './store/reducers/auth'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers())

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app,document.getElementById('root'));
registerServiceWorker();
