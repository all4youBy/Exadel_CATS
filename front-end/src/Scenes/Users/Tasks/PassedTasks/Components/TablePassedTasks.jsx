import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './TablePassedTasks.scss';
import { Table } from 'antd';

function TablePassedTasks() {
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

  const columns = [{
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    width: 350,
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
  }, {
    title: 'Автор',
    dataIndex: 'author',
    key: 'author',
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
      name: `Задание ${i}`,
      theme: `Тема ${i}`,
      author: `Автор ${i}`,
      date: `${i}.${i}.1999`,
      result: `${i}`,
      comment: 'Комметарий',
    });
  }

  return (
    <Table
      columns={columns}
      expandedRowRender={record => (
        <p>{record.comment}</p>
      )}
      dataSource={data}
    />
  );
}

export default TablePassedTasks;
