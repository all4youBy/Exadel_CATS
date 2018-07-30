import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import './CreategroupPage.scss';
import SectionTree from '../../../../../Components/SectionTree';
import { addTaskTag, deleteTaskTag } from '../../../Tasks/AddTask/Services/Actions/actions';
import EditableTagGroup from '../../../../../Components/AddTaskTags';
import { addStudentToGroup, deleteStudentFromGroup, fetchStudentList } from '../Services/Actions/actions';
import API from '../../../../../Services/API';
import StudentsList from '../../../../../Components/StudentsList';
import CurrentGroupList from '../../../../../Components/CurrentGroupList';

const { Search } = Input;

class CreateGroupPage extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    deleteTag: PropTypes.func.isRequired,
    addTag: PropTypes.func.isRequired,
    addStudent: PropTypes.func.isRequired,
    delStudent: PropTypes.func.isRequired,
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    getStudentData: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.bool.isRequired,
  };

  render() {
    const { addTag, deleteTag, tags, addStudent, delStudent, students,
      getStudentData, data, error } = this.props;
    return (
      <div className="create-group-container">
        <Input className="group-name-input" placeholder="Название группы"/>
        <div className="tags-container">
          <SectionTree addTag={addTag}/>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            enterButton
          />
        </div>
        <EditableTagGroup tags={tags} deleteTag={deleteTag} addTag={addTag}/>
        <div className="student-list-container ">
          <StudentsList data={data} addStudent={addStudent} getData={getStudentData} error={error}/>
          <CurrentGroupList students={students} delStudent={delStudent}/>
        </div>
        <Button type="primary" className="create-group-button" onClick={API.post()}>Создать группу</Button>
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
  };
}

const mapDispatchToProps = dispatch => ({
  addTag: (tag) => {
    dispatch(addTaskTag(tag));
  },
  deleteTag: (tag) => {
    dispatch(deleteTaskTag(tag));
  },
  addStudent: (student) => {
    dispatch(addStudentToGroup(student));
  },
  delStudent: (student) => {
    dispatch(deleteStudentFromGroup(student));
  },
  getStudentData: () => {
    dispatch(fetchStudentList());
  },
  /* sendGroup: () */
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupPage);
