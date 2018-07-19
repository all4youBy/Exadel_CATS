import React from 'react';
import 'antd/dist/antd.css';
import './TableAllTasks.scss';
import { Table } from 'antd';
import ButtonEditTask from './ButtonEditTask';
import ButtonAssignTask from '../../../GroupsList/GroupStudentsList/Components/ButtonAssignTask';
import ButtonDeleteStudent from '../../../GroupsList/GroupStudentsList/Components/ButtonDeleteStudent';

const columns = [{
  title: ' ',
  dataIndex: 'time',
  key: 'time',
  width: 70,
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
}, {
  title: ' ',
  dataIndex: 'button',
  key: 'button',
  width: 100,
  render: () => (
    <div className="all-tasks-group-button">
      <div className="parent-button-edit-task"><ButtonEditTask/></div>
      <div className="parent-button-assign-task"><ButtonAssignTask/></div>
      <div className="parent-button-delete-student"><ButtonDeleteStudent/></div>
    </div>
  ),
}];

const data = [];
for (let i = 1; i <= 20; i += 1) {
  data.push({
    key: `${i}`,
    name: `Задача ${i}`,
    theme: `Тема ${i}`,
    time: `${i} мин`,
  });
}


class TableAllTasks extends React.PureComponent {
  state = {
    bordered: false,
    loading: false,
    pagination: { position: 'bottom' },
    size: 'middle',
    title: undefined,
    showHeader: true,
  };

  render() {
    const { bordered, loading, pagination, size, title, showHeader } = this.state;
    console.log(columns);
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
