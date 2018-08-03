import React from 'react';
import 'antd/dist/antd.css';
import './SymbolAnswerQuestion.scss';
import { Input, Card } from 'antd';
import PropTypes from 'prop-types';

export default class SymbolAnswersQuestion extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    answer: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    testId: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    const { answer, value, index, testId } = this.props;
    answer[index] = {
      answer: e.target.value,
      questionId: value,
      testId,
    };
    console.log(answer);
  };

  handleOnBlur = () => {
    const { submit, answer, index } = this.props;
    submit(answer[index]);
  };

  render() {
    const { text } = this.props;
    return (
      <Card className="symbol-answer-question-card" onBlur={this.handleOnBlur}>
        <p className="question-text">{text}</p>
        <Input className="input-answer" placeholder="Введите ответ" onBlur={this.onChange}/>
      </Card>
    );
  }
}
