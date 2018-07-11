import React from 'react';
import 'antd/dist/antd.css';
import './TablePassedTests.css';
import { Table, Badge } from 'antd';

const columns = [
  {
    title: false,
    dataIndex: 'status',
    key: 'status',
    width: 50,
    render: () => <span><Badge status="success"/></span>,
  }, {
    title: false,
    dataIndex: 'nameQuestion',
    key: 'nameQuestion',
    width: 900,
  },
];

const data = [];
for (let i = 1; i <= 5; i += 1) {
  data.push(
    {
      key: i,
      status: 'success',
      nameQuestion: `Вопрос ${i}`,
    },
  );
}

class QuestionsList extends React.PureComponent {
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
        pagination={false}
      />
    );
  }
}

export default QuestionsList;
