/* eslint-disable no-unused-vars,spaced-comment */
import React from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TaskProperties.scss';
import {
  createTask, fetchTasksAssign,
} from '../Services/Actions/actions';
// import Loading from '../../../../../Components/Loading';

const { Option } = Select;


const { TextArea } = Input;
const { RangePicker } = DatePicker;

class TaskProperties extends React.Component {
  static propTypes = {
    handleCreateTask: PropTypes.func.isRequired,
    teacher: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    receiver: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
    handleReceiveTasks: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
  };

  state = {
    nameTest: '',
    getStart: '',
    getDeadline: '',
    error: false,
    taskInfo: {},
  };

  componentDidMount() {
    const { handleReceiveTasks } = this.props;
    handleReceiveTasks();
  }

  onChangeData = (value, dateString) => {
    this.setState(() => ({
      getStart: dateString[0],
      getDeadline: dateString[1],
    }));
  };

  onOk = (value) => {
  };

  setSelectTask = (index) => {
    const { tasks } = this.props;
    const obj = {
      taskId: tasks[index].id,
      taskTopics: tasks[index].topics,
      title: tasks[index].title,
    };
    console.log(obj, 7839);
    this.setState({
      taskInfo: obj,
    });
  };

  setField = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validateTest = (task) => {
    if (task.getStart !== '' && task.getDeadline !== '') {
      return true;
    }
    return false;
  };

  render() {
    const {
      receiver, handleCreateTask, teacher, type, tasks, groupName,
    } = this.props;
    const {
      nameTest, getStart, getDeadline, error, taskInfo,
    } = this.state;
    const handleSubmit = () => {
      const task = {
        assignedBy: teacher,
        title: nameTest,
        start: getStart,
        deadline: getDeadline,
        topicsId: taskInfo.taskTopics,
      };
      if (this.validateTest(task)) {
        switch (type) {
          case 'STUDENT': {
            task.assignedTo = receiver;
            break;
          }
          case 'GROUPS': {
            task.assignedTo = groupName;
            task.id = taskInfo.taskId;
            task.title = taskInfo.title;
            this.setState(() => ({ error: false }));
            console.log(task, 783);
            handleCreateTask(task, '/assign-task-for-group');
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
    const children = [];
    if (tasks.length && !children.length) {
      let task = null;
      for (let i = 0; i < tasks.length; i += 1) {
        task = tasks[i];
        children.push(
          <Option
            key={i}
            value={i}
          >
            {task.title} <i>автор: {task.firstName} {task.lastName}</i>
          </Option>,
        );
      }
    }
    const errorInput = error ? <div className="error-input">Введите все данные!</div> : <div/>;

    return (
      <div className="test-properties-content">
        <div className="header">Назначение задачи</div>
        <div>Назначается: {groupName}</div>
        <div className="name-form-item">
          <div className="tasks-list-select">
            <Select
              showSearch="true"
              style={{ width: '100%' }}
              defaultValue="Выберите задачу"
              onChange={this.setSelectTask}
            >
              {children}
            </Select>
          </div>
          <div className="parent-form">
            <div className="form-item">
              <div>Выберите дату и время открытия и закрытия задачи:</div>
              <div className="input-data">
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['Открытие', 'Закрытие']}
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

function mapStateToProps(state, ownProps) {
  return {
    test: state,
    tasks: state.taskInformation.tasks,
    data: state.taskInformation.data,
    error: state.taskInformation.error,
    teacher: state.logInInformation.user.email,
    receiver: state.taskInformation.receiver,
    type: state.taskInformation.type,
    groupName: ownProps.match.params.groupName,
  };
}

const mapDispatchToProps = dispatch => ({
  handleCreateTask: (task, url) => {
    dispatch(createTask(task, url));
  },
  handleReceiveTasks: () => {
    dispatch(fetchTasksAssign());
  },
});

const WrappedTestPropertiesForm = Form.create()(TaskProperties);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedTestPropertiesForm);
