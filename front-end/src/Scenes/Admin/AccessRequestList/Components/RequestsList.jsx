import React from 'react';
import './RequestsList.scss';
import { List, Avatar, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dataUsers, getUsers, upDataListUsers } from '../Services/Actions/actions';
import Loading from '../../../../Components/Loading';
import { fetchQuestionsToCheck } from '../../../Teachers/Tests/ListCheckTests/Services/Actions/actions';

class RequestsList extends React.PureComponent {
  static propTypes = {
    upDateUser: PropTypes.func.isRequired,
    upDate: PropTypes.func.isRequired,
    emptyList: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
    getQuestions: PropTypes.func.isRequired,
  };

  state = {
    users: [],
    getListUsers: false,
  };

  componentDidMount() {
    const { getQuestions, user } = this.props;
    getQuestions(user);
  }

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
    if ((nextProps.users !== nextState.users && nextProps.emptyList && !nextState.getListUsers)) {
      nextProps.getDataUsers('users/confirm-users');
    }
    return {
      getListUsers: true,
      users: nextProps.users,
    };
  }

  render() {
    const { users, getListUsers } = this.state;
    const { emptyList } = this.props;
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
    const stateData = emptyList && getListUsers ? (<Loading/>)
      : <div className="empty-list">Список запросов на статус пуст</div>;
    const addList = users.length ? listUsers : stateData;
    return (
      <div className="list-users-request">
        {addList}
      </div>
    );
  }
}

function mapState(state) {
  return {
    users: state.requestsUsers.users,
    emptyList: state.requestsUsers.emptyList,
    user: state.logInInformation.user.email,
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
    getQuestions: (email) => {
      dispatch(fetchQuestionsToCheck(email));
    },
  };
}

export default connect(mapState, mapDispatch)(RequestsList);
