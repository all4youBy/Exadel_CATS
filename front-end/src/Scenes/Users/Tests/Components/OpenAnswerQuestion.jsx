import React from 'react';
import 'antd/dist/antd.css';
import './OpenAnswerQuestion.scss';
import { Input, Card, Button } from 'antd';

const { TextArea } = Input;

export default class OpenAnswersQuestion extends React.PureComponent {
  render() {
    return (
      <Card className="open-aq-card">
        <div>Вопрос с открытым ответом</div>
        <TextArea className="text-area-answer" placeholder="Введите ответ" />
        <Button>Отправить</Button>
      </Card>
    );
  }
}
