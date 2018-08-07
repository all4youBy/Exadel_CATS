import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './TablePassedTasks.scss';
import { Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import requestLoginInformation from '../../../../../Services/loginService';
import Loading from '../../../../../Components/Loading';

class TablePassedTasks extends React.PureComponent {
  static propTypes = {
    getPassedTasks: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf.isRequired,
    error: PropTypes.string.isRequired,
  };

  state = {
    bordered: false,
    loading: false,
    pagination: { position: 'bottom' },
    size: 'middle',
    title: undefined,
    showHeader: true,
  };

  componentDidMount() {
    const { getPassedTasks } = this.props;
    getPassedTasks(requestLoginInformation().email);
  }

  render() {
    const { tasks, error } = this.props;
    const { bordered, loading, pagination, size, title, showHeader } = this.state;

    if (error) {
      return <div/>;
    }

    const columns = [{
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: 350,
      className: 'column-break-point',
      render(text, record) {
        return (
          <Link to={`/groupstudentslist/${record.key}`}>{text}</Link>
        );
      },
    }, {
      title: 'Тема',
      dataIndex: 'theme',
      key: 'theme',
      width: 500,
      className: 'column-break-point',
    }, {
      title: 'Автор',
      dataIndex: 'author',
      key: 'author',
      width: 500,
      className: 'column-break-point',
    }, {
      title: 'Дата выполнения',
      dataIndex: 'date',
      key: 'date',
      width: 800,
      className: 'column-break-point',
    }, {
      title: 'Результат',
      dataIndex: 'result',
      key: 'result',
      width: 250,
      className: 'column-break-point',
    },
    ];

    let tags = ['aaaa', 'ssss', 'ffff'];

    tags = tags.map(element => <Tag color="blue">{element}</Tag>);


    const data = [];
    for (let i = 1; i <= 10; i += 1) {
      data.push({
        key: `${i}`,
        name: `Задание ${i}`,
        theme: tags,
        author: `Автор ${i}`,
        date: `${i}.${i}.1999`,
        result: `${i}`,
        comment: 'Комметарий',
      });
    }
    let container = null;
    if (tasks) {
      if (tasks.length) {
        container = (
          <Table
            {...{
              bordered,
              loading,
              pagination,
              size,
              title,
              showHeader,
            }}
            columns={columns}
            dataSource={data}
            rowClassName={() => 'abc'}
          />);
      } else {
        container = (<div className="empty-list">Список пуст</div>);
      }
    } else {
      container = <Loading/>;
    }
    return (
      <div><div className="header-for-table"><span className="header">Пройденные задачи</span></div>
        {container}
      </div>
    );
  }
}

//
// <Table
//   columns={columns}
//   // expandedRowRender={record => (
//   //   <p>{record.comment}</p>
//   // )}
//   dataSource={data}
// />
export default TablePassedTasks;
