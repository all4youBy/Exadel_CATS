/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import './TableGroupsList.scss';
import { Table, Input, Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonEditGroup from './ButtonEditGroup';
import ButtonAssignTask from '../../../../../Components/ButtonAssignTask';
import ButtonDeleteGroup from './ButtonDeleteGroup';
import ButtonAssignTest from '../../../../../Components/ButtonAssignTest';
import {
  deleteGroup,
  getMyGroups,
  listGroup,
  nameGroup,
  renameGroup, renameNameGroup, getNameGroup, getTasksForGroup,
} from '../Services/Actions/actions';
import Loading from '../../../../../Components/Loading';
import { receiveTest } from '../../../Tests/AssignTest/Services/Actions/actions';
import { receiveTask } from '../../../Tasks/AssignTask/Services/Actions/actions';
import InputSearch from '../../AllGroups/Components/InputSearch';
import { getError } from '../../../../../Main/Services/Actions/actions';

class TableGroupsList extends React.PureComponent {
  static propTypes = {
    handleGroupDelete: PropTypes.func.isRequired,
    upDate: PropTypes.func.isRequired,
    addGroupTest: PropTypes.func.isRequired,
    addGroupTask: PropTypes.func.isRequired,
    groupEdit: PropTypes.string.isRequired,
    onGroupEdit: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
    getGroup: PropTypes.func.isRequired,
    pageError: PropTypes.func.isRequired,
  };

  state = {
    groups: [],
    getListUsers: false,
    inputFilter: '',
  };

  static getDerivedStateFromProps(nextProps, nextState) {
    if ((nextProps.groups !== nextState.groups && nextProps.emptyList && !nextState.getListUsers)) {
      nextProps.getGroups(nextProps.user);
    }
    return {
      getListUsers: true,
      groups: nextProps.groups,
    };
  }

  filterList = (value) => {
    this.setState({
      inputFilter: value,
    });
  };


  render() {
    const { groups, inputFilter } = this.state;
    const {
      handleGroupDelete, upDate, addGroupTask,
      addGroupTest, groupEdit, onGroupEdit, onEdit, user, getGroup, pageError,
    } = this.props;
    pageError(false);
    const columns = [{
      title: ' ',
      dataIndex: 'name',
      key: 'name',
      width: 1000,
      render(text, record) {
        const editName = (name) => {
          onEdit(record.name, name, user);
        };
        const getMyGroup = (name) => {
          getGroup(name);
        };
        const setField = (event) => {
          const { value } = event.target;
          text = value;
        };
        if (text === groupEdit) {
          return (
            <div><Input
              maxLength={40}
              name="newName"
              type="text"
              className="edit-name-group"
              defaultValue={groupEdit}
              onBlur={event => setField(event)}
            />
              <Tooltip placement="top" title="Готово">
                <Button
                  shape="circle"
                  icon="check"
                  className="button-edit"
                  size="small"
                  onClick={() => editName(text)}
                />
              </Tooltip>
            </div>);
        }
        return (
          <div><Link onClick={() => getMyGroup(text)} className="link-name-group" to={`/groups/${text}`}>{text}</Link>
          </div>);
      },
    }, {
      title: ' ',
      dataIndex: 'button',
      key: 'button',
      // width: 100,
      render(text, record) {
        return (
          <div className="buttons-group-table">
            <div className="parent-button-edit-group"><ButtonEditGroup
              groupName={record.name}
              onGroupEdit={onGroupEdit}
            />
            </div>
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
      },
    },
    ];

    const data = [];
    if (groups) {
      for (let i = groups.length - 1; i >= 0; i -= 1) {
        data.push({
          key: i,
          name: groups[i],
        });
      }
    }
    const newData = data.filter(elem => elem.name
      .toLowerCase().indexOf(inputFilter.toLowerCase()) !== -1);
    columns[0].title = (
      <div>
        <InputSearch filterList={this.filterList}/>
        <div className="header">Список моих групп</div>
      </div>);
    // <InputSearch/>
    let container = null;
    if (groups) {
      if (groups.length) {
        container = (
          <Table
            className="table-groups"
            columns={columns}
            dataSource={newData}
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
    groups: state.myGroups.groups,
    groupEdit: state.myGroups.groupEdit,
    error: state.myGroups.error,
    user: state.logInInformation.user.email,
    emptyList: state.myGroups.emptyList,
  };
}

const mapDispatchToProps = dispatch => ({
  handleGroupDelete: (obj) => {
    dispatch(deleteGroup(obj));
  },
  getGroups: (userId) => {
    dispatch(getMyGroups(userId));
  },
  getGroup: (group) => {
    dispatch(getNameGroup(group));
  },
  upDate: (groups, group) => {
    const newList = groups.filter(el => el !== group);
    dispatch(listGroup(newList));
  },
  addGroupTest: (group) => {
    dispatch(receiveTest(group, 'GROUPS'));
  },
  addGroupTask: (group) => {
    dispatch(receiveTask(group, 'GROUPS'));
  },
  onGroupEdit: (group) => {
    dispatch(nameGroup(group));
  },
  onEdit: (last, next, id) => {
    dispatch(renameGroup({ oldGroup: last, newGroup: next, usersId: [id] }));
    dispatch(renameNameGroup({ lastName: last, nextName: next }));
  },
  getTasks: () => {
    dispatch(getTasksForGroup());
  },
  pageError: () => {
    dispatch(getError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableGroupsList);
