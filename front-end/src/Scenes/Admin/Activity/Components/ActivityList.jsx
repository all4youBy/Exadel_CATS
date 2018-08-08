import React from 'react';
import './ActivityList.scss';
import { List, Avatar } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAllActivity from '../Services/Actions/actions';
import Loading from '../../../../Components/Loading';

// import Loading from '../../../../Components/Loading';

class ActivityList extends React.PureComponent {
  static propTypes = {
    getActivity: PropTypes.func.isRequired,
    activity: PropTypes.arrayOf(PropTypes.any).isRequired,
  };
  // onClickConfirm = (e, idEmail) => {
  //   const { users } = this.state;
  //   const { upDateUser, upDate } = this.props;
  //   upDateUser('users/update-rights',
  //     {
  //       email: users.find(el => el.email === idEmail).email,
  //       role: 'TEACHER',
  //     });
  //   upDate(users, idEmail);// delete
  //   e.preventDefault();
  // };
  //
  // onClickRefuse = (e, idEmail) => {
  //   const { users } = this.state;
  //   const { upDateUser, upDate } = this.props;
  //   upDateUser('users/update-rights',
  //     {
  //       email: users.find(el => el.email === idEmail).email,
  //       role: 'STUDENT',
  //     });
  //   upDate(users, idEmail);// delete
  //   e.preventDefault();
  // };

  componentDidMount() {
    const { getActivity } = this.props;
    getActivity();
  }

  compareDate = (a, b) => (new Date(b.time) - new Date(a.time));

  render() {
    const { activity } = this.props;
    let container = null;
    if (activity) {
      if (activity.length) {
        activity.sort(this.compareDate);
        container = (
          <div>
            <div className="header">Активность пользователей</div>
            <List
              className="list-users"
              pagination={{
                pageSize: 5,
              }}
              itemLayout="horizontal"
              dataSource={activity}
              renderItem={(item) => {
                let list = null;

                switch (item.type) {
                  case 'USER_REGISTERED': {
                    list = (
                      <List.Item.Meta
                        className="user"
                        avatar={<Avatar className="avatar" size="large" icon="user"/>}
                        title={(
                          <div href=" ">Пользователь <span className="name-activity">{item.lastName} {item.firstName}</span> зарегистрировался на сайте
                          </div>
                        )}
                        description={<div/>}
                      />
                    );
                    break;
                  }
                  case 'TRAINING_TEST_STARTED': {
                    list = (
                      <List.Item.Meta
                        className="user"
                        avatar={<Avatar className="avatar" size="large" icon="profile"/>}
                        title={<div href=" ">Пользователь <span className="name-activity">{item.lastName} {item.firstName}</span> начал тренировочный тест</div>}
                        description={<div>Название: {item.text}</div>}
                      />
                    );
                    break;
                  }
                  case 'TRAINING_TEST_SUBMITTED': {
                    const time = item.mark ? <div className="mark-activity">Отметка: {item.mark}</div> : null;
                    list = (
                      <List.Item.Meta
                        className="user"
                        avatar={<Avatar className="avatar" size="large" icon="profile"/>}
                        title={(
                          <div href=" ">Пользователь <span className="name-activity">{item.lastName} {item.firstName}</span> завершил тренировочный тест
                          </div>
                        )}
                        description={(
                          <div>
                            {time}
                            <div>Название: {item.text}</div>
                          </div>
                        )}
                      />
                    );
                    break;
                  }
                  case 'CONTROL_TEST_ASSIGNED': {
                    list = (
                      <List.Item.Meta
                        className="user"
                        avatar={<Avatar className="avatar" size="large" icon="profile"/>}
                        title={(
                          <div href=" ">Пользователю <span className="name-activity">{item.lastName} {item.firstName}</span> назначен контрольный тест
                          </div>
                        )}
                        description={(
                          <div>Название: {item.text}</div>
                        )}
                      />
                    );
                    break;
                  }
                  case 'CONTROL_TEST_CHECK_NEEDED': {
                    list = (
                      <List.Item.Meta
                        className="user"
                        avatar={<Avatar className="avatar" size="large" icon="profile"/>}
                        title={(
                          <div href=" ">Пользователь <span className="name-activity">{item.lastName} {item.firstName}</span> завершил контрольный тест
                          </div>
                        )}
                        description={(
                          <div>
                            <div>Ожидается проверка</div>
                            <div>Название: {item.text}</div>
                          </div>
                        )}
                      />
                    );
                    break;
                  }
                  case 'CONTROL_TEST_SUBMITTED': {
                    list = (
                      <List.Item.Meta
                        className="user"
                        avatar={<Avatar className="avatar" size="large" icon="profile"/>}
                        title={(
                          <div href=" ">Контрольный тест пользователя <span className="name-activity">{item.lastName} {item.firstName}</span> получил оценку {item.mark}
                          </div>
                        )}
                        description={(
                          <div>Название: {item.text}</div>
                        )}
                      />
                    );
                    break;
                  }
                  case 'TASK_ASSIGNED': {
                    list = (
                      <List.Item.Meta
                        className="user"
                        avatar={<Avatar className="avatar" size="large" icon="file"/>}
                        title={<div href=" ">Пользователь <span className="name-activity">{item.lastName} {item.firstName}</span> назначена задача</div>}
                        description={<div>Название: {item.text}</div>}
                      />
                    );
                    break;
                  }
                  case 'TASK_FINISHED': {
                    list = (
                      <List.Item.Meta
                        className="user"
                        avatar={<Avatar className="avatar" size="large" icon="file"/>}
                        title={<div href=" ">Пользователь <span className="name-activity">{item.lastName} {item.firstName}</span> отправил задачу</div>}
                        description={(
                          <div>
                            <div>Отметка: {item.mark}</div>
                            <div>Название: {item.text}</div>
                          </div>
                        )}
                      />
                    );
                    break;
                  }
                  default:
                    list = null;
                }
                return <List.Item>{list}</List.Item>;
              }
              }
            />
          </div>);
      } else {
        container = (<div className="empty-list">Список пуст</div>);
      }
    } else {
      container = <Loading/>;
    }
    // const activity = emptyList && getListUsers ? (<Loading/>)
    //   : <div className="empty-list">Список запросов на статус пуст</div>;
    // const addList = activity.length ? listUsers : stateData;
    return (
      <div className="list-users-request">
        {container}
      </div>
    );
  }
}

function mapState(state) {
  return {
    activity: state.activityPage.activity,
  };
}

function mapDispatch(dispatch) {
  return {
    getActivity: () => {
      dispatch(getAllActivity());
    },
  };
}

export default connect(mapState, mapDispatch)(ActivityList);
