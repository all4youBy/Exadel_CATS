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
    type: PropTypes.string.isRequired,
    receiver: PropTypes.string.isRequired,
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
      && test.getDeadline !== '' && test.topicsId.length) {
      return true;
    }
    return false;
  };

  render() {
    const {
      handleAddTestTag, handleDeleteTestTag, receiver, tags, handleCreateTest,
      topics, getTopics, teacher, type,
    } = this.props;
    const {
      nameTest, countQuestionsTest, getStart, getDeadline, error,
    } = this.state;
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
        start: new Date(getStart.toString()),
        deadline: new Date(getDeadline.toString()),
        topicsId: tagsTest,
      };
      if (this.validateTest(test)) {
        switch (type) {
          case 'STUDENT': {
            test.email = receiver;
            break;
          }
          case 'GROUPS': {
            test.group = receiver;
            this.setState(() => ({ error: false }));
            handleCreateTest({ test }, '/for-group');
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

    return (
      <div className="test-properties-content">
        <div className="header">Назначение теста</div>
        <div>Назначается: {receiver}</div>
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
        {errorInput}
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
