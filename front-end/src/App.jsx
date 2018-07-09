import React, { Component } from 'react';
import './App.css';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import Main from './Main/Containers/Main';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }
}

export default App;
