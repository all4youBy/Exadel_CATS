import React from 'react';
import 'antd/dist/antd.css';
import './TableAssignedTests.scss';
import { Table, Button } from 'antd';

const columns = [{
  title: 'Название',
  dataIndex: 'name',
  key: 'name',
  width: 350,
}, {
  title: 'Тема',
  dataIndex: 'theme',
  key: 'theme',
  width: 500,
}, {
  title: 'Кол. вопросов',
  dataIndex: 'countQuestions',
  key: 'countQuestions',
  width: 150,
}, {
  title: 'Время выполнения',
  dataIndex: 'time',
  key: 'time',
  width: 800,
}, {
  title: '',
  key: 'start',
  width: 100,
  render: (/* text, record */) => (
    <Button className="button-start-test" type="primary">Начать</Button>
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
