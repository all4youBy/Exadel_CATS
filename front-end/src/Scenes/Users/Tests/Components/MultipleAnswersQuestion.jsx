import React from 'react';
import 'antd/dist/antd.css';
import './MultipleAnswersQuestion.scss';
import { Checkbox, Card } from 'antd';

const { Group } = Checkbox;
const plainOptions = ['Ответ 1', 'Ответ 2', 'Ответ 3', 'Ответ 4'];


export default class MultipleAnswersQuestion extends React.PureComponent {
  render() {
    return (
      <Card className="multiple-answers-question-card">
        <p className="question-text">
          Вопрос с несколькими вариантами ответа
        </p>
        <Group
          className="check-box-group"
          options={plainOptions}
        />
      </Card>
    );
  }
}
