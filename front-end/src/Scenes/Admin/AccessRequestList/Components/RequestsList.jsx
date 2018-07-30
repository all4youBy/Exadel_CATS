import React from 'react';
import './RequestsList.scss';
import { List, Avatar, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dataUsers, getUsers, upDataListUsers } from '../Services/Actions/actions';

class RequestsList extends React.PureComponent {
  static propTypes = {
    upDateUser: PropTypes.func.isRequired,
    upDate: PropTypes.func.isRequired,
  };

  state = {
    users: [],
    getListUsers: false,
  };

  onClickConfirm = (e, idEmail) => {
    const { users } = this.state;
    const { upDateUser, upDate } = this.props;
    upDateUser('users/update-rights',
      {
        email: users.find(el => el.email === idEmail).email,
        role: 'TEACHER',
      });
    upDate(users, idEmail);// delete
    e.preventDefault();
  };

  onClickRefuse = (e, idEmail) => {
    const { users } = this.state;
    const { upDateUser, upDate } = this.props;
    upDateUser('users/update-rights',
      {
        email: users.find(el => el.email === idEmail).email,
        role: 'STUDENT',
      });
    upDate(users, idEmail);// delete
    e.preventDefault();
  };

  static getDerivedStateFromProps(nextProps, nextState) {
    if ((nextProps.users !== nextState.users)
      && !nextProps.users.length && !nextState.getListUsers) {
      nextProps.getDataUsers('users/confirm-users');
    } else if (!nextProps.users.length && !nextState.getListUsers) {
      return {
        getListUsers: true,
      };
    } else if (nextProps.users.length && !nextState.getListUsers) {
      return {
        users: nextProps.users,
        getListUsers: true,
      };
    }
    return {
      users: nextProps.users,
    };
  }

  render() {
    const { users, getListUsers } = this.state;
    const listUsers = (
      <div>
        <div className="header">Список запросов на статус преподавателя</div>
        <List
          className="list-users"
          pagination={{
            pageSize: 5,
          }}
          itemLayout="horizontal"
          dataSource={users}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                className="user"
                avatar={<Avatar className="avatar" size="large" icon="user"/>}
                title={<a href=" ">{item.email}</a>}
                description={`${item.lastName} ${item.firstName}`}
              />
              <Button
                onClick={e => this.onClickConfirm(e, item.email)}
                className="button-confirm"
                type="primary"
              >Подтвердить
              </Button>
              <Button
                onClick={e => this.onClickRefuse(e, item.email)}
                className="button-refuse"
                type="primary"
              >Отказать
              </Button>
            </List.Item>
          )}
        />
      </div>
    );
    const stateData = !(getListUsers && !users.length) ? (<div className="load"><Icon type="loading"/></div>)
      : <div className="empty-list">Список запросов пуст</div>;
    const addList = users.length ? listUsers : stateData;
    return (
      <div>
        {addList}
      </div>
    );
  }
}

function mapState(state) {
  return {
    users: state.requestsUsers.users,
  };
}

function mapDispatch(dispatch) {
  return {
    getDataUsers: (url) => {
      dispatch(getUsers(url));
    },
    upDateUser: (url, data) => {
      dispatch(upDataListUsers(url, data));
    },
    upDate: (users, idEmail) => {
      const newList = users.filter(el => el.email !== idEmail);
      dispatch(dataUsers(newList));
    },
  };
}

export default connect(mapState, mapDispatch)(RequestsList);
