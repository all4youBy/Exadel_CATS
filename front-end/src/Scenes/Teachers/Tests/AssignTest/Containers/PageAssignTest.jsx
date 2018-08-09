import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TestProperties from '../Components/TestProperties';
import {
  receiveTest,
  addTestTag,
  createTest,
  deleteStudentFromList,
  deleteTestTag,
  fetchStudentListForTest,
  fetchUsersFromGroup,
  fetchTopics,
  groupsListForTest,
  clearStateTest,
} from '../Services/Actions/actions';


class PageAssignTest extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleDeleteTestTag: PropTypes.func.isRequired,
    handleAddTestTag: PropTypes.func.isRequired,
    handleCreateTest: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    addStudent: PropTypes.func.isRequired,
    delStudent: PropTypes.func.isRequired,
    getStudentsData: PropTypes.func.isRequired,
    students: PropTypes.objectOf(PropTypes.array).isRequired,
    error: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
    getUsersFromGroup: PropTypes.func.isRequired,
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf(PropTypes.any).isRequired,
    teacher: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    receiver: PropTypes.string.isRequired,
    clearState: PropTypes.func.isRequired,
  };

  render() {
    const {
      handleAddTestTag, handleDeleteTestTag, handleCreateTest, data,
      addStudent, delStudent, getStudentsData, students, error, receiver,
      getUsersFromGroup, groupName, getTopics, topics, teacher, type, tags,
      clearState,
    } = this.props;
    return (
      <div>
        <TestProperties
          handleAddTestTag={handleAddTestTag}
          handleDeleteTestTag={handleDeleteTestTag}
          receiver={receiver}
          handleCreateTest={handleCreateTest}
          data={data}
          addStudent={addStudent}
          delStudent={delStudent}
          getStudentsData={getStudentsData}
          students={students}
          error={error}
          getUsersFromGroup={getUsersFromGroup}
          groupName={groupName}
          getTopics={getTopics}
          topics={topics}
          teacher={teacher}
          type={type}
          tags={tags}
          clearState={clearState}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tags: state.testInformation.tags,
    test: state,
    students: state.testInformation.students,
    data: state.testInformation.data,
    error: state.testInformation.error,
    groups: state.allGroups.groups,
    groupName: ownProps.match.params.groupName,
    receiver: state.testInformation.receiver,
    topics: state.testInformation.topics,
    teacher: state.logInInformation.user.email,
    type: state.testInformation.type,
  };
}

const mapDispatchToProps = dispatch => ({
  handleCreateTest: (test, url) => {
    dispatch(createTest(test, url));
  },
  handleAddTestTag: (tag) => {
    dispatch(addTestTag(tag));
  },
  handleDeleteTestTag: (tag) => {
    dispatch(deleteTestTag(tag));
  },
  addStudent: (student, type) => {
    dispatch(receiveTest(student, type));
  },
  delStudent: (student) => {
    dispatch(deleteStudentFromList(student));
  },
  getStudentsData: () => {
    dispatch(fetchStudentListForTest());
  },
  getGroups: (userId) => {
    dispatch(groupsListForTest(userId));
  },
  // getGroupsData: () => {
  //   dispatch(fetchGroupsListForTest());
  // },
  getUsersFromGroup: () => {
    dispatch(fetchUsersFromGroup());
  },
  getTopics: () => {
    dispatch(fetchTopics());
  },
  clearState: () => {
    dispatch(clearStateTest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageAssignTest);
