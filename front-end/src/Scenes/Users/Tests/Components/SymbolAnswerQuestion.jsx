import React from 'react';
import 'antd/dist/antd.css';
import './SymbolAnswerQuestion.scss';
import { Input, Card } from 'antd';
import PropTypes from 'prop-types';

export default class SymbolAnswersQuestion extends React.PureComponent {
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
      <Card className="symbol-answer-question-card">
        <p className="question-text">{text}</p>
        <Input className="input-answer" placeholder="Введите ответ" onBlur={this.onChange}/>
      </Card>
    );
  }
}
