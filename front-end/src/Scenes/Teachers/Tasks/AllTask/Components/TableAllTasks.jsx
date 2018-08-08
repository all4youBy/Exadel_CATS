import React from 'react';
import './TableAllTasks.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Tag } from 'antd';
import ButtonEditTask from './ButtonEditTask';
import Loading from '../../../../../Components/Loading';
import requestLoginInformation from '../../../../../Services/loginService';

class TableAllTasks extends React.PureComponent {
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string.isRequired,
    getTasks: PropTypes.func.isRequired,
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
    const { getTasks } = this.props;
    getTasks();
  }

  render() {
    const { bordered, loading, pagination, size, title, showHeader } = this.state;
    const { tasks } = this.props;
    const data = [];
    const arrMonth = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Ноябрь',
      'Декабрь',
    ];


    const columns = [{
      title: 'Дата создания',
      dataIndex: 'day',
      key: 'dat',
      width: 70,
      className: 'column-break-point',
      render: (text, record) => (
        <div className="all-tasks-time">
          <div className="all-tasks-date-day">{record.day}</div>
          <div className="all-tasks-date-month">{record.month}</div>
          <div className="all-tasks-date-year">{record.year}</div>
        </div>
      ),
    }, {
      title: 'Название',
      dataIndex: 'taskName',
      key: 'taskName',
      width: 250,
      className: 'column-break-point',
      render: (text, record) => {
        const link = `/viewtask/${record.id}`;
        return (
          <div className="all-tasks-title">
            <Link className="link-name-group" to={link}>{record.taskName}</Link>
            <div className="all-tasks-author">{record.author}</div>
          </div>);
      },
    }, {
      title: 'Тема',
      dataIndex: 'theme',
      key: 'theme',
      width: 800,
      className: 'column-break-point',
    }, {
      title: ' ',
      dataIndex: 'button',
      key: 'button',
      width: 100,
      className: 'column-break-point',
      render: (text) => {
        if (requestLoginInformation().email === text) {
          return (
            <div className="all-tasks-group-button">
              <div className="parent-button-edit-task"><ButtonEditTask/></div>
            </div>
          );
        }
        return <div/>;
      },
    }];

    for (let i = 0; i < tasks.length; i += 1) {
      const date = new Date(tasks[i].dateCreation);
      let tags = [];
      if (tasks[i].topics.length > 3) {
        for (let index = 0; index < 3; index += 1) {
          tags[index] = <Tag color="blue">{tasks[i].topics[index]}</Tag>;
        }
      } else {
        tags = tasks[i].topics.map(element => (<Tag color="blue">{element}</Tag>));
      }

      data.push({
        key: `${i}`,
        author: `${tasks[i].firstName} ${tasks[i].lastName}`,
        theme: tags,
        taskName: tasks[i].title,
        day: date.getDate(),
        month: arrMonth[date.getMonth()],
        year: date.getFullYear(),
        button: tasks[i].email,
        formDate: date,
        id: tasks[i].id,
      });
    }

    data.sort((a, b) => (
      b.formDate - a.formDate
    ));
    const content = tasks.length ? (
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
      />) : <Loading/>;
    return (
      <div><div className="header-for-table"><span className="header-tasks">Список задач</span></div>
        {content}
      </div>
    );
  }
}

export default TableAllTasks;
