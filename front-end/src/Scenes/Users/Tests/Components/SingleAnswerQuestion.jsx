import React from 'react';
import 'antd/dist/antd.css';
import './SingleAnswerQuestion.scss';
import { Radio, Card } from 'antd';

const { Group } = Radio;

export default class SingleAnswerQuestion extends React.PureComponent {
  state = {
    value: 1,
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const radioStyle = {
      display: 'block',
      height: '22px',
      lineHeight: '30px',
    };
    const { value } = this.state;

    return (
      <Card className="single-answer-question-card">
        <p className="question-text">
          Вопрос с одним вариантом ответа
        </p>
        <Group onChange={this.onChange} value={value}>
          <Radio style={radioStyle} value={1}>
            Ответ 1
          </Radio>
          <Radio className="RadioAnswer" style={radioStyle} value={2}>
            Ответ 2
          </Radio>
          <Radio style={radioStyle} value={3}>
            Ответ 3
          </Radio>
          <Radio style={radioStyle} value={4}>
            Ответ 4
          </Radio>
        </Group>
      </Card>
    );
  }
}
