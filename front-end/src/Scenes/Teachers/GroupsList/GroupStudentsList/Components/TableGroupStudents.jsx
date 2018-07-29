import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './TableGroupStudents.scss';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import ButtonAssignTest from '../../../../../Components/ButtonAssignTest';
import ButtonAssignTask from '../../../../../Components/ButtonAssignTask';
import ButtonDeleteStudent from './ButtonDeleteStudent';
import { addStudent, deleteStudent } from '../Services/Actions/actions';
import ButtonAddStudent from './ButtonAddStudent';

class TableGroupStudents extends React.Component {
  static propTypes = {
    students: PropTypes.objectOf.isRequired,
    handleStudentAdd: PropTypes.func.isRequired,
    handleStudentDelete: PropTypes.func.isRequired,
  };

  state = {
    bordered: false,
    loading: false,
    pagination: { position: 'bottom' },
    size: 'middle',
    title: undefined,
    showHeader: true,
  };

  render() {
    const { students, handleStudentAdd, handleStudentDelete } = this.props;
    const { bordered, loading, pagination, size, title, showHeader } = this.state;
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
            <div className="parent-button-delete-student"><ButtonDeleteStudent onStudentDelete={handleStudentDelete} data={record.number}/>
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

function mapStateToProps(state) {
  return { students: state.groupStudentsList.group };
}

const mapDispatchToProps = dispatch => ({
  handleStudentAdd: (student) => {
    dispatch(addStudent(student));
  },
  handleStudentDelete: (key) => {
    dispatch(deleteStudent(key));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableGroupStudents);
