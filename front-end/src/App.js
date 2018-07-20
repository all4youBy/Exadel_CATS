import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import configureStore from './Services/ConfigureStore';
import Main from './Main/Containers/Main';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
