import React from 'react';
import './TableAllTasks.scss';
import PropTypes from 'prop-types';
import { Table, Tag } from 'antd';
import ButtonEditTask from './ButtonEditTask';
import ButtonAssignTask from '../../../../../Components/ButtonAssignTask';
import ButtonDeleteStudent from '../../../GroupsList/GroupStudentsList/Components/ButtonDeleteStudent';

import Loading from '../../../../../Components/Loading';

const columns = [{
  title: ' ',
  dataIndex: 'time',
  key: 'time',
  width: 70,
  className: 'column-break-point',
  render: () => (
    <div className="all-tasks-time">
      <div className="all-tasks-date-day">18</div>
      <div className="all-tasks-date-month">Июня</div>
      <div className="all-tasks-date-year">2018</div>
    </div>
  ),
}, {
  title: 'Название',
  dataIndex: 'name',
  key: 'name',
  width: 250,
  className: 'column-break-point',
  render: () => (
    <div className="all-tasks-title">
      <div className="all-tasks-title-text">Название</div>
      <div className="all-tasks-author">Пупкин</div>
    </div>
  ),
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
  render: () => (
    <div className="all-tasks-group-button">
      <div className="parent-button-edit-task"><ButtonEditTask/></div>
      <div className="parent-button-assign-task"><ButtonAssignTask/></div>
      <div className="parent-button-delete-student"><ButtonDeleteStudent/></div>
    </div>
  ),
}];

let tags = ['aaaa', 'ssss', 'ffff'];

tags = tags.map(element => <Tag color="blue">{element}</Tag>);

const data = [];
for (let i = 1; i <= 20; i += 1) {
  data.push({
    key: `${i}`,
    name: `Задача ${i}`,
    theme: tags,
    time: `${i} мин`,
  });
}


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
    const { tasks, error } = this.props;
    if (error) {
      return <Loading/>;
    }
    console.log(tasks, 78754);
    return (
      <div>
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
        />
      </div>
    );
  }
}

export default TableAllTasks;
