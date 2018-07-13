import React from 'react';
import 'antd/dist/antd.css';
import './SymbolAnswerQuestion.scss';
import { Input, Card, Button } from 'antd';

export default class SymbolAnswersQuestion extends React.PureComponent {
  render() {
    return (
      <Card className="symbol-a-q-card">
        <p>Вопрос ответом в виде символов</p>
        <Input className="input-answer" placeholder="Введите ответ" />
        <Button>Отправить</Button>
      </Card>
    );
  }
}
