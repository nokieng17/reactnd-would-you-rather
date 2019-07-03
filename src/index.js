import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import './index.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from './reducers'
import middleware from './middleware'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from './ui/themes/theme'
import { withStyles } from '@material-ui/core';

const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
        // You should target [class*="MuiButton-root"] instead if you nest themes.
        '.MuiCardContent-root:last-child': {
            padding: 0,
        },
        '.MuiCardContent-root': {
            padding: 0
        },
        '.MuiCardHeader-root': {
            padding: 8
        }
    },
})(() => null);

const store = createStore(reducer, middleware)

ReactDOM.render(
    < Provider store={store} >
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <GlobalCss />
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider >
    , document.getElementById('root')
);

