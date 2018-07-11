import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '../../Scenes/LogIn';
import Home from '../../Scenes/Home';

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={LogIn}/>
        <Redirect to="/"/>
      </Switch>
    );
  }
}
export default connect()(Main);
