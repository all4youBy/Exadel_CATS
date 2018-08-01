import React from 'react';
import './PageAssignedTestList.scss';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import TableAssignedTests from '../Components/TableAssignedTests';
import {
  addStudent,
  deleteStudent,
  fetchUserAssignedTests,
} from '../Services/Actions/actions';


class PageAssignedTestList extends React.PureComponent {
  static propTypes = {
    getAssignedTests: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
    students: PropTypes.objectOf.isRequired,
    handleStudentAdd: PropTypes.func.isRequired,
    handleStudentDelete: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  };

  render() {
    const {
      groupName,
      students,
      handleStudentAdd,
      handleStudentDelete,
      getAssignedTests,
      error,
    } = this.props;
    return (
      <TableAssignedTests
        groupName={groupName}
        students={students}
        handleStudentAdd={handleStudentAdd}
        handleStudentDelete={handleStudentDelete}
        getAssignedTests={getAssignedTests}
        error={error}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(ownProps.match, 35343);
  return {
    students: state.groupStudentsList.group,
    groupName: ownProps.match.params.groupName,
  };
}


const mapDispatchToProps = dispatch => ({
  handleStudentAdd: (student) => {
    dispatch(addStudent(student));
  },
  handleStudentDelete: (key) => {
    dispatch(deleteStudent(key));
  },
  getAssignedTests: (groupName) => {
    dispatch(fetchUserAssignedTests(groupName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageAssignedTestList);
