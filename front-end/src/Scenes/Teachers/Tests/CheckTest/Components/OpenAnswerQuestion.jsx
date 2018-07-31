import React from 'react';
import 'antd/dist/antd.css';
import './OpenAnswerQuestion.scss';
import { Input, Card, Form } from 'antd';
import PropTypes from 'prop-types';

const { Item: FormItem } = Form;

const { TextArea } = Input;


const formItemLayout = {
  labelCol: {
    xs: { span: 100 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 80 },
    sm: { span: 80 },
  },
};


class OpenAnswersQuestion extends React.PureComponent {
  static propTypes = {
    form: PropTypes.shape().isRequired,
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Card className="open-answer-question-card">
        <p className="question-text">Вопрос с открытым ответом</p>
        <TextArea className="text-area-answer" placeholder="Введите ответ" autosize={{ minRows: 5 }}/>
        <FormItem {...formItemLayout} label="Количество вопросов" className="form-item">
          {getFieldDecorator('Количество вопросов', {
            rules: [
              {
                pattern: /[1-9]/,
                message: 'Введите число!',
              },
              {
                max: 2,
                message: 'Введите 4 цифры!',
              },
              {
                required: false,
                message: 'Пожалуйста, введите количество вопросов!',
              },
            ],
          })(
            <Input
              className="input-count-questions"
              name="countQuestionsTest"
              onBlur={this.setField}
            />,
          )
          }
        </FormItem>
      </Card>
    );
  }
}

const CheckOpenAnswersQuestion = Form.create()(OpenAnswersQuestion);
export default CheckOpenAnswersQuestion;
