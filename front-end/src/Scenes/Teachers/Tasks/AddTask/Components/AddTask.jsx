import React from 'react';
import 'antd/dist/antd.css';
import './AddTask.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import InputOutputSet from './InputOutputSet';
import {
  addInOutSet, addTaskTag, deleteTaskTag,
  fetchTopics, fetchAddTask, clearTags, deleteInOutSet,
} from '../Services/Actions/actions';
import TreeWithTags from '../../../../../Components/TreeWithTags';
import requestLoginInformation from '../../../../../Services/loginService';


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
    postAddTask: PropTypes.func.isRequired,
    setClearTags: PropTypes.func.isRequired,
    deleteSet: PropTypes.func.isRequired,
  };

  state = {
    nameTask: '',
    textTask: '',
    testSets: [],
    error: false,
  };

  setField = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    const { testSets } = this.state;
    this.setState({
      [name]: value,
    });
    switch (name) {
      case 'answerFalse': {
        if (value !== '') {
          testSets.push({ correct: false, text: value });
        }
        break;
      }
      case 'answerTrue': {
        if (value !== '') {
          testSets.push({ correct: true, text: value });
        }
        break;
      }
      case 'question': {
        if (value !== '') {
          this.setState({ [name]: value });
          this.question.text = value;
        }
        break;
      }
      default:
        console.log(name);
    }
  };

  setTestSets = (data) => {
    this.setState({
      [data]: data,
    });
  };

  validateTask = (task) => {
    if (task.title !== '' && task.text !== '' && task.topicIds.length
      && task.testingSets.length && task.type !== '') {
      return true;
    }
    return false;
  };

  render() {
    const {
      addTag, deleteTag, tags, addElem, testSet, topics,
      getTopics, postAddTask, deleteSet,
    } = this.props;
    const { nameTask, textTask, testSets, error } = this.state;
    let tagsTask = [];
    const handleSubmit = (e) => {
      e.preventDefault();
      const { setClearTags } = this.props;
      if (tags.length) {
        const tagsArray = [];
        tags.forEach((element) => {
          tagsArray.push(element.id);
        });
        tagsTask = tagsArray;
      } else {
        tagsTask = tags;
      }
      let tests = testSets;
      tests = tests.map((element) => {
        if (!element.difficultyLevel || element.difficultyLevel === 0) {
          element.difficultyLevel = null;
        }
        return element;
      });
      const obj = {
        author: requestLoginInformation().email,
        title: nameTask,
        text: textTask,
        topicIds: tagsTask,
        testingSets: tests,
        type: 'PASS_ALL',
      };
      if (this.validateTask(obj)) {
        postAddTask(obj);
        setClearTags();
        this.setState(({
          testSets: [],
        }));
      } else {
        this.setState(({
          error: true,
        }));
      }
    };
    const errorInput = error ? <div className="error-input">Введите все данные!</div> : <div/>;
    return (
      <div className="add-task-container">
        <div className="header">Добавдение задачи</div>
        <TextArea
          type="text"
          className="input-task-name"
          placeholder="Название задачи"
          autosize
          name="nameTask"
          onBlur={this.setField}
        />
        <TextArea
          className="input-task-desc"
          placeholder="Описание условия задачи"
          name="textTask"
          autosize={{ minRows: 7 }}
          onBlur={this.setField}
        />
        <div className="tree-with-tags">
          <TreeWithTags
            tags={tags}
            deleteTag={deleteTag}
            topics={topics}
            addTag={addTag}
            getTopics={getTopics}
          />
        </div>
        <InputOutputSet
          addElem={addElem}
          testSet={testSet}
          testSets={testSets}
          deleteSet={deleteSet}
          setTestSets={this.setTestSets}
        />
        <div className="error-input-parent">{errorInput}</div>
        <Button
          type="primary"
          className="button-table-with-border task-upload-button"
          onClick={handleSubmit}
        >Отправить
        </Button>
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
  postAddTask: (data) => {
    dispatch(fetchAddTask(data));
  },
  setClearTags: () => {
    dispatch(clearTags());
  },
  deleteSet: (id) => {
    dispatch(deleteInOutSet(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
