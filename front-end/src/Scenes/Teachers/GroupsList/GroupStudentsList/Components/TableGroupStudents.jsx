import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import './TableGroupStudents.scss';
import { message, Table } from 'antd';
import PropTypes from 'prop-types';
import ButtonAssignTest from '../../../../../Components/ButtonAssignTest';
import ButtonAssignTask from '../../../../../Components/ButtonAssignTask';
import ButtonDeleteStudent from './ButtonDeleteStudent';
import ButtonAddStudent from './ButtonAddStudent';
import Loading from '../../../../../Components/Loading';

class TableGroupStudents extends React.Component {
  static propTypes = {
    getGroup: PropTypes.func.isRequired,
    students: PropTypes.objectOf.isRequired,
    handleStudentAdd: PropTypes.func.isRequired,
    handleStudentDelete: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  };

  state = {
    bordered: false,
    loading: false,
    pagination: { position: 'bottom' },
    size: 'middle',
    title: undefined,
    showHeader: true,
  };

  componentDidMount() {
    const { getGroup, groupName } = this.props;
    getGroup(groupName);
  }

  render() {
    const { students, handleStudentAdd, handleStudentDelete, error } = this.props;
    const { bordered, loading, pagination, size, title, showHeader } = this.state;
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
    }, {
      title: 'Тест1',
      dataIndex: 'test',
      key: 'test1',
      width: 150,
    }, {
      title: 'Тест2',
      dataIndex: 'test',
      key: 'test2',
      /* width должна отсутствовать в последней колонке скрола */
    }, {
      title: 'Кол. личных заданий',
      dataIndex: 'countTasks',
      key: 'countTasks',
      width: 100,
      fixed: 'right',
      render(text, record) {
        return (
          <Link to={`/groupstudentslist/personaltasks/${record.key}`}>{text}</Link>
        );
      },
    }, {
      title: 'Кол. личных тестов',
      dataIndex: 'countTests',
      key: 'countTests',
      width: 100,
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
        return (
          <div className="buttons-group-table">
            <div className="parent-button-assign-test"><ButtonAssignTest/></div>
            <div className="parent-button-assign-task"><ButtonAssignTask/></div>
            <div className="parent-button-delete-student"><ButtonDeleteStudent
              onStudentDelete={handleStudentDelete}
              data={record.number}
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
            <ButtonAddStudent onStudentAdd={handleStudentAdd}/>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Table
          rowClassName="student-row"
          {...{
            bordered,
            loading,
            pagination,
            size,
            title,
            showHeader,
          }}
          columns={columns}
          dataSource={students}
          scroll={{ x: 1500 }}
        />
        <ButtonAddStudent onStudentAdd={handleStudentAdd}/>
      </div>
    );
  }
}

export default TableGroupStudents;
