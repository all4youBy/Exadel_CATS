/* eslint-disable spaced-comment */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
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
    sendGroupInfo: PropTypes.func.isRequired,
    getGroupsData: PropTypes.func.isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    group: '',
    dataError: false,
  };

  getGroupData = () => {
    const { students } = this.props;
    const { group } = this.state;
    return {
      emails: students.addedStudents.map(item => item.email),
      group,
    };
  };

  validateCreateGroup = (groupData) => {
    if (groupData.group.length === 0 || groupData.emails.length === 0) {
      return false;
    }
    return true;
  };

  handleGroupData = () => {
    const { sendGroupInfo } = this.props;
    const groupInfo = this.getGroupData();
    if (!this.validateCreateGroup(groupInfo)) {
      this.setState(() => ({ dataError: true }));
    } else {
      this.setState(() => ({ dataError: false }));
      sendGroupInfo(groupInfo);
    }
  };

  handleSetName = (event) => {
    if (event.target.value) {
      this.setState({ group: event.target.value });
    }
  };

  render() {
    const {
      addStudent, delStudent, students,
      getStudentsData, data, error,
      getGroupsData, groups,
    } = this.props;
    const { dataError } = this.state;
    const errorInput = dataError ? <div className="error-input">Введите все данные!</div> : <div/>;

    return (
      <div className="create-group-container">
        <div className="header">Создание группы</div>
        <TextArea
          name="nameTest"
          type="text"
          className="input-group-name"
          placeholder="Название группы"
          autosize
          onBlur={this.handleSetName}
        />
        {/*<TextArea*/}
        {/*className="group-name-input"*/}
        {/*placeholder="Название группы"*/}
        {/*autosize*/}
        {/*onBlur={this.handleSetName}*/}
        {/*/>*/}
        <div className="student-list-container ">
          <StudentsList
            className="current-students-list"
            students={data}
            addStudent={addStudent}
            getStudentsData={getStudentsData}
            getGroups={getGroupsData}
            error={error}
            groups={groups}
          />
          <CurrentGroupList className="current-group-list" students={students} delStudent={delStudent}/>
        </div>
        <div className="error-input-parent">{errorInput}</div>
        <div className="button-create-group-parent">
          <Button
            onClick={this.handleGroupData}
            size="small"
            className="create-group-button"
          >Создать группу
          </Button>
        </div>
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
    success: state.createGroup.success,
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
