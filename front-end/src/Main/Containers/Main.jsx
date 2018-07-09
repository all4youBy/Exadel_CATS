import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '../../Scenes/LogIn/LogIn';


class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LogIn}/>
        <Redirect to="/"/>
      </Switch>
    );
  }
}

export default Main;
