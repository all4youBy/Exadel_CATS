import React from 'react';
import 'antd/dist/antd.css';
import './SingleAnswerQuestion.scss';
import { Radio, Card } from 'antd';
import PropTypes from 'prop-types';

const { Group } = Radio;

export default class SingleAnswerQuestion extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    variants: PropTypes.arrayOf(PropTypes.object).isRequired,
    answer: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    testId: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
  };

  state = {
    value: -1,
  };

  onChange = (e) => {
    const { answer, value, index, testId } = this.props;
    answer[index] = {
      answer: e.target.value,
      questionId: value,
      testId,
    };
    this.setState({
      value: e.target.value,
    });
    console.log(answer);
  };

  handleOnBlur = () => {
    const { submit, answer, index } = this.props;
    submit(answer[index]);
  };

  render() {
    const { text, variants } = this.props;
    const options = variants.map((item, i) => ({ label: item.text, value: i }));
    const { value } = this.state;
    return (
      <Card className="single-answer-question-card" onBlur={this.handleOnBlur}>
        <p className="question-text" dangerouslySetInnerHTML={{ __html: text }}/>
        <Group
          options={options}
          onChange={this.onChange}
          value={value}
        />
      </Card>
    );
  }
}
