import React from 'react';
import { connect } from 'react-redux';
import './Main.scss';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LogIn from '../../Scenes/LogIn/Containers/LogIn';
import PageAssignedTestList from '../../Scenes/Users/TestList/AssignedTestList';
import PagePassedTestList from '../../Scenes/Users/TestList/PassedTestList';
import PageGroupStudentsList from '../../Scenes/Teachers/GroupsList/GroupStudentsList';
import Test from '../../Scenes/Users/Tests';
import UserTaskPage from '../../Scenes/Users/Task/Containers/UserTaskPage';
import PageHeader from '../../Components/GlobalHeader';
import PageFooter from '../../Components/GlobalFooter';
import AllTask from '../../Scenes/Teachers/Tasks/AllTask';
import PagePassedTasks from '../../Scenes/Users/Tasks/PassedTasks';
import AllGroups from '../../Scenes/Teachers/GroupsList/Groups';
import Materials from '../../Scenes/Teachers/Materials';
import RegistrationPage from '../../Scenes/Registration';
import GeneralMenu from '../../Components/GeneralMenu';
import PageAssignedTasks from '../../Scenes/Users/Tasks/AssignedTasks';
import AllTests from '../../Scenes/Teachers/Tests/AllTests/Containers/AllTests';

class Main extends React.Component {
  render() {
    return (
      <div className="main-content">
        <PageHeader/>
        <div className="main-body-container">
          <div className="general-menu">
            <GeneralMenu/>
          </div>
          <div className="switch-div">
            <Switch>
              <Route exact path="/" component={LogIn}/>
              <Route exact path="/assignedtestlist" component={PageAssignedTestList}/>
              <Route exact path="/passedtestlist" component={PagePassedTestList}/>
              <Route exact path="/groupstudentslist" component={PageGroupStudentsList}/>
              <Route exact path="/passedtasks" component={PagePassedTasks}/>
              <Route exact path="/allgroups" component={AllGroups}/>
              <Route exact path="/alltasks" component={AllTask}/>
              <Route exact path="/test" component={Test}/>
              <Route exact path="/task" component={UserTaskPage}/>
              <Route exact path="/registration" component={RegistrationPage}/>
              <Route exact path="/teachersmaterials" component={Materials}/>
              <Route exact path="/usersmaterials" component={Materials}/>
              <Route exact path="/materials" component={Materials}/>
              <Route exact path="/assignedtasks" component={PageAssignedTasks}/>
              <Route exact path="/alltests" component={AllTests}/>
              <Route exact path="/" component={PageAssignedTasks}/>
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
