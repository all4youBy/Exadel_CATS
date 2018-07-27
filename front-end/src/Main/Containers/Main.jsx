/* eslint-disable react/destructuring-assignment,no-unused-vars,react/prop-types */
import React from 'react';
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
import RegistrationPage from '../../Scenes/Registration';

import AddTaskPage from '../../Scenes/Teachers/Tasks/AddTask/Containers/AddTaskPage';
import CreateGroupPage from '../../Scenes/Teachers/GroupsList/GroupCreation/Containers/CreateGroupPage';

class Main extends React.Component {
  renderCommonRoutes() {
    return [
      (<Route exact path="/groupstudentslist" component={PageGroupStudentsList}/>),
      (<Route exact path="/allgroups" component={AllGroups}/>),
      (<Route exact path="/alltasks" component={AllTask}/>),
      (<Route exact path="/addtask" component={AddTaskPage}/>),
      (<Route exact path="/teachersmaterials" component={Materials}/>),
      (<Route exact path="/materials" component={Materials}/>),
    ];
  }

  renderSwitch() {
    const { userType: { logInInformation: { user: { role } } } } = this.props;
    switch (role) {
      case 'STUDENT':
        return (
          <div className="main-body-container">
            <div className="general-menu">
              <UserGeneralMenu/>
            </div>
            <div className="switch-div">
              <Switch>
                <Route exact path="/assignedtestlist" component={PageAssignedTestList}/>
                <Route exact path="/passedtestlist" component={PagePassedTestList}/>
                <Route exact path="/passedtasks" component={PagePassedTasks}/>
                <Route exact path="/test" component={Test}/>
                <Route exact path="/task" component={UserTaskPage}/>
                <Route exact path="/usersmaterials" component={Materials}/>
                <Redirect to="/"/>
              </Switch>
            </div>
          </div>
        );
      case 'TEACHER':
        return (
          <div className="main-body-container">
            <div className="general-menu">
              <UserGeneralMenu/>
            </div>
            <div className="switch-div">
              <Switch>
                {this.renderCommonRoutes()}
                <Route exact path="/creategroup" component={CreateGroupPage}/>
                <Redirect to="/"/>
              </Switch>
            </div>
          </div>
        );
      case 'ADMIN':
        return (
          <div className="main-body-container">
            <div className="general-menu">
              <UserGeneralMenu/>
            </div>
            <div className="switch-div">
              <Switch>
                {this.renderCommonRoutes()}
                <Redirect to="/"/>
              </Switch>
            </div>
          </div>
        );
      case 'GUEST':
        return (
          <div className="main-body-container-unlogged">
            <Switch>
              <Route exact path="/" component={LogIn}/>
              <Route exact path="/registration" component={RegistrationPage}/>
              <Redirect to="/"/>
            </Switch>
          </div>
        );
      default:
        return 'foo';
    }
  }

  render() {
    return (
      <div className="main-content">
        <PageHeader/>

        {this.renderSwitch()}
        <PageFooter/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isReady: state.isReady,
    isAuth: state.isAuth,
    userType: state,
  };
}

/* const mapDispatchToProps = dispatch => ({
  handleStudentAdd: () => {
    dispatch(addStudent(book));
  },
  handleStudentDelete: (book) => {
    dispatch(deleteStudent(book));
  },
}); */
export default withRouter(connect(mapStateToProps)(Main));
