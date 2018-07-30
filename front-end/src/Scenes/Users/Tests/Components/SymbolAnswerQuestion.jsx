import React from 'react';
import 'antd/dist/antd.css';
import './SymbolAnswerQuestion.scss';
import { Input, Card } from 'antd';

export default class SymbolAnswersQuestion extends React.PureComponent {
  render() {
    return (
      <Card className="symbol-answer-question-card">
        <p className="question-text">Вопрос ответом в виде символов</p>
        <Input className="input-answer" placeholder="Введите ответ"/>
      </Card>
    );
  }
}
