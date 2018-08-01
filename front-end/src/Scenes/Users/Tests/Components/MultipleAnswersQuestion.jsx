import React from 'react';
import 'antd/dist/antd.css';
import './MultipleAnswersQuestion.scss';
import { Checkbox, Card } from 'antd';
import PropTypes from 'prop-types';

const { Group } = Checkbox;


export default class MultipleAnswersQuestion extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    variants: PropTypes.arrayOf().isRequired,
    answer: PropTypes.arrayOf().isRequired,
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  onChange = (checkedValues) => {
    const { answer, value, index } = this.props;
    answer[index] = {
      answer: checkedValues.toString(),
      questionId: value,
    };
    console.log(answer);
  };

  render() {
    const { text, variants } = this.props;
    const options = variants.map((item, i) => ({ label: item.text, value: i }));
    return (
      <Card className="multiple-answers-question-card">
        <p className="question-text">
          {text}
        </p>
        <Group
          className="check-box-group"
          options={options}
          onChange={this.onChange}
        />
      </Card>
    );
  }
}
