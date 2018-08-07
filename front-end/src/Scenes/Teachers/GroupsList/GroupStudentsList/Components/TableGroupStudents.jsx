/* eslint-disable spaced-comment,no-unused-vars,no-plusplus,react/jsx-indent,indent */
import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import './TableGroupStudents.scss';
import { message, Radio, Table } from 'antd';
import PropTypes from 'prop-types';
import ButtonAssignTest from '../../../../../Components/ButtonAssignTest';
import ButtonAssignTask from '../../../../../Components/ButtonAssignTask';
import ButtonDeleteStudent from './ButtonDeleteStudent';
// import ButtonAddStudent from './ButtonAddStudent';
import Loading from '../../../../../Components/Loading';

const { Group } = Radio;

class TableGroupStudents extends React.Component {
  static propTypes = {
    getGroup: PropTypes.func.isRequired,
    students: PropTypes.objectOf(PropTypes.any).isRequired,
    assignedTasks: PropTypes.objectOf(PropTypes.any).isRequired,
    handleStudentAdd: PropTypes.func.isRequired,
    handleStudentDelete: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    addStudentTest: PropTypes.func.isRequired,
    getAssignedTasks: PropTypes.func.isRequired,
  };

  state = {
    bordered: false,
    loading: false,
    pagination: { position: 'bottom' },
    size: 'middle',
    title: undefined,
    showHeader: true,
    load: false,
    assignedTasks: [],
  };

  componentDidMount() {
    const { getGroup, groupName, getAssignedTasks, students } = this.props;
    const { load } = this.state;
    // getAssignedTasks(students);
    getGroup(groupName);
    // console.log(students);
  }

  // static getDerivedStateFromProps(nextProps, nextState) {
  //   if (!nextProps.students.length) {
  //     nextProps.getGroup(nextProps.groupName);
  //   }
  //   if ((nextProps.students.length && !nextState.load
  //     /* !== nextState.groups &&
  //       nextProps.emptyList && !nextState.getListUsers*/
  //   )) {
  //     console.log('kkkkkkk');
  //     nextProps.getAssignedTasks(nextProps.students);
  //     return {
  //       assignedTasks: nextProps.assignedTasks,
  //       load: true,
  //     };
  //   }
  //   return {
  //     showHeader: true,
  //   };
  // }

  render() {
    const {
      students, handleStudentDelete, error, addStudentTest,
      groupName, getAssignedTasks,
    } = this.props;
    const {
      bordered, loading, pagination, size, title,
      showHeader, assignedTasks, load,
    } = this.state;
    if (error) {
      message.error(error);
      return <Loading/>;
    }
    const columns = [{
      title: '№',
      dataIndex: 'number',
      key: 'number',
      width: 50,
      fixed: 'left',
      className: 'student-number',
    }, {
      title: 'Студент',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      fixed: 'left',
      render: (text, record) => (
        <div>{record.lastName} {record.firstName}</div>
      ),
    }, {
      title: 'Тест2',
      dataIndex: 'test',
      key: 'test2',
      /* width должна отсутствовать в последней колонке скрола */
    }, {
      title: '',
      key: 'buttons',
      width: 100,
      fixed: 'right',
      render(record) {
        return (
          <div className="buttons-table">
            <div className="parent-button-assign-test"><ButtonAssignTest
              addStudent={addStudentTest}
              groupName={record}
            />
            </div>
            <div className="parent-button-assign-task"><ButtonAssignTask
              // addGroup={addGroupTask}
              groupName={record.name}
            />
            </div>
            <div className="parent-button-delete-group">
              <ButtonDeleteStudent
                onStudentDelete={handleStudentDelete}
                groupName={groupName}
                student={record.email}
              />
            </div>
          </div>
        );
      },
    }];
    if (students.length === 0) {
      return (
        <div className="parent-button-add-students-blank-page">
          <div className="block-button-add-students-blank-page">
            {/*<ButtonAddStudent onStudentAdd={handleStudentAdd}/>*/}
          </div>
        </div>
      );
    }
    const data = [];
    for (let i = 0; i < students.length; i += 1) {
      // if (assignedTasks[students.length - 1]) {
        console.log(assignedTasks[students.length - 1], 675);
        data.push({
          number: `${i + 1}.`,
          firstName: students[i].firstName,
          lastName: students[i].lastName,
          email: students[i].email,
        });
      // }
    }
    const table = students.length ? (
        <Table
          {...{
            bordered,
            loading,
            pagination,
            size,
            title,
            showHeader,
          }}
          dataSource={data}
          columns={columns}
          className="student-row"
          scroll={{ x: 1300 }}
        />)
      : <div className="empty-list">В этой группе нет студентов</div>;
    return (
      <div className="student-row">
        <div>
          <div className="group-name-list"><span>{groupName}</span></div>
          <Group className="radio-buttons" onChange={this.onChangeAnswer}>
            <Radio value="TASKS">Задачи</Radio>
            <Radio value="TESTS">Тесты</Radio>
          </Group>
        </div>
        {table}
        {/*<ButtonAddStudent onStudentAdd={handleStudentAdd}/>*/}
      </div>
    );
  }
}

export default TableGroupStudents;
