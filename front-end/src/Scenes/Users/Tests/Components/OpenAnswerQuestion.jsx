import React from 'react';
import 'antd/dist/antd.css';
import './OpenAnswerQuestion.scss';
import { Input, Card, Button } from 'antd';

const { TextArea } = Input;

export default class OpenAnswersQuestion extends React.PureComponent {
  render() {
    return (
      <Card className="open-a-q-card">
        <p>Вопрос с открытым ответом</p>
        <TextArea className="text-area-answer" placeholder="Введите ответ" />
        <Button className="submit-button">Отправить</Button>
      </Card>
    );
  }
}
