import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import './TableGroupStudents.scss';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import ButtonAssignTest from './ButtonAssignTest';
import ButtonAssignTask from './ButtonAssignTask';
import ButtonDeleteStudent from './ButtonDeleteStudent';
import { addStudent, deleteStudent } from '../Services/Actions/actions';

//
// for (let i = 1; i <= 20; i += 1) {
//   data.push({
//     key: `${i}`,
//     number: `${i}.`,
//     name: 'Пупкин Василий Иванович',
//     test1: `Тест ${i}`,
//     test2: `Тест ${i}`,
//     countTasks: `${i}`,
//     countTests: `${i}`,
//   });
// }

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
}, {
  title: 'Кол. личных тестов',
  dataIndex: 'countTests',
  key: 'countTests',
  width: 100,
  fixed: 'right',
}, {
  title: '',
  key: 'buttons',
  width: 100,
  fixed: 'right',
  render: (/* text, record */) => (
    <div className="buttons-group-table">
      <div className="parent-button-assign-test"><ButtonAssignTest/></div>
      <div className="parent-button-assign-task"><ButtonAssignTask/></div>
      <div className="parent-button-delete-student"><ButtonDeleteStudent/></div>
    </div>
  ),
}];

class TableGroupStudents extends React.Component {
  static propTypes = {
    students: PropTypes.func.isRequired,
    handleStudentAdd: PropTypes.func.isRequired,
  };

  state = {
    bordered: false,
    loading: false,
    pagination: { position: 'bottom' },
    size: 'middle',
    title: undefined,
    showHeader: true,
  };


  // selectStudent(studentId) {
  //   const { props } = this.props;
  //   const { student } = props.students.find(item => item.id === studentId);
  //   this.setState({ selectedStudent: student });
  // }

  render() {
    const { students, handleStudentAdd } = this.props;
    const { bordered, loading, pagination, size, title, showHeader } = this.state;
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
          dataSource={students.groupStudentsList}
          scroll={{ x: 1500 }}
        />
        <div className="parent-button-assign-test"><ButtonAssignTest onStudentAdd={handleStudentAdd}/></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { students: state };
}

const mapDispatchToProps = dispatch => ({
  handleStudentAdd: (book) => {
    dispatch(addStudent(book));
  },
  handleStudentDelete: (book) => {
    dispatch(deleteStudent(book));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableGroupStudents);
