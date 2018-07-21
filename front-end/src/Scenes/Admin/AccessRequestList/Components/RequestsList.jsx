import React from 'react';
import './RequestsList.scss';
import { List, Avatar, Button } from 'antd';

const dataUser = [
  {
    login: 'torrallysso-5772@mail.com',
    name: 'Василий',
    surname: 'Иванов',
    university: 'БГУ',
    status: 'учитель',
  },
  {
    login: 'torrallysso-5772@mail.com',
    name: 'Василий',
    surname: 'Иванов',
    university: 'БГУ',
    status: 'администратор',
  },
  {
    login: 'uppypysos-9466@gmail.com',
    name: 'Василий',
    surname: 'Иванов',
    university: 'БГУ',
    status: 'учитель',
  },
  {
    login: 'umodebol-5956@mail.com',
    name: 'Василий',
    surname: 'Иванов',
    university: 'БГУ',
    status: 'учитель',
  },
];
class RequestsList extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="header">Список запросов на доступ</div>
        <List
          itemLayout="horizontal"
          dataSource={dataUser}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar className="avatar" size="large" icon="user"/>}
                title={<a href=" ">{item.login}</a>}
                description={`${item.name} ${item.surname}
                Учебное заведение: ${item.university}
                Запрос на статус: ${item.status}`}
              /><Button className="button-start-test" type="primary">Подтвердить</Button>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default RequestsList;
