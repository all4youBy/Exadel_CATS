import React from 'react';
import './TableAllTasks.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Tag } from 'antd';
import Loading from '../../../../../Components/Loading';
import SearchTasks from './SearchTasks';
import './SearchTasks.scss';

class TableAllTasks extends React.Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string.isRequired,
    getTasks: PropTypes.func.isRequired,
  };

  state = {
    bordered: false,
    loading: false,
    pagination: { position: 'bottom' },
    size: 'middle',
    title: undefined,
    showHeader: true,
    nameSearch: '',
    tagsSearch: [],
  };

  componentDidMount() {
    const { getTasks } = this.props;
    getTasks();
  }

  inputNameForFilter = value => this.setState({
    nameSearch: value,
  });

  inputFiltersSearch = value => this.setState(prev => (prev.tagsSearch.indexOf(value) === -1
    ? { tagsSearch: [...prev.tagsSearch, value] }
    : {}));

  deleteElementFiltersSearch = (event) => {
    const text = event.target.closest('.ant-tag, .ant-tag a, .ant-tag a:hover').innerText;
    this.setState((prevState) => {
      const arrayTags = prevState.tagsSearch;
      arrayTags.splice(arrayTags.indexOf(text), 1);
      return {
        tagsSearch: arrayTags,
      };
    });
  };


  render() {
    const {
      bordered,
      loading,
      pagination,
      size,
      title,
      showHeader,
      nameSearch,
      tagsSearch,
    } = this.state;
    const { tasks } = this.props;
    const data = [];
    // const arrMonth = [
    //   'Январь',
    //   'Февраль',
    //   'Март',
    //   'Апрель',
    //   'Май',
    //   'Июнь',
    //   'Июль',
    //   'Август',
    //   'Сентябрь',
    //   'Ноябрь',
    //   'Декабрь',
    // ];


    const columns = [{
      title: 'Дата создания',
      dataIndex: 'day',
      key: 'dat',
      width: 70,
      className: 'column-break-point',
      render: (text, record) => (
        <div className="all-tasks-time">
          <div className="all-tasks-date-day">{record.day}</div>
          <div className="all-tasks-date-month">{record.month}</div>
          <div className="all-tasks-date-year">{record.year}</div>
        </div>
      ),
    }, {
      title: 'Название',
      dataIndex: 'taskName',
      key: 'taskName',
      width: 250,
      className: 'column-break-point',
      render: (text, record) => {
        const link = `/viewtask/${record.id}`;
        return (
          <div className="all-tasks-title">
            <Link className="link-name-group" to={link}>{record.taskName}</Link>
            <div className="all-tasks-author">{record.author}</div>
          </div>);
      },
    }, {
      title: 'Тема',
      dataIndex: 'theme',
      key: 'theme',
      width: 800,
      className: 'column-break-point',
    }, {
      title: ' ',
      dataIndex: 'button',
      key: 'button',
      width: 200,
      className: 'column-break-point',
      render: () => (<div/>),
    }];

    for (let i = 0; i < tasks.length; i += 1) {
      const date = tasks[i].dateCreation;
      console.log(date, 74342);
      let tags = [];
      if (tasks[i].topics.length > 3) {
        for (let index = 0; index < 3; index += 1) {
          tags[index] = (
            <Tag
              color="blue"
              onClick={(event) => {
                this.inputFiltersSearch(event.target.innerHTML);
              }}
            >{tasks[i].topics[index]}
            </Tag>
          );
        }
      } else {
        tags = tasks[i].topics.map(element => (
          <Tag
            color="blue"
            onClick={(event) => {
              this.inputFiltersSearch(event.target.innerHTML);
            }}
          >{element}
          </Tag>
        ));
      }

      data.push({
        key: `${i}`,
        author: `${tasks[i].firstName} ${tasks[i].lastName}`,
        theme: tags,
        taskName: tasks[i].title,
        // day: date.getDate(),
        // month: arrMonth[date.getMonth()],
        // year: date.getFullYear(),
        button: tasks[i].email,
        formDate: date,
        id: tasks[i].id,
      });
    }

    const newData = data.filter((element, index) => (
      (element.author.toLowerCase().indexOf(nameSearch.toLowerCase()) !== -1
        || element.taskName.toLowerCase().indexOf(nameSearch.toLowerCase()) !== -1)
      && tasks[index].topics.length !== 0
      && tagsSearch.every(tag => tasks[index].topics.includes(tag))
    ));
    newData.sort((a, b) => (
      b.formDate - a.formDate
    ));

    const filteredTags = tagsSearch.map(element => (
      <Tag onClick={this.deleteElementFiltersSearch}>{element}</Tag>
    ));

    columns[2].title = filteredTags;
    columns[3].title = (
      <div>
        <SearchTasks className="search-tasks" fillDataFilterFields={this.inputNameForFilter}/>
      </div>);
    const content = tasks.length ? (
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
        dataSource={newData}
      />) : <Loading/>;
    return (
      <div>
        <div className="header-for-table"><span className="header-tasks">Список задач</span></div>
        {content}
      </div>
    );
  }
}

export default TableAllTasks;
