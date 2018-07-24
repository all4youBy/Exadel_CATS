import React from 'react';
import { Link } from 'react-router-dom';
import './TableGroupsList.scss';
import { Table } from 'antd';
import ButtonEditGroup from './ButtonEditGroup';
import ButtonAssignTask from '../../../../../Components/ButtonAssignTask';
import ButtonDeleteGroup from './ButtonDeleteGroup';
import ButtonAssignTest from '../../../../../Components/ButtonAssignTest';
import ButtonCreateGroup from './ButtonCreateGroup';
import InputSearch from './InputSearch';

function TableGroupsList() {
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
    title: ' ',
    dataIndex: 'name',
    key: 'name',
    width: 350,
    render(text, record) {
      return (
        <Link to={`/groupstudentslist/${record.key}`}>{text}</Link>
      );
    },
  }, {
    title: ' ',
    dataIndex: 'course',
    key: 'course',
    width: 500,
  }, {
    title: ' ',
    dataIndex: 'date',
    key: 'date',
    width: 800,
  }, {
    title: ' ',
    dataIndex: 'button',
    key: 'button',
    width: 100,
    render() {
      return (
        <div className="buttons-group-table">
          <div className="parent-button-edit-group"><ButtonEditGroup/></div>
          <div className="parent-button-assign-test"><ButtonAssignTest/></div>
          <div className="parent-button-assign-task"><ButtonAssignTask/></div>
          <div className="parent-button-delete-group"><ButtonDeleteGroup/></div>
        </div>
      );
    },
  },
  ];

  const data = [];
  for (let i = 1; i <= 10; i += 1) {
    data.push({
      key: `${i}`,
      name: `${i}  группа`,
      course: `Курс ${i}`,
      date: '17/18 год',

    });
  }
  columns[0].title = <InputSearch/>;
  columns[3].title = <ButtonCreateGroup/>;
  return (
    <Table
      columns={columns}
      dataSource={data}
    />
  );
}

export default TableGroupsList;
