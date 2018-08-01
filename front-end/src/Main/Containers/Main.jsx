/* eslint-disable react/destructuring-assignment,no-unused-vars,react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import './Main.scss';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogIn from '../../Scenes/LogIn';
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
import AccessRequestList from '../../Scenes/Admin/AccessRequestList';

import GeneralMenu from '../../Components/GeneralMenu';
import PageAssignedTasks from '../../Scenes/Users/Tasks/AssignedTasks';
import PageAssignTest from '../../Scenes/Teachers/Tests/AssignTest';
import CreateGroupPage from '../../Scenes/Teachers/GroupsList/GroupCreation';
import PageListCheckTests from '../../Scenes/Teachers/Tests/ListCheckTests';
import PageCheckTest from '../../Scenes/Teachers/Tests/CheckTest/Containers/PageCheckTest';
import AddQuestion from '../../Scenes/Teachers/Tests/AddQuestion/Containers/AddQuestion';
import AddTaskPage from '../../Scenes/Teachers/Tasks/AddTask/Containers/AddTaskPage';
import Loading from '../../Components/Loading';
import PageAssignTask from '../../Scenes/Teachers/Tasks/AssignTask/Containers/PageAssignTask';

class Main extends React.Component {
  static propTypes = {
    userType: PropTypes.shape().isRequired,
  };

  renderCommonRoutes() {
    return [
      {
        key: 'groupstudentslist',
        url: '/groupstudentslist',
        component: PageGroupStudentsList,
      },
      {
        key: 'allgroups',
        url: '/allgroups',
        component: AllGroups,
      },
      {
        key: 'alltasks',
        url: '/alltasks',
        component: AllTask,
      },
      {
        key: 'addtask',
        url: '/addtask',
        component: AddTaskPage,
      },
      {
        key: 'teachersmaterials',
        url: '/teachersmaterials',
        component: Materials,
      },
      {
        key: 'materials',
        url: '/materials',
        component: Materials,
      },
      {
        key: 'checktest',
        url: '/checktest',
        component: PageCheckTest,
      },
      {
        key: 'assigntask',
        url: '/assigntask',
        component: PageAssignTask,
      },
      {
        key: 'creategroup',
        url: '/creategroup',
        component: CreateGroupPage,
      },
    ];
  }

  renderSwitch() {
    const { userType: { logInInformation: { user: { role } } } } = this.props;
    switch (role) {
      case 'STUDENT':
        return (
          <div className="main-body-container">
            <div className="general-menu">
              <GeneralMenu userType={role}/>
            </div>
            <div className="switch-div">
              <Switch>
                <Route exact path="/assignedtasks" component={PageAssignedTasks}/>
                <Route exact path="/assignedtests/:userId" component={PageAssignedTestList}/>
                <Route exact path="/passedtestlist" component={PagePassedTestList}/>
                <Route exact path="/passedtasks" component={PagePassedTasks}/>
                <Route exact path="/test/:id" component={Test}/>
                <Route exact path="/task/:id" component={UserTaskPage}/>
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
              <GeneralMenu userType={role}/>
            </div>
            <div className="switch-div">
              <Switch>
                <Route exact path="/assignedtasks" component={PageAssignedTasks}/>
                <Route exact path="/creategroup" component={CreateGroupPage}/>
                <Route exact path="/assigntest" component={PageAssignTest}/>
                <Route exact path="/assigntest/:groupName" component={PageAssignTest}/>
                <Route exact path="/checktests" component={PageListCheckTests}/>
                <Route exact path="/loading" component={Loading}/>
                <Route exact path="/groups/:groupName" component={PageGroupStudentsList}/>
                <Route exact path="/addquestion" component={AddQuestion}/>
                {this.renderCommonRoutes().map(item => (
                  <Route
                    key={item.key}
                    exact
                    path={item.url}
                    component={item.component}
                  />
                ))}
                <Redirect to="/"/>
              </Switch>
            </div>
          </div>
        );
      case 'ADMIN':
        return (
          <div className="main-body-container">
            <div className="general-menu">
              <GeneralMenu userType={role}/>
            </div>
            <div className="switch-div">
              <Switch>
                <Route exact path="/accessrequestlist" component={AccessRequestList}/>
                <Route exact path="/addquestion" component={AddQuestion}/>
                {this.renderCommonRoutes().map(item => (
                  <Route
                    key={item.key}
                    exact
                    path={item.url}
                    component={item.component}
                  />
                ))}
                <Redirect to="/accessrequestlist"/>
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
    const { userType: { logInInformation: { user: { role } } } } = this.props;
    return (
      <div className="main-content">
        <PageHeader userType={role} history=""/>
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

export default withRouter(connect(mapStateToProps)(Main));
