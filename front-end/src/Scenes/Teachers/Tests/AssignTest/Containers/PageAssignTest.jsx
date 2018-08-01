import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TestProperties from '../Components/TestProperties';
import {
  addStudentToList,
  addTestTag,
  createTest,
  deleteStudentFromList,
  deleteTestTag,
  fetchGroupsListForTest,
  fetchStudentListForTest,
  fetchUsersFromGroup,
  fetchTopics,
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
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.bool.isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    getGroupsData: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
    getUsersFromGroup: PropTypes.func.isRequired,
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.string.isRequired,
  };

  render() {
    const {
      handleAddTestTag, handleDeleteTestTag, tags, handleCreateTest, data,
      addStudent, delStudent, getStudentsData, students, error, groups,
      getGroupsData, getUsersFromGroup, groupName, getTopics, topics,
    } = this.props;
    return (
      <div>
        <TestProperties
          handleAddTestTag={handleAddTestTag}
          handleDeleteTestTag={handleDeleteTestTag}
          tags={tags}
          handleCreateTest={handleCreateTest}
          data={data}
          addStudent={addStudent}
          delStudent={delStudent}
          getStudentsData={getStudentsData}
          students={students}
          error={error}
          groups={groups}
          getGroupsData={getGroupsData}
          getUsersFromGroup={getUsersFromGroup}
          groupName={groupName}
          getTopics={getTopics}
          topics={topics}
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
    groups: state.testInformation.groups,
    groupName: ownProps.match.params.groupName,
    users: state.testInformation.users,
    topics: state.testInformation.topics,
  };
}

const mapDispatchToProps = dispatch => ({
  handleCreateTest: (test) => {
    dispatch(createTest(test));
  },
  handleAddTestTag: (tag) => {
    dispatch(addTestTag(tag));
  },
  handleDeleteTestTag: (tag) => {
    dispatch(deleteTestTag(tag));
  },
  addStudent: (student) => {
    dispatch(addStudentToList(student));
  },
  delStudent: (student) => {
    dispatch(deleteStudentFromList(student));
  },
  getStudentsData: () => {
    dispatch(fetchStudentListForTest());
  },
  getGroupsData: () => {
    dispatch(fetchGroupsListForTest());
  },
  getUsersFromGroup: () => {
    dispatch(fetchUsersFromGroup());
  },
  getTopics: () => {
    dispatch(fetchTopics());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageAssignTest);
