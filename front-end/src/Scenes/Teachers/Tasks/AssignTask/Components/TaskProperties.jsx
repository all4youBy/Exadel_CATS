import React from 'react';
import { Form, Button, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TaskProperties.scss';
import {
  createTask, fetchTasksAssign,
} from '../Services/Actions/actions';
// import Loading from '../../../../../Components/Loading';

const { Option } = Select;


const { RangePicker } = DatePicker;

class TaskProperties extends React.Component {
  static propTypes = {
    handleCreateTask: PropTypes.func.isRequired,
    teacher: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
    handleReceiveTasks: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      nameTest: '',
      getStart: '',
      getDeadline: '',
      error: false,
      taskInfo: '',
    };
  }

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


  setSelectTask = (index) => {
    const { tasks } = this.props;
    const obj = {
      taskId: tasks[index].id,
      taskTopics: tasks[index].topics,
      title: tasks[index].title,
    };
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

  validateTask = (task) => {
    if (task.deadline !== '' && task.start !== '') {
      return true;
    }
    return false;
  };

  render() {
    const {
      handleCreateTask, teacher, tasks,
    } = this.props;
    const {
      nameTest, getStart, getDeadline, error, taskInfo,
    } = this.state;
    const receiverInfo = JSON.parse(localStorage.getItem('userStatusForAssign'));
    const handleSubmit = () => {
      const task = {
        assignedBy: teacher,
        title: nameTest,
        start: getStart,
        deadline: getDeadline,
        id: taskInfo.taskId,
      // topicsId: taskInfo.taskTopics,
      };
      switch (typeof receiverInfo) {
        case 'object': {
          task.assignedTo = receiverInfo.email;
          this.setState(() => ({ error: false }));
          if (this.validateTask(task)) {
            handleCreateTask(task, '/assign-task-for-user');
          } else {
            this.setState(({ error: true }));
          }
          break;
        }
        case 'string': {
          task.assignedTo = receiverInfo;
          this.setState(() => ({ error: false }));
          if (this.validateTask(task)) {
            handleCreateTask(task, '/assign-task-for-group');
          } else {
            this.setState(({ error: true }));
          }
          break;
        }
        default: {
          this.setState(() => ({ error: false }));
        }
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
    const name = typeof receiverInfo === 'string' ? receiverInfo : receiverInfo.name;
    return (
      <div className="test-properties-content">
        <div className="header">Назначение задачи</div>
        <div>Назначается: {name}</div>
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
        <div className="error-input-parent">{errorInput}</div>
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
