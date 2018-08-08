/* eslint-disable react/no-array-index-key */
import React from 'react';
import './StructureQuestion.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Button, Radio } from 'antd';
import TreeWithTags from '../../../../../Components/TreeWithTags';
import {
  addQuestionTag,
  dataQuestion,
  deleteQuestionTag,
  fetchTopics,
} from '../Services/Actions/actions';

const { TextArea } = Input;
const { Group } = Radio;
const RadioButton = Radio.Button;
const FormItem = Form.Item;

class QuestionForm extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    addTag: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf.isRequired,
    // response: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.question = {
      questionComplexity: '',
      questionType: '',
      questionVariants: [],
      text: '',
      topicsId: [],
      training: false,
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
    this.question.training = e.target.checked;
  };

  onChangeLevel = (e) => {
    this.question.questionComplexity = e.target.value;
  };

  onChangeAnswer = (e) => {
    this.setState(() => ({ type: e.target.value }));
    this.question.questionType = e.target.value;
  };

  setField = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    switch (name) {
      case 'answerFalse': {
        if (value !== '') {
          this.question.questionVariants.push({ correct: false, text: value });
        }
        break;
      }
      case 'answerTrue': {
        if (value !== '') {
          this.question.questionVariants.push({ correct: true, text: value });
        }
        break;
      }
      case 'question': {
        if (value !== '') {
          this.setState({ [name]: value });
          this.question.text = value;
        }
        break;
      }
      default:
        console.log(name);
    }
  };

  validateQuestion = (question) => {
    if (question.questionType.length === 0 || question.questionComplexity.length === 0
      || question.text.length === 0 || question.topicsId.length === 0) {
      return false;
    }
    if (question.questionType === 'SINGLE-VARIANT' || question.questionType === 'MULTI-VARIANT') {
      if (!(question.questionVariants.find(element => element.correct === true)
        && question.questionVariants.find(element => element.correct === false))) {
        return false;
      }
    }
    if (question.type === 'AUTOCHECK_TEXT') {
      if (!(question.questionVariants.find(element => element.correct === true))) {
        return false;
      }
    }
    return true;
  };

  addAnswerInputsFalse = () => {
    const { answerInputsFalse } = this.state;
    const inputFalse = (
      <div key={answerInputsFalse.length} className="parent-input">
        <TextArea
          onBlur={this.setField}
          name="answerFalse"
          type="text"
          className="answer"
        />
        <Button
          onClick={this.deleteFalseInputs}
          shape="circle"
          icon="close"
          className="button-delete"
          size="small"
        />
      </div>
    );
    this.setState(prevState => ({
      answerInputsFalse: [...prevState.answerInputsFalse,
        inputFalse],
    }));
  };

  addAnswerInputsTrue = () => {
    const { answerInputsTrue } = this.state;
    const inputTrue = (
      <div key={answerInputsTrue.length} className="parent-input">
        <TextArea
          onBlur={this.setField}
          name="answerTrue"
          type="text"
          autosize
          className="answer"
        />
        <Button
          onClick={this.deleteTrueInputs}
          shape="circle"
          icon="close"
          className="button-delete"
          size="small"
        />
      </div>
    );
    this.setState(prevState => ({
      answerInputsTrue: [...prevState.answerInputsTrue,
        inputTrue],
    }));
  };

  deleteTrueInputs = (e) => {
    const { answerInputsTrue } = this.state;
    answerInputsTrue.splice(+e.target.value, 1);
    e.target.parentNode.classList.add('hide');
  };

  deleteFalseInputs = (e) => {
    const { answerInputsFalse } = this.state;
    answerInputsFalse.splice(+e.target.value, 1);
    e.target.parentNode.classList.add('hide');
  };

  handleSubmit = (e) => {
    const { error } = this.state;
    const { addQuestion } = this.props;
    if (!error) {
      const obj = {
        questionComplexity: this.question.questionComplexity,
        questionType: this.question.questionType,
        questionVariants: this.question.questionVariants,
        text: this.question.text,
        topicIds: this.question.topicsId,
        training: this.question.training,
      };
      addQuestion('questions', obj);
      this.question.questionComplexity = '';
      this.question.questionType = '';
      this.question.questionVariants = [];
      this.question.text = '';
      this.question.topicsId = [];
      this.question.training = false;
    }
    e.preventDefault();
  };

  render() {
    const { addTag, tags, deleteTag, topics, getTopics } = this.props;
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
      if (tags.length) {
        const tagsArray = [];
        tags.forEach((element) => {
          tagsArray.push(element.id);
        });
        this.question.topicsId = tagsArray;
      } else {
        this.question.topicsId = tags;
      }
      if (!this.validateQuestion(this.question)) {
        this.setState(() => ({ error: true }));
      } else {
        this.setState(() => ({ error: false }));
        this.setState(() => ({ add: true }));
      }
    };
    const addInputFalse = (answerInputsFalse || []).map((item, i) => (
      <div key={i}>{item}</div>));
    const addiInputTrue = (answerInputsTrue || []).map((item, i) => (
      <div key={i}>{item}</div>));
    const inputQuestionSingleVariant = (
      <div className="block-answer">
        <div className="true-answer">Введите правильный вариант ответа:
          <TextArea
            onBlur={this.setField}
            name="answerTrue"
            type="text"
            autosize
            className="answer"
          />
        </div>
        <div className="false-answer">Введите неправильные варианты ответа:
          <TextArea
            onBlur={this.setField}
            name="answerFalse"
            type="text"
            autosize
            className="answer"
          />{addInputFalse}
          <Button onClick={this.addAnswerInputsFalse} type="dashed" className="add-input">+Добавить</Button>
        </div>
      </div>
    );
    const inputQuestionMultiVariant = (
      <div className="block-answer">
        <div className="true-answer">Введите правильные варианты ответа:
          <TextArea
            onBlur={this.setField}
            name="answerTrue"
            type="text"
            autosize
            className="answer"
          />{addiInputTrue}
          <Button onClick={this.addAnswerInputsTrue} type="dashed" className="add-input">+Добавить</Button>
        </div>
        <div className="false-answer">Введите неправильные варианты ответа:
          <TextArea
            onBlur={this.setField}
            name="answerFalse"
            type="text"
            autosize
            className="answer"
          />{addInputFalse}
          <Button onClick={this.addAnswerInputsFalse} type="dashed" className="add-input">+Добавить</Button>
        </div>
      </div>);
    const inputQuestionAutoCheckText = (
      <div className="block-answer">
        <div className="true-answer">Введите правильный ответ:
          <TextArea
            onBlur={this.setField}
            name="answerTrue"
            type="text"
            autosize
            className="answer"
          />
        </div>
      </div>);
    let elem;
    switch (type) {
      case 'SINGLE_VARIANT': {
        elem = inputQuestionSingleVariant;
        break;
      }
      case 'MULTI_VARIANT': {
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
        <div className="tags">
          <TreeWithTags
            deleteTag={deleteTag}
            tags={tags}
            addTag={addTag}
            getTopics={getTopics}
            topics={topics}
          />
        </div>
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
              <RadioButton value="SINGLE_VARIANT">Один вариант ответа</RadioButton>
              <RadioButton value="MULTI_VARIANT">Несколько вариантов ответа</RadioButton>
              <RadioButton value="AUTOCHECK_TEXT">Короткий ответ</RadioButton>
              <RadioButton value="MANUAL_CHECK_TEXT">Развернутый ответ</RadioButton>
            </Group>
          </div>
          <div className="add-task-container"/>
        </div>
        {elem}
        <div className="error-input-parent">{errorInput}</div>
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
    topics: state.addQuestion.topics,
    response: state.addQuestion.response,
  };
}

const mapDispatchToProps = dispatch => ({
  addTag: (tag) => {
    dispatch(addQuestionTag(tag));
  },
  deleteTag: (tag) => {
    dispatch(deleteQuestionTag(tag));
  },
  addQuestion: (url, data) => {
    console.log(data, url, 897);
    dispatch(dataQuestion(url, data));
  },
  getTopics: () => {
    dispatch(fetchTopics());
  },
});
const StructureQuestion = Form.create()(QuestionForm);
export default connect(mapStateToProps, mapDispatchToProps)(StructureQuestion);
