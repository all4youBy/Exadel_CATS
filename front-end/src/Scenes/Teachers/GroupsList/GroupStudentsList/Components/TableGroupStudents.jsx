/* eslint-disable spaced-comment,no-unused-vars,no-plusplus */
import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import './TableGroupStudents.scss';
import { message, Radio, Table } from 'antd';
import PropTypes from 'prop-types';
import ButtonAssignTest from '../../../../../Components/ButtonAssignTest';
import ButtonDeleteStudent from './ButtonDeleteStudent';
// import ButtonAddStudent from './ButtonAddStudent';
import Loading from '../../../../../Components/Loading';
import ButtonAssignTaskForUser from './ButtonAssignTaskForUser';
import ButtonAssignTestForUser from './ButtonAssignTestForUser';

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
    addStudentTask: PropTypes.func.isRequired,
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
    const { getGroup, groupName } = this.props;
    const { load } = this.state;
    getGroup(groupName);
    if (!load) {
      this.setState(() => ({
        load: true,
      }));
    }
  }

  render() {
    const {
      students, handleStudentDelete, error, addStudentTest,
      groupName, addStudentTask,
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
      title: 'Личные задачи',
      dataIndex: 'countTasks',
      key: 'countTasks',
      width: 70,
      fixed: 'right',
      render: (text, record) => (
        <Link to={`/groupstudentslist/personaltasks/${record.key}`}>{record.countTasks}</Link>
      ),
    }, {
      title: 'Личные тесты',
      dataIndex: 'countTests',
      key: 'countTests',
      width: 70,
      fixed: 'right',
      render(text, record) {
        return (
          <Link to={`/groupstudentslist/personaltests/${record.key}`}>{text}</Link>
        );
      },
    }, {
      title: '',
      key: 'buttons',
      width: 100,
      fixed: 'right',
      render(record) {
        const obj = {
          email: record.email.toString(),
          name: `${record.firstName} ${record.lastName}`,
        };
        return (
          <div className="buttons-table">
            <div className="parent-button-assign-test"><ButtonAssignTestForUser
              addStudent={addStudentTest}
              groupName={obj}
            />
            </div>
            <div className="parent-button-assign-task"><ButtonAssignTaskForUser
              addStudentTask={addStudentTask}
              groupName={obj}
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
    if (students && students.length === 0) {
      return (
        <div className="parent-button-add-students-blank-page">
          <div className="block-button-add-students-blank-page">
            {/*<ButtonAddStudent onStudentAdd={handleStudentAdd}/>*/}
          </div>
        </div>
      );
    }
    const data = [];
    if (students) {
      for (let i = 0; i < students.length; i += 1) {
        if (!load) {
          this.setState(() => ({
            load: true,
          }));
        }
        data.push({
          number: `${i + 1}.`,
          firstName: students[i].firstName,
          lastName: students[i].lastName,
          countTasks: assignedTasks[i] ? assignedTasks[i].length : null,
          email: students[i].email,
        });
      }
    }
    let container = null;
    if (students) {
      if (students.length) {
        container = (
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
          />);
      } else {
        container = (<div className="empty-list">Список пуст</div>);
      }
    } else {
      container = <Loading/>;
    }
    return (
      <div className="student-row">
        <div>
          <div className="group-name-list"><span>{groupName}</span></div>
          <Group className="radio-buttons" onChange={this.onChangeAnswer}>
            <Radio value="TASKS">Задачи</Radio>
            <Radio value="TESTS">Тесты</Radio>
          </Group>
        </div>
        {container}
        {/*<ButtonAddStudent onStudentAdd={handleStudentAdd}/>*/}
      </div>
    );
  }
}

export default TableGroupStudents;
