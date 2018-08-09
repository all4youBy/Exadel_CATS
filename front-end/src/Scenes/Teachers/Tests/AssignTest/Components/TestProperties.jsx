/* eslint-disable no-unused-vars,spaced-comment */
import React from 'react';
import { Form, Input, Button, DatePicker, TimePicker, InputNumber } from 'antd';
import './TestProperties.scss';
import PropTypes from 'prop-types';
import TreeWithTags from '../../../../../Components/TreeWithTags';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

class TestProperties extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleDeleteTestTag: PropTypes.func.isRequired,
    handleAddTestTag: PropTypes.func.isRequired,
    handleCreateTest: PropTypes.func.isRequired,
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf(PropTypes.any).isRequired,
    teacher: PropTypes.string.isRequired,
    clearState: PropTypes.func.isRequired,
  };

  state = {
    nameTest: '',
    countQuestionsTest: 1,
    getStart: '',
    getDeadline: '',
    error: false,
  };

  onChangeData = (value, dateString) => {
    this.setState(() => ({
      getStart: dateString[0],
      getDeadline: dateString[1],
    }));
  };

  onOk = (value) => {
  };


  onChangeCountQuestion = (value) => {
    this.setState(() => ({
      countQuestionsTest: value,
    }));
  };

  setField = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validateTest = (test) => {
    if (test.nameTest !== '' && test.getStart !== ''
      && test.getDeadline !== '') {
      return true;
    }
    return false;
  };

  render() {
    const {
      handleAddTestTag, handleDeleteTestTag, tags, handleCreateTest,
      topics, getTopics, teacher, clearState,
    } = this.props;
    const {
      nameTest, countQuestionsTest, getStart, getDeadline, error,
    } = this.state;
    const receiverInfo = JSON.parse(localStorage.getItem('userStatusForAssign'));
    const handleSubmit = () => {
      let tagsTest = [];
      if (tags.length) {
        const tagsArray = [];
        tags.forEach((element) => {
          tagsArray.push(element.id);
        });
        tagsTest = tagsArray;
      } else {
        tagsTest = tags;
      }
      const test = {
        assignedBy: teacher,
        title: nameTest,
        questionsCount: +countQuestionsTest,
      };
      if (this.validateTest(test) && tagsTest && tagsTest.length !== 0) {
        switch (typeof receiverInfo) {
          case 'object': {
            const obj = {
              assignedBy: teacher,
              deadline: getDeadline,
              email: receiverInfo.email,
              questionsCount: +countQuestionsTest,
              start: getStart,
              title: nameTest,
              topics: tagsTest,
            };
            handleCreateTest(obj, 'tests');
            clearState();
            break;
          }
          case 'string': {
            test.group = receiverInfo;
            test.topicIds = tagsTest;
            test.start = new Date(getStart);
            test.deadline = new Date(getDeadline);
            this.setState(() => ({ error: false }));
            handleCreateTest(test, 'tests/for-group');
            clearState();
            break;
          }
          default: {
            this.setState(() => ({ error: false }));
          }
        }
      } else {
        this.setState(() => ({ error: true }));
      }
    };
    const errorInput = error ? <div className="error-input">Введите все данные!</div> : <div/>;
    const name = typeof receiverInfo === 'string' ? receiverInfo : receiverInfo.name;
    return (
      <div className="test-properties-content">
        <div className="header">Назначение теста</div>
        <div>Назначается: {name}</div>
        <div className="name-form-item">
          <TextArea
            name="nameTest"
            type="text"
            className="input-task-name"
            placeholder="Введите название теста"
            autosize
            onBlur={this.setField}
          />
          <div className="tags-test-properties">
            <TreeWithTags
              tags={tags}
              deleteTag={handleDeleteTestTag}
              addTag={handleAddTestTag}
              valid={handleCreateTest}
              topics={topics}
              getTopics={getTopics}
            />
          </div>
          <div className="parent-form">
            <div className="form-item">
              <div>Выберите количество вопросов теста:</div>
              <InputNumber
                className="input-count-questions"
                min={1}
                max={20}
                defaultValue={1}
                onChange={this.onChangeCountQuestion}
              />
            </div>
            <div className="form-item">
              <div>Выберите дату и время открытия и закрытия теста:</div>
              <div className="input-data">
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['Открытие теста', 'Закрытие теста']}
                  onChange={this.onChangeData}
                  onOk={this.onOk}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="parent-error-input">{errorInput}</div>
        <Button
          className="button-table-with-border button-assign"
          type="primary"
          onClick={handleSubmit}
        >Назначить
        </Button>
      </div>
    );
  }
}

const WrappedTestPropertiesForm = Form.create()(TestProperties);
export default WrappedTestPropertiesForm;
