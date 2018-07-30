import React from 'react';
import './TableAssignedTests.scss';
import { Table } from 'antd';
import ButtonPassTest from './ButtonPassTest';

const columns = [{
  title: 'Название',
  dataIndex: 'name',
  key: 'name',
  width: 400,
  className: 'column-break-point',
}, {
  title: 'Тема',
  dataIndex: 'theme',
  key: 'theme',
  width: 600,
  className: 'column-break-point',
}, {
  title: 'Кол. вопросов',
  dataIndex: 'countQuestions',
  key: 'countQuestions',
  width: 250,
  className: 'column-break-point',
}, {
  title: 'Время выполнения',
  dataIndex: 'time',
  key: 'time',
  width: 500,
  className: 'column-break-point',
}, {
  title: '',
  key: 'start',
  width: 100,
  className: 'column-break-point',
  render: (/* text, record */) => (
    <ButtonPassTest/>
  ),
}];

const data = [];
for (let i = 1; i <= 20; i += 1) {
  data.push({
    key: `${i}`,
    name: `Тест ${i}`,
    theme: `Тема ${i}`,
    countQuestions: `${i}`,
    time: `${i} мин`,
  });
}


class TableAssignedTests extends React.PureComponent {
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
          rowClassName={() => 'abc'}
        />
      </div>
    );
  }
}

export default TableAssignedTests;
