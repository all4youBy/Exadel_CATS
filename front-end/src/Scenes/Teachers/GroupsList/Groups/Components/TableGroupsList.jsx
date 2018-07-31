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
import { addGroup, deleteGroup, fetchGroups } from '../Services/Actions/actions';
import Loading from '../../../../../Components/Loading';

class TableGroupsList extends React.Component {
  static propTypes = {
    handleGroupAdd: PropTypes.func.isRequired,
    handleGroupDelete: PropTypes.func.isRequired,
    getGroups: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    groups: PropTypes.arrayOf.isRequired,
  };

  componentDidMount() {
    const { getGroups } = this.props;
    getGroups();
  }

  render() {
    const { handleGroupAdd, handleGroupDelete, error, groups } = this.props;
    if (error) {
      message.error(error);
      return <Loading/>;
    }
    const columns = [{
      title: ' ',
      dataIndex: 'name',
      key: 'name',
      width: 800,
      render(text) {
        return (
          <Link className="link-name-group" to={`/groups/${text}`} >{text}</Link>
        );
      },
    }, {
      title: ' ',
      dataIndex: 'button',
      key: 'button',
      width: 100,
      render(text, record) {
        return (
          <div className="buttons-group-table">
            <div className="parent-button-edit-group"><ButtonEditGroup/></div>
            <div className="parent-button-assign-test"><ButtonAssignTest groupName={record.name}/></div>
            <div className="parent-button-assign-task"><ButtonAssignTask/></div>
            <div className="parent-button-delete-group">
              <ButtonDeleteGroup
                onGroupDelete={handleGroupDelete}
                data={record.name}
              />
            </div>
          </div>
        );
      },
    },
    ];

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
    columns[1].title = <ButtonCreateGroup onAddGroup={handleGroupAdd}/>;
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
  handleGroupDelete: (key) => {
    dispatch(deleteGroup(key));
  },
  getGroups: () => {
    dispatch(fetchGroups());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableGroupsList);
