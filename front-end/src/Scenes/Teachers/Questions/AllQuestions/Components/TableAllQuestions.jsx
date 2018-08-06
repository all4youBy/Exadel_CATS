import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { Table } from 'antd';
// import ButtonEditTask from './ButtonEditTask';
// import Loading from '../../../../../Components/Loading';
// import requestLoginInformation from '../../../../../Services/loginService';

class TableAllQuestions extends React.PureComponent {
  static propTypes = {
    // questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    // error: PropTypes.string.isRequired,
    // getQuestions: PropTypes.func.isRequired,
  };

  // state = {
  //   bordered: false,
  //   loading: false,
  //   pagination: { position: 'bottom' },
  //   size: 'middle',
  //   title: undefined,
  //   showHeader: true,
  // };
  //
  // componentDidMount() {
  //   const { getQuestions } = this.props;
  //   getQuestions();
  // }

  render() {
    // const { bordered, loading, pagination, size, title, showHeader } = this.state;
    // const { questions } = this.props;
    // const data = [];
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
    //
    //
    // for (let i = 0; i < questions.length; i += 1) {
    //   const tags = [];
    //   // if (questions[i].topicIds.length > 3) {
    //   //   for (let index = 0; index < 3; index += 1) {
    //   //     tags[index] = <Tag color="blue">{questions[i].topics[index]}</Tag>;
    //   //   }
    //   // } else {
    //   //   tags = questions[i].topics.map(element => (<Tag color="blue">{element}</Tag>));
    //   // }
    //   const question = questions[i];
    //   data.push({
    //     key: `${i}`,
    //     author: question.author,
    //     level: question.complexity,
    //     text: question.text,
    //     topics: tags,
    //   });
    // }
    //
    // data.sort((a, b) => (
    //   b.formDate - a.formDate
    // ));
    // const content = questions.length ? (<div/>) : <Loading/>;
    return (
      <div/>
    );
  }
}

export default TableAllQuestions;
