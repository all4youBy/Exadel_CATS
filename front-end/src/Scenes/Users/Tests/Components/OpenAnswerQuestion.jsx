import React from 'react';
import 'antd/dist/antd.css';
import './OpenAnswerQuestion.scss';
import { Input, Card } from 'antd';

const { TextArea } = Input;

export default class OpenAnswersQuestion extends React.PureComponent {
  render() {
    return (
      <Card className="open-answer-question-card">
        <p className="question-text">Вопрос с открытым ответом</p>
        <TextArea className="text-area-answer" placeholder="Введите ответ" autosize={{ minRows: 5 }}/>
      </Card>
    );
  }
}
