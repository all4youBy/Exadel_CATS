import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableGroupStudents from '../Components/TableGroupStudents';
import './PageGroupStudentsList.scss';
import { addStudent, deleteStudent, fetchStudentsGroup } from '../Services/Actions/actions';
import { receiveTest } from '../../../Tests/AssignTest/Services/Actions/actions';

class PageGroupStudentsList extends React.PureComponent {
  static propTypes = {
    getGroup: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
    students: PropTypes.objectOf(PropTypes.any).isRequired,
    handleStudentAdd: PropTypes.func.isRequired,
    handleStudentDelete: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    addStudentTest: PropTypes.func.isRequired,
  };

  render() {
    const {
      groupName,
      students,
      handleStudentAdd,
      handleStudentDelete,
      getGroup,
      error, addStudentTest,
    } = this.props;
    return (
      <TableGroupStudents
        groupName={groupName}
        students={students}
        handleStudentAdd={handleStudentAdd}
        handleStudentDelete={handleStudentDelete}
        getGroup={getGroup}
        error={error}
        addStudentTest={addStudentTest}
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
  getGroup: (groupName) => {
    dispatch(fetchStudentsGroup(groupName));
  },
  addStudentTest: (student) => {
    dispatch(receiveTest(student, 'STUDENT'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageGroupStudentsList);
