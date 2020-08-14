import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  useTheme,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";


const theme = createMuiTheme({
  typography: {
    fontFamily: 'KyoboHand',
    fontSize : 14,

  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
