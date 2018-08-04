import React from 'react';
import 'antd/dist/antd.css';
import './AddTask.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import InputOutputSet from './InputOutputSet';
import { addInOutSet, addTaskTag, deleteTaskTag, fetchTopics, fetchAddTask } from '../Services/Actions/actions';
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
  };

  state = {
    nameTask: '',
    textTask: '',
    testSets: [],
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

  render() {
    const {
      addTag, deleteTag, tags, addElem, testSet, topics,
      getTopics, postAddTask,
    } = this.props;
    const { nameTask, textTask, testSets } = this.state;
    let tagsTask = [];
    const handleSubmit = (e) => {
      e.preventDefault();
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
      postAddTask(obj);
    };
    return (
      <div className="add-task-container">
        <TextArea
          className="input-task-name"
          placeholder="Название задачи"
          autosize
          name="nameTask"
          onBlur={this.setField}
        />
        <TextArea
          className="input-task-desc"
          placeholder="Описание задачи"
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
          setTestSets={this.setTestSets}
        />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
