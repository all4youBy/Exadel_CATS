import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './TasksAndTestsUser.scss';
import { Table, Tag, Badge } from 'antd';
import PropTypes from 'prop-types';
import Loading from '../../../../../Components/Loading';
import fetchPassedTasks from '../../../../Users/Tasks/PassedTasks/Services/Actions/actions';
import { fetchUserAssignedTests } from '../../../../Users/TestList/AssignedTestList/Services/Actions/actions';

class TasksAndTestsUser extends React.PureComponent {
  static propTypes = {
    getPassedTasks: PropTypes.func.isRequired,
    getAssignedTests: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf.isRequired,
    error: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    tests: PropTypes.arrayOf.isRequired,
  };

  state = {
    bordered: false,
    loading: false,
    pagination: { position: 'bottom' },
    size: 'middle',
    title: undefined,
    showHeader: true,
  };

  componentDidMount() {
    const { getPassedTasks, email, getAssignedTests } = this.props;
    getPassedTasks(email);
    getAssignedTests(email);
  }

  render() {
    const { tasks, error, tests } = this.props;
    const { bordered, loading, pagination, size, title, showHeader } = this.state;


    function formatDate(date) {
      let dd = date.getDate();
      if (dd < 10) dd = `0${dd}`;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = `0${mm}`;

      let yy = date.getFullYear() % 100;
      if (yy < 10) yy = `0${yy}`;

      return `${dd}.${mm}.${yy}`;
    }

    const data2 = [];
    if (tests && tests.length) {
      let deadline = null;
      const tags = [];
      tests.forEach((element) => {
        for (let index = 0; index < 3; index += 1) {
          tags[index] = <Tag color="blue">{element.topics[index]}</Tag>;
        }
      });
      for (let i = 0; i < 10; i += 1) {
        const date = new Date(tests[i].deadline);
        deadline = formatDate(date);
        data2.push({
          key: tests[i].testId,
          name: tests[i].title,
          theme: tags,
          countQuestions: `${i}`,
          time: deadline,
        });
      }
    }
    const columns2 = [{
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
    let container2 = null;
    if (tests) {
      if (tests.length) {
        container2 = (
          <Table
            columns={columns2}
            expandedRowRender={record => (
              <span className="questions-result">
                <Badge status={record.description}/><p className="badge-question-result">1 Вопрос</p>
                <Badge status={record.description}/><p className="badge-question-result">2 Вопрос</p>
              </span>
            )}
            dataSource={data2}
          />);
      } else {
        container2 = (<div className="empty-list">Список пуст</div>);
      }
    } else {
      container2 = <Loading/>;
    }

    if (error) {
      return <div/>;
    }

    const columns = [{
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

    function formatDate1(date) {
      let dd = date.getDate();
      if (dd < 10) dd = `0${dd}`;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = `0${mm}`;

      let yy = date.getFullYear() % 100;
      if (yy < 10) yy = `0${yy}`;

      return `${dd}.${mm}.${yy}`;
    }

    const tags = [];
    const data = [];
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
        data.push({
          key: `${i}`,
          name: task.title,
          theme: tags,
          author: task.solution.assignedBy,
          date: formatDate1(deadline),
          result: resultMark,
        });
      }
    }
    let container = null;
    if (tasks) {
      if (tasks.length) {
        container = (
          <Table
            {...{
              bordered,
              loading,
              pagination,
              size,
              title,
              showHeader,
            }}
            columns={columns}
            dataSource={data}
            rowClassName={() => 'abc'}
          />);
      } else {
        container = (<div className="empty-list">Список пуст</div>);
      }
    } else {
      container = <Loading/>;
    }
    return (
      <div>
        <div className="header-for-table"><span className="header">Пройденные тесты и задачи</span></div>
        {container}
        {container2}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tasks: state.userPassedTasks.tasks,
    tests: state.userAssignedTests.tests,
    error: state.userPassedTasks.error,
    email: ownProps.match.params.student,
  };
}

const mapDispatchToProps = dispatch => ({
  getPassedTasks: (userId) => {
    dispatch(fetchPassedTasks(userId));
  },
  getAssignedTests: (userId) => {
    dispatch(fetchUserAssignedTests(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksAndTestsUser);
