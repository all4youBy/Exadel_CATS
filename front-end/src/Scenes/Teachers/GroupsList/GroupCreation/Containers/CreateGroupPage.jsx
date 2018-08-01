/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-cycle */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Button, message } from 'antd';
import './CreategroupPage.scss';
import {
  addStudentToGroup,
  deleteStudentFromGroup,
  fetchStudentList,
  fetchGroupsList,
  postGroup,
} from '../Services/Actions/actions';
import CurrentGroupList from '../../../../../Components/CurrentGroupList';
import StudentsList from '../../../../../Components/StudentsList';

const { TextArea } = Input;


class CreateGroupPage extends React.PureComponent {
  static propTypes = {
    addStudent: PropTypes.func.isRequired,
    delStudent: PropTypes.func.isRequired,
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    getStudentsData: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string.isRequired,
    successMessage: PropTypes.string.isRequired,
    sendGroupInfo: PropTypes.func.isRequired,
    getGroupsData: PropTypes.func.isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    group: '',
  };

  getGroupData = () => {
    const { students } = this.props;
    const { group } = this.state;
    return {
      emails: students.addedStudents.map(item => item.email),
      group,
    };
  };

  render() {
    const {
      addStudent, delStudent, students,
      getStudentsData, data, error, sendGroupInfo, successMessage,
      getGroupsData, groups,
    } = this.props;
    console.log(addStudent, data, error);
    if (successMessage) {
      message.success('Группа успешно создана');
      location.reload();
    }

    return (
      <div className="create-group-container">
        <TextArea
          className="group-name-input"
          placeholder="Название группы"
          autosize
          onBlur={(value) => {
            this.setState({ group: value.target.value });
          }}
        />
        <div className="student-list-container ">
          <StudentsList
            students={data}
            addStudent={addStudent}
            getStudentsData={getStudentsData}
            getGroupsData={getGroupsData}
            error={error}
            groups={groups}
          />
          <CurrentGroupList className="current-group-list" students={students} delStudent={delStudent}/>
        </div>
        <Button
          onClick={() => {
            sendGroupInfo(this.getGroupData());
          }}
          size="small"
          className="create-group-button"
        >Создать группу
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tags: state.addTask.tags,
    students: state.createGroup.students,
    data: state.createGroup.data,
    error: state.createGroup.error,
    successMessage: state.createGroup.successMessage,
    groups: state.createGroup.groups,
    topics: state.createGroup.topics,
    errorTopics: state.createGroup.errorTopics,
  };
}

const mapDispatchToProps = dispatch => ({
  addStudent: (student) => {
    dispatch(addStudentToGroup(student));
  },
  delStudent: (student) => {
    dispatch(deleteStudentFromGroup(student));
  },
  getStudentsData: () => {
    dispatch(fetchStudentList());
  },
  sendGroupInfo: (data) => {
    dispatch(postGroup(data));
  },
  getGroupsData: () => {
    dispatch(fetchGroupsList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupPage);
