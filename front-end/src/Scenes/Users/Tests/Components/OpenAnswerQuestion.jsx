import React from 'react';
import 'antd/dist/antd.css';
import './OpenAnswerQuestion.scss';
import { Input, Card } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

export default class OpenAnswersQuestion extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    const { text } = this.props;
    return (
      <Card className="open-answer-question-card">
        <p className="question-text">{text}</p>
        <TextArea className="text-area-answer" placeholder="Введите ответ" autosize={{ minRows: 5 }}/>
      </Card>
    );
  }
}
