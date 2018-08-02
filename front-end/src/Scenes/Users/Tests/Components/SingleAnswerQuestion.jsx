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
  };

  state = {
    value: 1,
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { text, variants } = this.props;
    const plainOptions = variants.map(item => item.text);
    const { value } = this.state;

    return (
      <Card className="single-answer-question-card">
        <p className="question-text">
          {text}
        </p>
        <Group
          options={plainOptions}
          onChange={this.onChange}
          value={value}
        />
      </Card>
    );
  }
}
