import React from 'react';
import { List, Button, Tag } from 'antd';
import './ListCheckTests.scss';
import Link from 'react-router-dom/es/Link';

let tags = ['aaaa', 'ssss', 'ffff'];

tags = tags.map(element => <Tag color="blue">{element}</Tag>);

const listData = [];
for (let i = 0; i < 15; i += 1) {
  listData.push({
    href: 'http://ant.design',
    title: `Тест ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Плюшкин Иван Васильевич',
  });
}

class ListCheckTests extends React.Component {
  render() {
    return (
      <List
        className="list-check-tests"
        size="large"
        pagination={{
          pageSize: 5,
        }}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item.title}
            className="check-test-list"
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={(

                <div className="description">
                  <div>{tags}</div>
                  <div className="student-information">{item.name}</div>
                  <Button className="button-check-test-list" icon="form">
                    <Link className="link-check-test-list" to="/checktest"> Проверить </Link>
                  </Button>
                </div>
              )}
              className="test-description"
            />
            <div className="test-information">
              <div>
                Количество вопросов: 10
              </div>
              <div>
                Время выполнения: 10:00
              </div>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

export default ListCheckTests;
