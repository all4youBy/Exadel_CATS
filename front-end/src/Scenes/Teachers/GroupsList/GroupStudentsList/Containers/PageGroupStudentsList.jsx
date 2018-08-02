import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableGroupStudents from '../Components/TableGroupStudents';
import './PageGroupStudentsList.scss';
import { addStudent, deleteStudent, fetchStudentsGroup } from '../Services/Actions/actions';

class PageGroupStudentsList extends React.PureComponent {
  static propTypes = {
    getGroup: PropTypes.func.isRequired,
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
      getGroup,
      error,
    } = this.props;
    return (
      <TableGroupStudents
        groupName={groupName}
        students={students}
        handleStudentAdd={handleStudentAdd}
        handleStudentDelete={handleStudentDelete}
        getGroup={getGroup}
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
  getGroup: (groupName) => {
    dispatch(fetchStudentsGroup(groupName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageGroupStudentsList);
