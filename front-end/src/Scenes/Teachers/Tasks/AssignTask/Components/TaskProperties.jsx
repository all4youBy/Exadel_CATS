/* eslint-disable no-unused-vars,spaced-comment */
import React from 'react';
import { Form, Input, Button, DatePicker, TimePicker, InputNumber } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TreeWithTags from '../../../../../Components/TreeWithTags';

import {
  addTaskTag, createTask,
  deleteTaskTag,
  fetchTopics,
} from '../Services/Actions/actions';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

class TaskProperties extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.any).isRequired,
    handleDeleteTaskTag: PropTypes.func.isRequired,
    handleAddTaskTag: PropTypes.func.isRequired,
    handleCreateTask: PropTypes.func.isRequired,
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf(PropTypes.any).isRequired,
    teacher: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    receiver: PropTypes.string.isRequired,
  };

  state = {
    nameTest: '',
    getStart: '',
    getDeadline: '',
    error: false,
  };

  onChangeData = (value, dateString) => {
    this.setState(() => ({
      getStart: dateString[0],
      getDeadline: dateString[1],
    }));
  };

  onOk = (value) => {
  };

  setField = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validateTest = (task) => {
    if (task.nameTest !== '' && task.getStart !== ''
      && task.getDeadline !== '' && task.topicsId.length) {
      return true;
    }
    return false;
  };

  render() {
    const {
      handleAddTaskTag, handleDeleteTaskTag, receiver, tags, handleCreateTask,
      topics, getTopics, teacher, type,
    } = this.props;
    const {
      nameTest, getStart, getDeadline, error,
    } = this.state;
    const handleSubmit = () => {
      let tagsTask = [];
      if (tags.length) {
        const tagsArray = [];
        tags.forEach((element) => {
          tagsArray.push(element.id);
        });
        tagsTask = tagsArray;
      } else {
        tagsTask = tags;
      }
      const task = {
        assignedBy: teacher,
        title: nameTest,
        start: new Date(getStart.toString()),
        deadline: new Date(getDeadline.toString()),
        topicsId: tagsTask,
      };
      if (this.validateTest(task)) {
        switch (type) {
          case 'STUDENT': {
            task.email = receiver;
            break;
          }
          case 'GROUPS': {
            task.assignedTo = receiver;
            this.setState(() => ({ error: false }));
            handleCreateTask({ task }, '/assign-task-for-group');
            break;
          }
          default: {
            this.setState(() => ({ error: false }));
          }
        }
      } else {
        this.setState(() => ({ error: true }));
      }
    };
    const errorInput = error ? <div className="error-input">Введите все данные!</div> : <div/>;

    return (
      <div className="test-properties-content">
        <div className="header">Назначение задачи</div>
        <div>Назначается: {receiver}</div>
        <div className="name-form-item">
          <TextArea
            name="nameTest"
            type="text"
            className="input-task-name"
            placeholder="Введите название теста"
            autosize
            onBlur={this.setField}
          />
          <div className="tags-test-properties">
            <TreeWithTags
              tags={tags}
              deleteTag={handleDeleteTaskTag}
              addTag={handleAddTaskTag}
              valid={handleCreateTask}
              topics={topics}
              getTopics={getTopics}
            />
          </div>
          <div className="parent-form">
            <div className="form-item">
              <div>Выберите дату и время открытия и закрытия условия задачи:</div>
              <div className="input-data">
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['Открытие теста', 'Закрытие теста']}
                  onChange={this.onChangeData}
                  onOk={this.onOk}
                />
              </div>
            </div>
          </div>
        </div>
        {errorInput}
        <Button
          className="button-table-with-border button-assign"
          type="primary"
          onClick={handleSubmit}
        >Назначить
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tags: state.taskInformation.tags,
    test: state,
    students: state.taskInformation.students,
    data: state.taskInformation.data,
    error: state.taskInformation.error,
    groups: state.allGroups.groups,
    topics: state.taskInformation.topics,
    teacher: state.logInInformation.user.email,
    receiver: state.taskInformation.receiver,
    type: state.taskInformation.type,
  };
}

const mapDispatchToProps = dispatch => ({
  handleCreateTask: (task, url) => {
    dispatch(createTask(task, url));
  },
  handleAddTaskTag: (tag) => {
    dispatch(addTaskTag(tag));
  },
  handleDeleteTaskTag: (tag) => {
    dispatch(deleteTaskTag(tag));
  },
  getTopics: () => {
    dispatch(fetchTopics());
  },
});

const WrappedTestPropertiesForm = Form.create()(TaskProperties);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedTestPropertiesForm);
