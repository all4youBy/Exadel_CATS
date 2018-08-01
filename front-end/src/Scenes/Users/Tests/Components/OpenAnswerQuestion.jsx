import React from 'react';
import 'antd/dist/antd.css';
import './OpenAnswerQuestion.scss';
import { Input, Card } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

export default class OpenAnswersQuestion extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    answer: PropTypes.arrayOf().isRequired,
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  onChange = (e) => {
    const { answer, value, index } = this.props;
    answer[index] = {
      answer: e.target.value,
      questionId: value,
    };
    console.log(answer);
  };

  render() {
    const { text } = this.props;
    return (
      <Card className="open-answer-question-card">
        <p className="question-text">{text}</p>
        <TextArea className="text-area-answer" placeholder="Введите ответ" autosize={{ minRows: 5 }} onBlur={this.onChange}/>
      </Card>
    );
  }
}
