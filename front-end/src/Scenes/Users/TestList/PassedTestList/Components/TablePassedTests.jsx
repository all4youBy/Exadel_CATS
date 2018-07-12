import React from 'react';
import 'antd/dist/antd.css';
import './TablePassedTests.css';
import { Table, Badge } from 'antd';

function TablePassedTests() {
  const expandedRowRender = () => {
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
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const columns = [{
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    width: 150,
  }, {
    title: 'Тема',
    dataIndex: 'theme',
    key: 'theme',
    width: 500,
  }, {
    title: 'Дата выполнения',
    dataIndex: 'date',
    key: 'date',
    width: 800,
  }, {
    title: 'Результат',
    dataIndex: 'result',
    key: 'result',
    width: 200,
  },
  ];

  const data = [];
  for (let i = 1; i <= 10; i += 1) {
    data.push({
      key: `${i}`,
      name: `Тест ${i}`,
      theme: `Тема ${i}`,
      author: `Автор ${i}`,
      date: `${i}.${i}.1999`,
      result: `${i}`,
    });
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
    />
  );
}

export default TablePassedTests;
