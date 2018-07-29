/* eslint-disable react/no-array-index-key */
import React from 'react';
import './StructureQuestion.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Button, Radio } from 'antd';
import TreeWithTags from '../../../../../Components/TreeWithTags';
import {
  addQuestionTag, dataQuestion,
  deleteQuestionTag,
} from '../Services/Actions/actions';
// import API from '../../../../../Services/API';

const { TextArea } = Input;
const { Group } = Radio;
const RadioButton = Radio.Button;
const FormItem = Form.Item;

class QuestionForm extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    addTag: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    // getQuestion: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.question = {
      type: '',
      training: false,
      complexity: '',
      text: '',
      author: '',
      variants: [],
      topicIds: [],
    };
  }

  state = {
    answerInputsFalse: [],
    answerInputsTrue: [],
    type: '',
    error: false,
    add: false,
  };

  onChangeTrainingTest = (e) => {
    // const { getQuestion } = this.props;
    // getQuestion('questions');
    this.question.training = e.target.checked;
  };

  onChangeLevel = (e) => {
    this.question.complexity = e.target.value;
  };

  onChangeAnswer = (e) => {
    this.setState(() => ({ type: e.target.value }));
    this.question.type = e.target.value;
  };

  setField = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    switch (name) {
      case 'answerFalse': {
        this.question.variants.push({ text: value, correct: false });
        break;
      }
      case 'answerTrue': {
        this.question.variants.push({ text: value, correct: true });
        break;
      }
      case 'question': {
        this.setState({ [name]: value });
        this.question.text = value;
        break;
      }
      default:
        console.log(name);
    }
  };

  validateQuestion = (question) => {
    if (question.type.length === 0 || question.complexity.length === 0
      || question.text.length === 0 || question.topicIds.length === 0) {
      return false;
    }
    if (question.type === 'SINGLE-VARIANT' || question.type === 'MULTI-VARIANT') {
      if (!(question.variants.find(element => element.correct === true)
        && question.variants.find(element => element.correct === false))) {
        return false;
      }
    }
    if (question.type === 'AUTOCHECK_TEXT') {
      if (!(question.variants.find(element => element.correct === true))) {
        return false;
      }
    }
    return true;
  };

  addAnswerInputsFalse = () => this.setState(prevState => ({
    answerInputsFalse: [...prevState.answerInputsFalse, prevState.answerInputsFalse.length + 1],
  }));

  addAnswerInputsTrue = () => this.setState(prevState => ({
    answerInputsTrue: [...prevState.answerInputsTrue, prevState.answerInputsTrue.length + 1],
  }));

  handleSubmit = (e) => {
    const { error } = this.state;
    const { addQuestion } = this.props;
    if (!error) {
      console.log(this.question);
      addQuestion('questions', this.question);
    }
    e.preventDefault();
  };

  render() {
    const { addTag, tags, deleteTag, user } = this.props;
    const {
      answerInputsFalse,
      answerInputsTrue,
      type,
      error,
      add,
    } = this.state;
    const errorInput = error ? <div className="error-input">Введите все данные!</div> : <div/>;
    const addQuestion = add ? <div>Вопрос добавлен!</div> : <div/>;
    const onClickAddQuestion = () => {
      this.question.topicIds = tags;
      this.question.author = `${user.lastName} ${user.firstName}`;
      if (!this.validateQuestion(this.question)) {
        this.setState(() => ({ error: true }));
      } else {
        this.setState(() => ({ error: false }));
        this.setState(() => ({ add: true }));
      }
    };
    const inputFalse = (answerInputsFalse || []).map((item, i) => (
      <Input
        onBlur={this.setField}
        name="answerFalse"
        type="text"
        className="answer"
        key={i}
      />));
    const inputTrue = (answerInputsTrue || []).map((item, i) => (
      <Input
        onBlur={this.setField}
        name="answerTrue"
        type="text"
        className="answer"
        key={i}
      />));
    const inputQuestionSingleVariant = (
      <div className="block-answer">
        <div className="true-answer">Введите правильный вариант ответа:
          <Input
            onBlur={this.setField}
            name="answerTrue"
            type="text"
            className="answer"
          />
        </div>
        <div className="false-answer">Введите неправильные варианты ответа:
          <Input
            onBlur={this.setField}
            name="answerFalse"
            type="text"
            className="answer"
          />{inputFalse}
          <Button onClick={this.addAnswerInputsFalse} type="dashed" className="add-input">+Добавить</Button>
        </div>
      </div>
    );
    const inputQuestionMultiVariant = (
      <div className="block-answer">
        <div className="true-answer">Введите правильные варианты ответа:
          <Input
            onBlur={this.setField}
            name="answerTrue"
            type="text"
            className="answer"
          />{inputTrue}
          <Button onClick={this.addAnswerInputsTrue} type="dashed" className="add-input">+Добавить</Button>
        </div>
        <div className="false-answer">Введите неправильные варианты ответа:
          <Input
            onBlur={this.setField}
            name="answerFalse"
            type="text"
            className="answer"
          />{inputFalse}
          <Button onClick={this.addAnswerInputsFalse} type="dashed" className="add-input">+Добавить</Button>
        </div>
      </div>);
    const inputQuestionAutoCheckText = (
      <div className="block-answer">
        <div className="true-answer">Введите правильный ответ:
          <Input
            onBlur={this.setField}
            name="answerTrue"
            type="text"
            className="answer"
          />
        </div>
      </div>);
    let elem;
    switch (type) {
      case 'SINGLE-VARIANT': {
        elem = inputQuestionSingleVariant;
        break;
      }
      case 'MULTI-VARIANT': {
        elem = inputQuestionMultiVariant;
        break;
      }
      case 'AUTOCHECK_TEXT': {
        elem = inputQuestionAutoCheckText;
        break;
      }
      default:
        elem = null;
    }

    return (
      <Form onSubmit={this.handleSubmit} className="structure-question">
        <div className="header">Добавление вопроса</div>
        <div className="tags"><TreeWithTags deleteTag={deleteTag} tags={tags} addTag={addTag}/></div>
        <Group className="level" onChange={this.onChangeLevel}>
          <span className="text-level">Уровень сложности вопроса:</span>
          <Radio value="LEVEL_1">1</Radio>
          <Radio value="LEVEL_2">2</Radio>
          <Radio value="LEVEL_3">3</Radio>
          <Radio value="LEVEL_4">4</Radio>
          <Checkbox onChange={this.onChangeTrainingTest}>Тренировoчный тест</Checkbox>
        </Group>
        <FormItem className="form-item">
          <TextArea
            onBlur={this.setField}
            name="question"
            type="text"
            className="text-question"
            placeholder="Текст вопроса"
            autosize={{ minRows: 4 }}
          />
        </FormItem>
        <div className="question">
          <div className="answer-type">
            <span className="text-variant">Вариант ответа на вопрос:</span>
            <Group onChange={this.onChangeAnswer}>
              <RadioButton value="SINGLE-VARIANT">Один вариант ответа</RadioButton>
              <RadioButton value="MULTI-VARIANT">Несколько вариантов ответа</RadioButton>
              <RadioButton value="AUTOCHECK_TEXT">Короткий ответ</RadioButton>
              <RadioButton value="MANUAL_CHECK_TEST">Развернутый ответ</RadioButton>
            </Group>
          </div>
          <div className="add-task-container"/>
        </div>
        {elem}
        {errorInput}
        {addQuestion}
        <FormItem className="add-question">
          <Button
            onClick={onClickAddQuestion}
            className="button-add-question"
            type="primary"
            htmlType="submit"
          >Добавить вопрос
          </Button>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.logInInformation.user,
    tags: state.addQuestion.tags,
  };
}

const mapDispatchToProps = dispatch => ({
  addTag: (tag) => {
    dispatch(addQuestionTag(tag));
  },
  deleteTag: (tag) => {
    dispatch(deleteQuestionTag(tag));
  },
  // getQuestion: (url) => {
  //   dispatch(API.get(url, 'get'));
  // },
  addQuestion: (url, data) => {
    data.id = `${Math.random()}`;
    data.status = 'ACTIVE';
    data.statistics = null;
    dispatch(dataQuestion(url, data));
  },
});
const StructureQuestion = Form.create()(QuestionForm);
export default connect(mapStateToProps, mapDispatchToProps)(StructureQuestion);
