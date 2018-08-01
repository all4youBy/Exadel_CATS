import React from 'react';
import 'antd/dist/antd.css';
import './AddTask.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import InputOutputSet from './InputOutputSet';
import { addInOutSet, addTaskTag, deleteTaskTag, fetchTopics } from '../Services/Actions/actions';
import TreeWithTags from '../../../../../Components/TreeWithTags';


const { TextArea } = Input;

class AddTask extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    deleteTag: PropTypes.func.isRequired,
    addTag: PropTypes.func.isRequired,
    testSet: PropTypes.arrayOf(PropTypes.object).isRequired,
    addElem: PropTypes.func.isRequired,
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.string.isRequired,
  };

  render() {
    const { addTag, deleteTag, tags, addElem, testSet, topics, getTopics } = this.props;
    return (
      <div className="add-task-container">
        <TextArea className="input-task-name" placeholder="Название задачи" autosize/>
        <TextArea className="input-task-desc" placeholder="Описание задачи" autosize={{ minRows: 7 }}/>
        <div className="tree-with-tags">
          <TreeWithTags
            tags={tags}
            deleteTag={deleteTag}
            topics={topics}
            addTag={addTag}
            getTopics={getTopics}
          />
        </div>
        <InputOutputSet addElem={addElem} testSet={testSet}/>
        <Button type="primary" className="button-table-with-border task-upload-button">Отправить</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topics: state.addTask.topics,
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
  getTopics: () => {
    dispatch(fetchTopics());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
