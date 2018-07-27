import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import './CreategroupPage.scss';
// import StudentList from '../Components/StudentList';
import SectionTree from '../../../../../Components/SectionTree';
import { addTaskTag, deleteTaskTag } from '../../../Tasks/AddTask/Services/Actions/actions';
import EditableTagGroup from '../../../../../Components/AddTaskTags';
import { addStudentToGroup, deleteStudentFromGroup } from '../Services/Actions/actions';
import CurrentGroupList from '../Components/CurrentGroupList';
import API from '../../../../../Services/API';
import StudentsList from '../Components/StudentsList';

const { Search } = Input;

class CreateGroupPage extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    deleteTag: PropTypes.func.isRequired,
    addTag: PropTypes.func.isRequired,
    addStudent: PropTypes.func.isRequired,
    delStudent: PropTypes.func.isRequired,
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    getData: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const { addTag, deleteTag, tags, addStudent, delStudent, students, getData, data } = this.props;
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
          <StudentsList data={data} addStudent={addStudent} getData={getData}/>
          <CurrentGroupList students={students} delStudent={delStudent}/>
        </div>
        <Button onClick={API.post()}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tags: state.addTask.tags,
    students: state.createGroup.students,
    data: state.createGroup.data,
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
  getData: (url) => {
    dispatch(API.get(url, 'studentList'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupPage);
