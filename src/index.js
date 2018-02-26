import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import App from "./App";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import search from './redux/reducers';

let store = createStore(search);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App/>
    </MuiThemeProvider>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
