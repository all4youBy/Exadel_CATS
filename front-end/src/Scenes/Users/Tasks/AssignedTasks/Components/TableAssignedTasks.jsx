import React from 'react';
import { Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonPassTask from './ButtonPassTask';
import requestLoginInformation from '../../../../../Services/loginService';
import Loading from '../../../../../Components/Loading';
// import Loading from '../../../../../Components/Loading';

// let tags = ['aaaa', 'ssss', 'ffff'];
//
// tags = tags.map(element => <Tag color="blue">{element}</Tag>);

// const data = [];
// for (let i = 1; i <= 20; i += 1) {
//   data.push({
//     key: `${i}`,
//     name: `Задача ${i}`,
//     theme: tags,
//     author: `Автор ${i}`,
//     deadline: `${i}.${i}.200${i}`,
//   });
// }


class TableAssignedTasks extends React.PureComponent {
  static propTypes = {
    getAssignedTasks: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf.isRequired,
    error: PropTypes.string.isRequired,
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
    const { getAssignedTasks } = this.props;
    getAssignedTasks(requestLoginInformation().email);
  }

  render() {
    const { bordered, loading, pagination, size, title, showHeader } = this.state;
    const { error, tasks } = this.props;

    const columns = [{
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: 450,
      className: 'column-break-point',
      render(text) {
        return (
          <Link to="/groupstudentslist">{text}</Link>
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
      title: 'Дата сдачи',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 500,
      className: 'column-break-point',
    }, {
      title: 'Отметка',
      dataIndex: 'mark',
      key: 'mark',
      width: 500,
      className: 'column-break-point',
    }, {
      title: '',
      key: 'start',
      width: 100,
      className: 'column-break-point',
      render: record => (
        <ButtonPassTask taskId={record.taskId}/>
      ),
    }];
    console.log(tasks);
    if (error) {
      return <div/>;
    }

    const tags = [];

    tasks.forEach((element) => {
      element.topics.forEach((item, index) => {
        tags[index] = <Tag color="blue">{item}</Tag>;
      });
    });
    // tags = tags.map(element => <Tag color="blue">{element}</Tag>);

    const data = [];
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].solution.mark === null) {
        tasks[i].solution.mark = '-----';
      }
      data.push({
        key: `${i}`,
        name: tasks[i].title,
        theme: tags,
        mark: tasks[i].solution.mark,
        author: tasks[i].solution.assignedBy,
        date: new Date(tasks[i].solution.deadline),
        result: `${i}`,
        comment: 'Комметарий',
        taskId: tasks[i].solution.taskId,
      });
    }
    const container = tasks.length ? (
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
      />) : <Loading/>;

    return (
      <div>
        {container}
      </div>
    );
  }
}

export default TableAssignedTasks;
