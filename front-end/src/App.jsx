import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import { history, store } from './Services/ConfigureStore';
import Main from './Main/Containers/Main';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Main/>
        </Router>
      </Provider>
    );
  }
}

export default App;
