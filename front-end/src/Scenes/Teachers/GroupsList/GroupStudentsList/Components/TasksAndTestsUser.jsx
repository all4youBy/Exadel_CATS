import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './TasksAndTestsUser.scss';
import { Table, Tag, Radio } from 'antd';
import PropTypes from 'prop-types';
import Loading from '../../../../../Components/Loading';
import fetchPassedTasks from '../../../../Users/Tasks/PassedTasks/Services/Actions/actions';
import fetchPassedTests from '../../../../Users/TestList/PassedTestList/Services/Actions/actions';

const RadioGroup = Radio.Group;

class TasksAndTestsUser extends React.PureComponent {
  static propTypes = {
    getPassedTasks: PropTypes.func.isRequired,
    getPassedTests: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf.isRequired,
    error: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    tests: PropTypes.arrayOf.isRequired,
  };

  state = {
    bordered: false,
    loading: false,
    pagination: { position: 'bottom' },
    size: 'middle',
    title: undefined,
    showHeader: true,
    change: 'TESTS',
  };

  componentDidMount() {
    const { getPassedTasks, email, getPassedTests } = this.props;
    getPassedTasks(email);
    getPassedTests(email);
  }

  render() {
    const { tasks, error, tests, lastName, firstName } = this.props;
    const { bordered, loading, pagination, size, title, showHeader, change } = this.state;


    function formatDate(date) {
      let dd = date.getDate();
      if (dd < 10) dd = `0${dd}`;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = `0${mm}`;

      let yy = date.getFullYear() % 100;
      if (yy < 10) yy = `0${yy}`;

      return `${dd}.${mm}.${yy}`;
    }

    const columnsTests = [{
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: 350,
      className: 'column-break-point',
    }, {
      title: 'Тема',
      dataIndex: 'theme',
      key: 'theme',
      width: 500,
      className: 'column-break-point',
    }, {
      title: 'Дата выполнения',
      dataIndex: 'date',
      key: 'date',
      width: 800,
      className: 'column-break-point',
    }, {
      title: 'Результат',
      dataIndex: 'result',
      key: 'result',
      width: 200,
      className: 'column-break-point',
    },
    ];

    const dataTests = [];
    if (tests && tests.length) {
      let deadline = null;
      const tags = [];
      tests.forEach((element) => {
        for (let index = 0; index < 3; index += 1) {
          tags[index] = <Tag color="blue">{element.topics[index]}</Tag>;
        }
      });
      for (let i = 0; i < tests.length; i += 1) {
        const date = new Date(tests[i].deadline);
        deadline = formatDate(date);
        dataTests.push({
          key: tests[i].testId,
          name: tests[i].title,
          theme: tags,
          author: `Автор ${i}`,
          date: deadline,
          result: !tests[i].mark ? '---' : tests[i].mark,
          description: 'success',
        });
      }
    }

    let containerTests = null;
    if (tests) {
      if (tests.length) {
        containerTests = (
          <div>
            <Table
              columns={columnsTests}
              dataSource={dataTests}
            />
          </div>);
      } else {
        containerTests = (<div className="empty-list">Список пуст</div>);
      }
    } else {
      containerTests = <Loading/>;
    }

    if (error) {
      return <div/>;
    }

    const columnsTasks = [{
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: 350,
      className: 'column-break-point',
      render(text, record) {
        return (
          <Link to={`/groupstudentslist/${record.key}`}>{text}</Link>
        );
      },
    }, {
      title: 'Тема',
      dataIndex: 'theme',
      key: 'theme',
      width: 500,
      className: 'column-break-point',
    }, {
      title: 'Автор',
      dataIndex: 'author',
      key: 'author',
      width: 500,
      className: 'column-break-point',
    }, {
      title: 'Дата выполнения',
      dataIndex: 'date',
      key: 'date',
      width: 800,
      className: 'column-break-point',
    }, {
      title: 'Результат',
      dataIndex: 'result',
      key: 'result',
      width: 250,
      className: 'column-break-point',
    },
    ];

    const tags = [];
    const dataTasks = [];
    if (tasks) {
      tasks.forEach((element) => {
        element.topics.forEach((item, index) => {
          tags[index] = <Tag color="blue">{item}</Tag>;
        });
      });
      for (let i = 0; i < tasks.length; i += 1) {
        const task = tasks[i];
        const deadline = new Date(tasks[i].solution.deadline);
        const resultMark = !task.solution.mark ? '---' : task.solution.mark;
        dataTasks.push({
          key: `${i}`,
          name: task.title,
          theme: tags,
          author: task.solution.assignedBy,
          date: formatDate(deadline),
          result: resultMark,
        });
      }
    }
    let containerTasks = null;
    if (tasks) {
      if (tasks.length) {
        containerTasks = (
          <Table
            {...{
              bordered,
              loading,
              pagination,
              size,
              title,
              showHeader,
            }}
            columns={columnsTasks}
            dataSource={dataTasks}
            rowClassName={() => 'abc'}
          />);
      } else {
        containerTasks = (<div className="empty-list">Список пуст</div>);
      }
    } else {
      containerTasks = <Loading/>;
    }
    const onChange = (e) => {
      console.log('radio checked', e.target.value);
      this.setState({
        change: e.target.value,
      });
    };
    let userInformation = '';
    switch (change) {
      case 'TESTS': {
        userInformation = containerTests;
        break;
      }
      case 'TASKS': {
        userInformation = containerTasks;
        break;
      }
      default: userInformation = containerTests;
    }
    return (
      <div>
        <div className="header-for-table">
          <span className="header-tests-and-tasks">Пройденные тесты и задачи<br/>
            <span
              className="user-information"
            >{lastName} {firstName}
            </span>
          </span>
          <RadioGroup className="tests-tasks" onChange={onChange} value={change} defaultValue="TESTS">
            <Radio value="TESTS">Тесты</Radio>
            <Radio value="TASKS">Задачи</Radio>
          </RadioGroup>
        </div>
        {userInformation}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tasks: state.userPassedTasks.tasks,
    tests: state.userPassedTests.tests,
    error: state.userPassedTasks.error,
    email: ownProps.match.params.student,
    lastName: ownProps.match.params.lastname,
    firstName: ownProps.match.params.firstname,
  };
}

const mapDispatchToProps = dispatch => ({
  getPassedTasks: (userId) => {
    dispatch(fetchPassedTasks(userId));
  },
  getPassedTests: (userId) => {
    dispatch(fetchPassedTests(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksAndTestsUser);
