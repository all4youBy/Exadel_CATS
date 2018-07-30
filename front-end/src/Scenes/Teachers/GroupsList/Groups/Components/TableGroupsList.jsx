import React from 'react';
import { Link } from 'react-router-dom';
import './TableGroupsList.scss';
import { message, Table } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonEditGroup from './ButtonEditGroup';
import ButtonAssignTask from '../../../../../Components/ButtonAssignTask';
import ButtonDeleteGroup from './ButtonDeleteGroup';
import ButtonAssignTest from '../../../../../Components/ButtonAssignTest';
import ButtonCreateGroup from './ButtonCreateGroup';
import InputSearch from './InputSearch';
import { editGroup, addGroup, deleteGroup, fetchGroups } from '../Services/Actions/actions';

class TableGroupsList extends React.Component {
  static propTypes = {
    handleGroupAdd: PropTypes.func.isRequired,
    handleGroupDelete: PropTypes.func.isRequired,
    getGroups: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    groups: PropTypes.arrayOf.isRequired,
  };

  componentDidMount() {
    const { getGroups } = this.props;
    getGroups();
  }

  render() {
    const { handleGroupAdd, handleGroupDelete, error, groups } = this.props;
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

    console.log(groups, 733);
    const data = [];
    for (let i = 0; i < groups.length; i += 1) {
      data.push({
        key: `${i}`,
        name: groups[i],
        course: `Курс ${i}`,
        date: '17/18 год',
      });
    }
    columns[0].title = <InputSearch/>;
    columns[3].title = <ButtonCreateGroup onAddGroup={handleGroupAdd}/>;
    if (error) {
      message.error('Не удалось загрузить список студентов');
      return <div/>;
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.allGroups.groups,
    error: state.allGroups.error,
  };
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
  getGroups: () => {
    dispatch(fetchGroups()); // !!!!
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableGroupsList);
