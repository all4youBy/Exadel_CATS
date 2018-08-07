import React from 'react';
import 'antd/dist/antd.css';
import './TablePassedTests.scss';
import { Table, Badge, Tag } from 'antd';

function TablePassedTests() {
  // const expandedRowRender = () => {
  //   const columns = [
  //     {
  //       dataIndex: 'status',
  //       key: 'status',
  //       width: 50,
  //       render: () => <span><Badge status="success"/></span>,
  //     }, {
  //       dataIndex: 'nameQuestion',
  //       key: 'nameQuestion',
  //       width: 900,
  //     },
  //   ];
  //
  //   const data = [];
  //   for (let i = 1; i <= 5; i += 1) {
  //     data.push(
  //       {
  //         key: i,
  //         status: 'success',
  //         nameQuestion: `Вопрос ${i}`,
  //       },
  //     );
  //   }
  //   return (
  //     <Table
  //       columns={columns}
  //       dataSource={data}
  //       pagination={false}
  //     />
  //   );
  // };

  let tags = ['aaaa', 'ssss', 'ffff'];

  tags = tags.map(element => <Tag color="blue">{element}</Tag>);


  const columns = [{
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    width: 350,
    className: 'column-break-point',
  }, {
    title: 'Тема',
    dataIndex: 'theme',
    key: 'theme',
    width: 500,
    className: 'column-break-point',
  }, {
    title: 'Дата выполнения',
    dataIndex: 'date',
    key: 'date',
    width: 800,
    className: 'column-break-point',
  }, {
    title: 'Результат',
    dataIndex: 'result',
    key: 'result',
    width: 200,
    className: 'column-break-point',
  },
  ];

  const data = [];
  for (let i = 1; i <= 10; i += 1) {
    data.push({
      key: `${i}`,
      name: `Тест ${i}`,
      theme: tags,
      author: `Автор ${i}`,
      date: `${i}.${i}.1999`,
      result: `${i}`,
      description: 'success',
    });
  }

  return (
    <div>
      <div className="header-for-table"><span className="header">Назначенные тесты</span></div>
      <Table
        columns={columns}
        expandedRowRender={record => (
          <span className="questions-result">
            <Badge status={record.description}/><p className="badge-question-result">1 Вопрос</p>
            <Badge status={record.description}/><p className="badge-question-result">2 Вопрос</p>
          </span>
        )}
        dataSource={data}
      />
    </div>
  );
}

export default TablePassedTests;
