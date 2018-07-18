import React from 'react';
// import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '../../Scenes/LogIn/Containers/LogIn';
import PageAssignedTestList from '../../Scenes/Users/TestList/AssignedTestList';
import PagePassedTestList from '../../Scenes/Users/TestList/PassedTestList';
import PageGroupStudentsList from '../../Scenes/Teachers/GroupsList/GroupStudentsList';
// import { logIn } from '../../Scenes/LogInIn/Services/Actions/actions';

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LogIn}/>
        <Route exact path="/assignedtestlist" component={PageAssignedTestList}/>
        <Route exact path="/passedtestlist" component={PagePassedTestList}/>
        <Route exact path="/groupstudentslist" component={PageGroupStudentsList}/>
        <Redirect to="/"/>
      </Switch>
    );
  }
}

export default Main;
