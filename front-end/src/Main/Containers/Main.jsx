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
import MyGroups from '../../Scenes/Teachers/GroupsList/Groups';
import RegistrationPage from '../../Scenes/Registration';
import AccessRequestList from '../../Scenes/Admin/AccessRequestList';

import GeneralMenu from '../../Components/GeneralMenu';
import PageAssignedTasks from '../../Scenes/Users/Tasks/AssignedTasks';
import PageAssignTest from '../../Scenes/Teachers/Tests/AssignTest';
import CreateGroupPage from '../../Scenes/Teachers/GroupsList/GroupCreation';
import PageListCheckTests from '../../Scenes/Teachers/Tests/ListCheckTests';
import PageCheckTest from '../../Scenes/Teachers/Tests/CheckTest';
import AddQuestion from '../../Scenes/Teachers/Tests/AddQuestion';
import AddTaskPage from '../../Scenes/Teachers/Tasks/AddTask';
import Loading from '../../Components/Loading';
// import PageAssignTask from '../../Scenes/Teachers/Tasks/AssignTask/Containers/PageAssignTask';
import TrainingTestPage from '../../Scenes/Users/TestList/TrainingTest/Containers/TrainingTestPage';
import AllGroups from '../../Scenes/Teachers/GroupsList/AllGroups/Containers/AllGroups';
import TaskProperties from '../../Scenes/Teachers/Tasks/AssignTask/Components/TaskProperties';
import ViewTaskPage from '../../Scenes/Teachers/Tasks/ViewTask/Containers/ViewTaskPage';
import AllQuestionsPage from '../../Scenes/Teachers/Questions/AllQuestions/Containers/AllQuestionsPage';
import Profile from '../../Scenes/Users/Profile';
import ActivityPage from '../../Scenes/Admin/Activity/Containers/ActivityPage';
// import PageNotFound from '../../Components/PageNotFound';
import TasksAndTestsUser from '../../Scenes/Teachers/GroupsList/GroupStudentsList/Components/TasksAndTestsUser';
import Materials from '../../Scenes/Users/Materials';


class Main extends React.Component {
  static propTypes = {
    userType: PropTypes.shape().isRequired,
    user: PropTypes.objectOf(PropTypes.any).isRequired,
    email: PropTypes.string,
    check: PropTypes.number.isRequired,
  };

  renderCommonRoutes() {
    return [
      {
        key: 'groupstudentslist',
        url: '/groupstudentslist',
        component: PageGroupStudentsList,
      },
      {
        key: 'mygroups',
        url: '/mygroups',
        component: MyGroups,
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
        key: 'checktest',
        url: '/checktest',
        component: PageCheckTest,
      },
      // {
      //   key: 'assigntask',
      //   url: '/assigntask',
      //   component: PageAssignTask,
      // },
      {
        key: 'creategroup',
        url: '/creategroup',
        component: CreateGroupPage,
      },
      // {
      //   key: 'assigntests',
      //   url: '/assigntests',
      //   component: PageAssignTest,
      // },
      {

        key: '/assigntest/:groupName',
        url: '/assigntest/:groupName',
        component: PageAssignTest,
      },
      {
        key: '/assigntask/:groupName',
        url: '/assigntask/:groupName',
        component: TaskProperties,
      },
      {
        key: '/viewtask/:taskId',
        url: '/viewtask/:taskId',
        component: ViewTaskPage,
      },
      {
        key: '/questions',
        url: '/questions',
        component: AllQuestionsPage,
      },
      {
        key: '/checktests',
        url: '/checktests',
        component: PageListCheckTests,
      },
    ];
  }

  renderSwitch() {
    const { userType: { logInInformation: { user: { role } } } } = this.props;
    const { email, check } = this.props;
    switch (role) {
      case 'STUDENT':
        return (
          <div className="main-body-container">
            <div className="general-menu">
              <GeneralMenu
                userType={role}
                email={email}
                check={check}
              />
            </div>
            <div className="switch-div">
              <Switch>
                <Route exact path="/assignedtasks" component={PageAssignedTasks}/>
                <Route exact path="/assignedtests/:userId" component={PageAssignedTestList}/>
                <Route exact path="/passedtestlist" component={PagePassedTestList}/>
                <Route exact path="/passedtasks" component={PagePassedTasks}/>
                <Route exact path="/test/:id" component={Test}/>
                <Route exact path="/task" component={UserTaskPage}/>
                <Route exact path="/task/:id" component={UserTaskPage}/>
                <Route exact path="/usersmaterials" component={Materials}/>
                <Route exact path="/trainingtest" component={TrainingTestPage}/>
                <Route exact path="/assignedtests" component={PageAssignedTestList}/>
                <Route exact path="/assignedtasks/:taskId" component={UserTaskPage}/>
                <Route exact path="/profile/:email" component={Profile}/>
                <Route exact path="/materials" component={Materials}/>
                <Redirect to="/assignedtasks"/>
              </Switch>
            </div>
          </div>
        );
      case 'TEACHER_UNCONFIRMED':
        return (
          <div className="main-body-container">
            <div className="general-menu">
              <GeneralMenu
                userType={role}
                email={email}
                check={check}
              />
            </div>
            <div className="switch-div">
              <Switch>
                <Route exact path="/assignedtasks" component={PageAssignedTasks}/>
                <Route exact path="/assignedtests/:userId" component={PageAssignedTestList}/>
                <Route exact path="/passedtestlist" component={PagePassedTestList}/>
                <Route exact path="/passedtasks" component={PagePassedTasks}/>
                <Route exact path="/test/:id" component={Test}/>
                <Route exact path="/task" component={UserTaskPage}/>
                <Route exact path="/task/:id" component={UserTaskPage}/>
                <Route exact path="/usersmaterials" component={Materials}/>
                <Route exact path="/trainingtest" component={TrainingTestPage}/>
                <Route exact path="/assignedtests" component={PageAssignedTestList}/>
                <Route exact path="/assignedtasks/:taskId" component={UserTaskPage}/>
                <Route exact path="/profile/:email" component={Profile}/>
                <Route exact path="/materials" component={Materials}/>
                <Redirect to="/"/>
                <Redirect to="/assignedtasks"/>
              </Switch>
            </div>
          </div>
        );
      case 'TEACHER':
        return (
          <div className="main-body-container">
            <div className="general-menu">
              <GeneralMenu userType={role} email={email} check={check}/>
            </div>
            <div className="switch-div">
              <Switch>
                <Route exact path="/creategroup" component={CreateGroupPage}/>
                <Route exact path="/studentinformation/:student/:lastname/:firstname" component={TasksAndTestsUser}/>
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
                <Redirect to="/mygroups"/>
              </Switch>
            </div>
          </div>
        );
      case 'ADMIN':
        return (
          <div className="main-body-container">
            <div className="general-menu">
              <GeneralMenu userType={role} email={email} check={check}/>
            </div>
            <div className="switch-div">
              <Switch>
                <Route exact path="/groups/:groupName" component={PageGroupStudentsList}/>
                <Route exact path="/studentinformation/:student/:lastname/:firstname" component={TasksAndTestsUser}/>
                <Route exact path="/accessrequestlist" component={AccessRequestList}/>
                <Route exact path="/addquestion" component={AddQuestion}/>
                <Route exact path="/allgroups" component={AllGroups}/>
                <Route exact path="/activity" component={ActivityPage}/>
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
        return (
          <div className="main-body-container-unlogged">
            <Switch>
              <Route exact path="/" component={LogIn}/>
              <Route exact path="/registration" component={RegistrationPage}/>
              <Redirect to="/"/>
            </Switch>
          </div>
        );
    }
  }

  render() {
    const { userType: { logInInformation: { user: { role } } }, user } = this.props;
    return (
      <div className="main-content">
        <PageHeader userType={role} user={user} history=""/>
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
    user: state.logInInformation.user,
    email: state.logInInformation.user.email,
    check: state.checkQuestions.questionList,
  };
}

Main.defaultProps = {
  email: '',
};

export default withRouter(connect(mapStateToProps)(Main));
