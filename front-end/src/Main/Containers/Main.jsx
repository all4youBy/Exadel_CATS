import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Main.scss';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LogIn from '../../Scenes/LogIn/Containers/LogIn';
import PageAssignedTestList from '../../Scenes/Users/TestList/AssignedTestList';
import PagePassedTestList from '../../Scenes/Users/TestList/PassedTestList';
import PageGroupStudentsList from '../../Scenes/Teachers/GroupsList/GroupStudentsList';
import Test from '../../Scenes/Users/Tests/Containers/Test';
import UserTaskPage from '../../Scenes/Users/Task/Containers/UserTaskPage';
import UserGeneralMenu from '../../Components/UserGeneralMenu';
import PageHeader from '../../Components/GlobalHeader';
import PageFooter from '../../Components/GlobalFooter';
import AllTask from '../../Scenes/Teachers/Tasks/AllTask';
import PagePassedTasks from '../../Scenes/Users/Tasks/PassedTasks';
import AllGroups from '../../Scenes/Teachers/GroupsList/Groups/index';
import Materials from '../../Scenes/Teachers/Materials/Containers/Materials';

class Main extends React.Component {
  render() {
    return (
      <div className="main-content">
        <PageHeader/>
        <div className="main-body-container">
          <div className="general-menu">
            <UserGeneralMenu/>
          </div>
          <div className="switch-div">
            <Switch>
              <Route exact path="/" component={LogIn}/>
              <Route exact path="/assignedtestlist" component={PageAssignedTestList}/>
              <Route exact path="/passedtestlist" component={PagePassedTestList}/>
              <Route exact path="/groupstudentslist" component={PageGroupStudentsList}/>
              <Route exact path="/passedtasks" component={PagePassedTasks}/>
              <Route exact path="/personalgroupslist" component={AllGroups}/>
              <Route exact path="/alltasks" component={AllTask}/>
              <Route exact path="/Test" component={Test}/>
              <Route exact path="/Task" component={UserTaskPage}/>
              <Route exact path="/materials" component={Materials}/>
              <Redirect to="/"/>
            </Switch>
          </div>
        </div>
        <PageFooter/>
      </div>
    );
  }
}

export default withRouter(connect()(Main));
