/* eslint-disable no-unused-vars,no-plusplus,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableGroupStudents from '../Components/TableGroupStudents';
import './PageGroupStudentsList.scss';
import { addStudent, deleteStudent, fetchStudentsGroup, getUser } from '../Services/Actions/actions';
import { receiveTest } from '../../../Tests/AssignTest/Services/Actions/actions';
// import { fetchAssignedTasks } fr
// om '../../../../Users/Tasks/AssignedTasks/Services/Actions/actions';
import { receiveTask } from '../../../Tasks/AssignTask/Services/Actions/actions';
import fetchPassedTasks from '../../../../Users/Tasks/PassedTasks/Services/Actions/actions';

class PageGroupStudentsList extends React.PureComponent {
  static propTypes = {
    getGroup: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
    students: PropTypes.arrayOf(PropTypes.string).isRequired,
    assignedTasks: PropTypes.objectOf(PropTypes.any).isRequired,
    handleStudentAdd: PropTypes.func.isRequired,
    handleStudentDelete: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    addStudentTask: PropTypes.func.isRequired,
    getUserInformation: PropTypes.func.isRequired,
  };

  render() {
    const {
      groupName,
      students,
      handleStudentAdd,
      handleStudentDelete,
      getGroup,
      error, addStudentTask, assignedTasks, getUserInformation,
    } = this.props;
    return (
      <TableGroupStudents
        getUserInformation={getUserInformation}
        groupName={groupName}
        students={students}
        handleStudentAdd={handleStudentAdd}
        handleStudentDelete={handleStudentDelete}
        getGroup={getGroup}
        error={error}
        addStudentTask={addStudentTask}
        assignedTasks={assignedTasks}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    students: state.groupStudentsList.group,
    groupName: ownProps.match.params.groupName,
    assignedTasks: state.groupStudentsList.assignedTasks,
  };
}


const mapDispatchToProps = dispatch => ({
  handleStudentAdd: (student) => {
    dispatch(addStudent(student));
  },
  handleStudentDelete: (key) => {
    dispatch(deleteStudent(key));
  },
  getGroup: (groupName) => {
    dispatch(fetchStudentsGroup(groupName));
  },
  addStudentTest: (student) => {
    dispatch(receiveTest(student, 'STUDENT'));
  },
  addStudentTask: (group) => {
    dispatch(receiveTask(group, 'STUDENT'));
  },
  getUserInformation: (userId) => {
    dispatch(getUser(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageGroupStudentsList);
