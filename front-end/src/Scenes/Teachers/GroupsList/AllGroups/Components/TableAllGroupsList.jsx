import React from 'react';
import { Link } from 'react-router-dom';
import './TableAllGroupsList.scss';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonEditGroup from './ButtonEditGroup';
import ButtonAssignTask from '../../../../../Components/ButtonAssignTask';
import ButtonDeleteGroup from './ButtonDeleteGroup';
import ButtonAssignTest from '../../../../../Components/ButtonAssignTest';
// import InputSearch from './InputSearch';
import { deleteGroup, getAllGroups } from '../Services/Actions/actions';
import Loading from '../../../../../Components/Loading';
import { receiveTest } from '../../../Tests/AssignTest/Services/Actions/actions';
import { receiveTask } from '../../../Tasks/AssignTask/Services/Actions/actions';

class TableAllGroupsList extends React.PureComponent {
  static propTypes = {
    handleGroupDelete: PropTypes.func.isRequired,
    upDate: PropTypes.func.isRequired,
    // emptyList: PropTypes.bool.isRequired,
    addGroupTest: PropTypes.func.isRequired,
    addGroupTask: PropTypes.func.isRequired,
    userStatus: PropTypes.string.isRequired,
  };

  state = {
    groups: [],
    getListUsers: false,
  };

  static getDerivedStateFromProps(nextProps, nextState) {
    if ((nextProps.groups !== nextState.groups && nextProps.emptyList && !nextState.getListUsers)) {
      nextProps.getGroups();
    }
    return {
      getListUsers: true,
      groups: nextProps.groups,
    };
  }

  render() {
    const { groups } = this.state;
    const {
      handleGroupDelete, upDate, addGroupTask,
      addGroupTest, userStatus,
    } = this.props;
    const columns = [{
      title: ' ',
      dataIndex: 'name',
      key: 'name',
      width: 1000,
      render(text) {
        const nameGroup = (<Link className="link-name-group" to={`/groups/${text}`}>{text}</Link>);
        return (
          <div>{nameGroup}</div>);
      },
    }, {
      title: ' ',
      dataIndex: 'button',
      key: 'button',
      // width: 100,
      render(text, record) {
        if (userStatus === 'ADMIN') {
          return (
            <div className="buttons-group-table">
              <div className="parent-button-edit-group"><ButtonEditGroup/></div>
              <div className="parent-button-assign-test"><ButtonAssignTest
                addGroup={addGroupTest}
                groupName={record.name}
              />
              </div>
              <div className="parent-button-assign-task"><ButtonAssignTask
                addGroup={addGroupTask}
                groupName={record.name}
              />
              </div>
              <div className="parent-button-delete-group">
                <ButtonDeleteGroup
                  onGroupDelete={handleGroupDelete}
                  data={record.name}
                  upDate={upDate}
                  groups={groups}
                />
              </div>
            </div>
          );
        }
        return <div/>;
      },
    },
    ];

    const data = [];
    for (let i = groups.length - 1; i >= 0; i -= 1) {
      data.push({
        key: i,
        name: groups[i],
      });
    }
    columns[0].title = <div className="header">Список групп</div>;
    // <InputSearch/>
    let container = null;
    if (groups) {
      if (groups.length) {
        container = (
          <Table
            className="table-groups"
            columns={columns}
            dataSource={data}
          />);
      } else {
        container = (<div className="empty-list">Список пуст</div>);
      }
    } else {
      container = <Loading/>;
    }
    return (
      <div className="groups-list">
        {container}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.allGroups.groups,
    error: state.allGroups.error,
    userStatus: state.logInInformation.user.status,
    emptyList: state.allGroups.emptyList,
  };
}

const mapDispatchToProps = dispatch => ({
  handleGroupDelete: (obj) => {
    dispatch(deleteGroup(obj));
  },
  getGroups: (userId) => {
    dispatch(getAllGroups(userId));
  },
  addGroupTest: (group) => {
    dispatch(receiveTest(group, 'GROUPS'));
  },
  addGroupTask: (group) => {
    dispatch(receiveTask(group, 'GROUPS'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableAllGroupsList);
