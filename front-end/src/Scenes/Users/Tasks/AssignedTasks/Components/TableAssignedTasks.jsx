import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import ButtonPassTask from './ButtonPassTask';

const columns = [{
  title: 'Название',
  dataIndex: 'name',
  key: 'name',
  width: 450,
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
  title: 'Дата сдачи',
  dataIndex: 'deadline',
  key: 'deadline',
  width: 500,
  className: 'column-break-point',
}, {
  title: '',
  key: 'start',
  width: 100,
  className: 'column-break-point',
  render: (/* text, record */) => (
    <ButtonPassTask/>
  ),
}];

const data = [];
for (let i = 1; i <= 20; i += 1) {
  data.push({
    key: `${i}`,
    name: `Задача ${i}`,
    theme: `Тема ${i}`,
    author: `Автор ${i}`,
    deadline: `${i}.${i}.200${i}`,
  });
}


class TableAssignedTasks extends React.PureComponent {
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

export default TableAssignedTasks;
