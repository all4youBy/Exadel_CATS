import React from 'react';
import 'antd/dist/antd.css';
import './TableStatistics.scss';
import { Table } from 'antd';

const data = [];
for (let i = 1; i <= 20; i += 1) {
  data.push({
    key: `${i}`,
    name: 'Пупкин Василий Иванович',
    test: `Тест ${i}`,
    countTasks: `${i}`,
    countTests: `${i}`,
  });
}

const columns = [{
  title: 'Студент',
  dataIndex: 'name',
  key: 'name',
  width: 250,
  fixed: 'left',
}, {
  title: 'Тест1',
  dataIndex: 'test',
  key: 'test',
  width: 250,
}, {
  title: 'Тест2',
  dataIndex: 'test',
  key: 'test',
  /* width должна отсутствовать в последней колонке скрола */
}, {
  title: 'Кол. личных заданий',
  dataIndex: 'countTasks',
  key: 'countTasks',
  width: 100,
  fixed: 'right',
}, {
  title: 'Кол. личных тестов',
  dataIndex: 'countTests',
  key: 'countTests',
  width: 100,
  fixed: 'right',
}, {
  title: '',
  key: 'buttons',
  width: 100,
  fixed: 'right',
  render: (/* text, record */) => (
    <div className="buttons-group-table"/>
  ),
}];

class Statistics extends React.PureComponent {
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
          scroll={{ x: 1500 }}
        />
      </div>
    );
  }
}

export default Statistics;
