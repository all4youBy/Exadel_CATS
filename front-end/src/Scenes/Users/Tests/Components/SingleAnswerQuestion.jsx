import React from 'react';
import 'antd/dist/antd.css';
import './SingleAnswerQuestion.scss';
import { Radio, Card } from 'antd';
import PropTypes from 'prop-types';

const { Group } = Radio;

export default class SingleAnswerQuestion extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    variants: PropTypes.shape().isRequired,
    answer: PropTypes.arrayOf().isRequired,
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  state = {
    value: 0,
  };

  onChange = (e) => {
    const { answer, value, index } = this.props;
    answer[index] = {
      answer: e.target.value,
      questionId: value,
    };
    this.setState({
      value: e.target.value,
    });
    console.log(answer);
  };

  render() {
    const { text, variants } = this.props;
    const plainOptions = variants.map(item => item.text);
    const { value } = this.state;
    return (
      <Card className="single-answer-question-card">
        <p className="question-text" dangerouslySetInnerHTML={{ __html: text }}/>
        <Group
          options={plainOptions}
          onChange={this.onChange}
          value={value}
        />
      </Card>
    );
  }
}
