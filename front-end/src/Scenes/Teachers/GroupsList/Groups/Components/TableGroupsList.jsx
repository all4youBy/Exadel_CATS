import React from 'react';
import { Link } from 'react-router-dom';
import './TableGroupsList.scss';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonEditGroup from './ButtonEditGroup';
import ButtonAssignTask from '../../../../../Components/ButtonAssignTask';
import ButtonDeleteGroup from './ButtonDeleteGroup';
import ButtonAssignTest from '../../../../../Components/ButtonAssignTest';
import ButtonCreateGroup from './ButtonCreateGroup';
import InputSearch from './InputSearch';
import { editGroup, addGroup, deleteGroup } from '../Services/Actions/actions';
import API from '../../../../../Services/API';

class TableGroupsList extends React.Component {
  static propTypes = {
    handleGroupAdd: PropTypes.func.isRequired,
    handleGroupDelete: PropTypes.func.isRequired,
    // getData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // const { getData } = this.props;
    // getData('topics');
  }

  render() {
    const { handleGroupAdd, handleGroupDelete } = this.props;
    const columns = [{
      title: ' ',
      dataIndex: 'name',
      key: 'name',
      width: 350,
      render(text) {
        return (
          <Link className="link-name-group" to="/groupstudentslist">{text}</Link>
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
      render(text, record) {
        return (
          <div className="buttons-group-table">
            <div className="parent-button-edit-group"><ButtonEditGroup/></div>
            <div className="parent-button-assign-test"><ButtonAssignTest/></div>
            <div className="parent-button-assign-task"><ButtonAssignTask/></div>
            <div className="parent-button-delete-group">
              <ButtonDeleteGroup
                onGroupDelete={handleGroupDelete}
                data={record.key}
              />
            </div>
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
    columns[3].title = <ButtonCreateGroup onAddGroup={handleGroupAdd}/>;
    return (
      <Table
        columns={columns}
        dataSource={data}
      />
    );
  }
}

function mapStateToProps(state) {
  return { students: state.groupStudentsList.group };
}

const mapDispatchToProps = dispatch => ({
  handleGroupAdd: (group) => {
    dispatch(addGroup(group));
  },
  handleGroupEdit: (group) => {
    dispatch(editGroup(group));
  },
  handleGroupDelete: (key) => {
    dispatch(deleteGroup(key));
  },
  getData: (url) => {
    dispatch(API.get(url, 'allgroups')); // !!!!
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableGroupsList);
