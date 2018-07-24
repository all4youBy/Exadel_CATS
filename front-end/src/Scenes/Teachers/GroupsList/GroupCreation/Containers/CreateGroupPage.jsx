import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './CreategroupPage.scss';
import StudentList from '../Components/StudentList';
import SectionTree from '../../../../../Components/SectionTree';
import { addTaskTag, deleteTaskTag } from '../../../Tasks/AddTask/Services/Actions/actions';
import EditableTagGroup from '../../../../../Components/AddTaskTags';
import { addStudentToGroup } from '../Services/Actions/actions';

const { Search } = Input;

class CreateGroupPage extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    deleteTag: PropTypes.func.isRequired,
    addTag: PropTypes.func.isRequired,
    addStudent: PropTypes.func.isRequired,
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const { addTag, deleteTag, tags, addStudent, students } = this.props;
    return (
      <div className="create-group-container">
        <div className="tags-container">
          <SectionTree addTag={addTag}/>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            enterButton
          />
          <EditableTagGroup tags={tags} deleteTag={deleteTag} addTag={addTag}/>
        </div>
        <StudentList addStudent={addStudent} students={students}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tags: state.addTask.tags,
    students: state.createGroup.students,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupPage);
