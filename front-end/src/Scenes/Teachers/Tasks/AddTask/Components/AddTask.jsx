import React from 'react';
import 'antd/dist/antd.css';
import './AddTask.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import SectionTree from './SectionTree';
import InputOutputSet from './InputOutputSet';
import { addInOutSet, addTaskTag, deleteTaskTag } from '../Services/Actions/actions';
import EditableTagGroup from './AddTaskTags';


const { TextArea } = Input;

class AddTask extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    deleteTag: PropTypes.func.isRequired,
    addTag: PropTypes.func.isRequired,
    testSet: PropTypes.arrayOf(PropTypes.object).isRequired,
    addElem: PropTypes.func.isRequired,
  };

  render() {
    const { addTag, deleteTag, tags, addElem, testSet } = this.props;
    return (
      <div className="add-task-container">
        <TextArea className="input-task-name" placeholder="Название задачи" autosize />
        <TextArea className="input-task-desc" placeholder="Описание задачи" autosize={{ minRows: 7 }} />
        <div className="tags-container">
          <SectionTree addTag={addTag}/>
          <EditableTagGroup tags={tags} deleteTag={deleteTag} addTag={addTag}/>
        </div>
        <InputOutputSet addElem={addElem} testSet={testSet}/>
        <Button type="primary" className="task-upload-button">Отправить</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tags: state.addTask.tags,
    testSet: state.addTask.testSet,
  };
}

const mapDispatchToProps = dispatch => ({
  addTag: (tag) => {
    dispatch(addTaskTag(tag));
  },
  deleteTag: (tag) => {
    dispatch(deleteTaskTag(tag));
  },
  addElem: () => {
    dispatch(addInOutSet());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask)