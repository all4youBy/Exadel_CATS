import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../Home/Home';

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Redirect to="/"/>
      </Switch>
    );
  }
}

export default Main;
