import React from 'react';
import 'antd/dist/antd.css';
import './SymbolAnswerQuestion.scss';
import { Input, Card } from 'antd';
import PropTypes from 'prop-types';

export default class SymbolAnswersQuestion extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    const { text } = this.props;
    return (
      <Card className="symbol-answer-question-card">
        <p className="question-text">{text}</p>
        <Input className="input-answer" placeholder="Введите ответ"/>
      </Card>
    );
  }
}
