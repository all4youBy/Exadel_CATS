import React from 'react';
import './ActivityList.scss';
import { List, Avatar } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dataUsers, getUsers, upDataListUsers } from '../Services/Actions/actions';
import Loading from '../../../../Components/Loading';

class ActivityList extends React.PureComponent {
  static propTypes = {
    upDateUser: PropTypes.func.isRequired,
    upDate: PropTypes.func.isRequired,
    emptyList: PropTypes.bool.isRequired,
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
    const type = 'TASK_FINISHED';
    const listUsers = (
      <div>
        <div className="header">Активность пользователей</div>
        <List
          className="list-users"
          pagination={{
            pageSize: 5,
          }}
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item) => {
            let list = null;
            switch (type) {
              case 'USER_REGISTERED': {
                list = (
                  <List.Item>
                    <List.Item.Meta
                      className="user"
                      avatar={<Avatar className="avatar" size="large" icon="user"/>}
                      title={<a href=" ">Пользователь {item.lastName} {item.firstName} зарегистрировался на сайте</a>}
                    />
                  </List.Item>
                );
                break;
              }
              case 'TRAINING_TEST_STARTED': {
                list = (
                  <List.Item>
                    <List.Item.Meta
                      className="user"
                      avatar={<Avatar className="avatar" size="large" icon="profile"/>}
                      title={<a href=" ">Пользователь {item.lastName} {item.firstName} начал тренировочный тест</a>}
                      description={<div>Темы: </div>}
                    />
                  </List.Item>
                );
                break;
              }
              case 'TRAINING_TEST_SUBMITTED': {
                list = (
                  <List.Item>
                    <List.Item.Meta
                      className="user"
                      avatar={<Avatar className="avatar" size="large" icon="profile"/>}
                      title={<a href=" ">Пользователь {item.lastName} {item.firstName} завершил тренировочный тест</a>}
                      description={(
                        <div>
                          <div>Отметка:</div>
                          <div>Темы:</div>
                        </div>
                      )}
                    />
                  </List.Item>
                );
                break;
              }
              case 'CONTROL_TEST_ASSIGNED': {
                list = (
                  <List.Item>
                    <List.Item.Meta
                      className="user"
                      avatar={<Avatar className="avatar" size="large" icon="profile"/>}
                      title={<a href=" ">Пользователю {item.lastName} {item.firstName} назначен контрольный тест</a>}
                      description={(
                        <div>Темы:</div>
                      )}
                    />
                  </List.Item>
                );
                break;
              }
              case 'CONTROL_TEST_CHECK_NEEDED': {
                list = (
                  <List.Item>
                    <List.Item.Meta
                      className="user"
                      avatar={<Avatar className="avatar" size="large" icon="profile"/>}
                      title={<a href=" ">Пользователь {item.lastName} {item.firstName} завершил контрольный тест</a>}
                      description={(
                        <div>Ожидается проверка</div>
                      )}
                    />
                  </List.Item>
                );
                break;
              }
              case 'CONTROL_TEST_SUBMITTED': {
                list = (
                  <List.Item>
                    <List.Item.Meta
                      className="user"
                      avatar={<Avatar className="avatar" size="large" icon="profile"/>}
                      title={<a href=" ">Контрольный тест пользователя {item.lastName} {item.firstName} получил оценку [mark]</a>}
                      description={(
                        <div>По теме:</div>
                      )}
                    />
                  </List.Item>
                );
                break;
              }
              case 'TASK_ASSIGNED': {
                list = (
                  <List.Item>
                    <List.Item.Meta
                      className="user"
                      avatar={<Avatar className="avatar" size="large" icon="file"/>}
                      title={<a href=" ">Пользователь {item.lastName} {item.firstName} назначена задача [text]</a>}
                    />
                  </List.Item>
                );
                break;
              }
              case 'TASK_FINISHED': {
                list = (
                  <List.Item>
                    <List.Item.Meta
                      className="user"
                      avatar={<Avatar className="avatar" size="large" icon="file"/>}
                      title={<a href=" ">Пользователь {item.lastName} {item.firstName} отправил задачу</a>}
                      description={(
                        <div>
                          <div>Задача:</div>
                          <div>Отметка:</div>
                        </div>
                      )}
                    />
                  </List.Item>
                );
                break;
              }
              default:
                list = null;
            }
            return <div>{list}</div>;
          }
          }
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

export default connect(mapState, mapDispatch)(ActivityList);
