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
    // answer: PropTypes.arrayOf().isRequired,
  };

  render() {
    const { text, variants } = this.props;
    const plainOptions = variants.map(item => item.text);
    return (
      <Card className="multiple-answers-question-card">
        <p className="question-text">
          {text}
        </p>
        <Group
          className="check-box-group"
          options={plainOptions}
        />
      </Card>
    );
  }
}
