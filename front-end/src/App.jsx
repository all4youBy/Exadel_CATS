import React, { Component } from 'react';
import './App.css';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import Home from './Home/Home';
import Main from './Main/Containers/Main';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Home/>
          <Main/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
