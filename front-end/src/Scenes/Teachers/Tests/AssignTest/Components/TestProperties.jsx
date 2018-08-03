/* eslint-disable no-unused-vars,spaced-comment */
import React from 'react';
import { Form, Input, Button } from 'antd';
import './TestProperties.scss';
import PropTypes from 'prop-types';
import TreeWithTags from '../../../../../Components/TreeWithTags';
// import CurrentGroupList from '../../../../../Components/CurrentGroupList';
// import StudentsAndGroupsList from '../../../../../Components/StudentsAndGroupsList';
// import Loading from '../../../../../Components/Loading';

const { TextArea } = Input;
const { Item: FormItem } = Form;

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

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 50,
      offset: 50,
    },
    sm: {
      span: 19,
      offset: 50,
    },
  },
};

class TestProperties extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleDeleteTestTag: PropTypes.func.isRequired,
    handleAddTestTag: PropTypes.func.isRequired,
    handleCreateTest: PropTypes.func.isRequired,
    form: PropTypes.shape().isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    addStudent: PropTypes.func.isRequired,
    delStudent: PropTypes.func.isRequired,
    getStudentsData: PropTypes.func.isRequired,
    students: PropTypes.objectOf(PropTypes.array).isRequired,
    error: PropTypes.string.isRequired,
    getUsersFromGroup: PropTypes.func.isRequired,
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string).isRequired,
    teacher: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    receiver: PropTypes.string.isRequired,
  };

  state = {
    nameTest: '',
    countQuestionsTest: -1,
    hoursLeadTimeTest: 0,
    minutesLeadTimeTest: 0,
    secondsLeadTimeTest: 0,
    hoursTimeOpenTest: 0,
    minutesTimeOpenTest: 0,
    secondsTimeOpenTest: 0,
    hoursPassTimeTest: 0,
    minutesPassTimeTest: 0,
    secondsPassTimeTest: 0,
    mothsPassDateTest: 0,
    daysPassDateTest: 0,
    yearsPassDateTest: 0,
    mothsLeadDateTest: 0,
    daysLeadDateTest: 0,
    yearsLeadDateTest: 0,
    add: false,
  };

  setField = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      handleAddTestTag, handleDeleteTestTag, receiver, tags, handleCreateTest, data,
      addStudent, delStudent, getStudentsData, students, error, topics, getTopics, teacher, type,
    } = this.props;
    const { form } = this.props;
    const {
      nameTest, countQuestionsTest, hoursLeadTimeTest, minutesLeadTimeTest,
      secondsLeadTimeTest, hoursTimeOpenTest, minutesTimeOpenTest,
      secondsTimeOpenTest, hoursPassTimeTest, minutesPassTimeTest,
      secondsPassTimeTest, daysPassDateTest, mothsPassDateTest, yearsPassDateTest,
      mothsLeadDateTest, daysLeadDateTest, yearsLeadDateTest, add,
    } = this.state;
    const { getFieldDecorator } = form;

    const addTest = add ? <div>Вы назначили тест!</div> : <div/>;
    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFieldsAndScroll((err) => {
        if (!err) {
          const obj = {
            assignedBy: teacher,
            title: nameTest,
            questionsCount: +countQuestionsTest,
            // leadTime: new Date(hoursLeadTimeTest, minutesLeadTimeTest, secondsLeadTimeTest),
            start: new Date(yearsLeadDateTest, mothsLeadDateTest,
              daysLeadDateTest, hoursTimeOpenTest, minutesTimeOpenTest,
              secondsTimeOpenTest).toISOString(),
            deadline: new Date(yearsPassDateTest, mothsPassDateTest,
              daysPassDateTest, hoursPassTimeTest,
              minutesPassTimeTest, secondsPassTimeTest).toISOString(),
            topics: ['5b4898d987ae4314d278f38e'],
          };
          // console.log(obj.start);
          switch (type) {
            case 'STUDENT': {
              obj.email = receiver;
              break;
            }
            default: {
              obj.group = receiver;
            }
          }
          console.log(obj);
          handleCreateTest({
            assignedBy: teacher,
            title: nameTest,
            questionsCount: +countQuestionsTest,
            // leadTime: new Date(hoursLeadTimeTest, minutesLeadTimeTest, secondsLeadTimeTest),
            start: new Date(yearsLeadDateTest, mothsLeadDateTest,
              daysLeadDateTest, hoursTimeOpenTest, minutesTimeOpenTest,
              secondsTimeOpenTest).toISOString(),
            deadline: new Date(yearsPassDateTest, mothsPassDateTest,
              daysPassDateTest, hoursPassTimeTest,
              minutesPassTimeTest, secondsPassTimeTest).toISOString(),
            topics: ['5b4898d987ae4314d278f38e'],
            group: receiver,
          });
          this.setState(() => ({ add: true }));
        }
      });
    };
    // const groupList = users ? (
    //   <CurrentGroupList
    //     students={students}
    //     delStudent={delStudent}
    //   />
    // ) : <Loading/>;
    return (
      <div className="test-properties-content">
        <div className="header">Назначение теста</div>
        <FormItem {...formItemLayout} label="" className="name-form-item">
          {getFieldDecorator('Название', {
            rules: [
              {
                required: true,
                message: 'Пожалуйста, введите название теста!',
              },
            ],
          })(
            <TextArea
              name="nameTest"
              type="text"
              className="input-task-name"
              placeholder="Введите название теста"
              autosize
              onBlur={this.setField}
            />,
          )
          }
        </FormItem>
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
        <Form className="parent-form">
          <div className="left-group-form-items">
            <FormItem {...formItemLayout} label="Кол. вопросов" className="form-item">
              {getFieldDecorator('Количество вопросов', {
                rules: [
                  {
                    pattern: /[1-9]/,
                    message: 'Введите число!',
                  },
                  {
                    max: 4,
                    message: 'Введите 4 цифры!',
                  },
                  {
                    required: true,
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
            <FormItem {...formItemLayout} label="Время откр." className="form-item">
              {getFieldDecorator('timeOpenTest', {
                rules: [
                  {
                    pattern: /^[0-5]\d/,
                    message: 'Введите число!',
                  },
                  {
                    required: true,
                    message: 'Пожалуйста, введите время открытия теста!',
                  },
                  {
                    max: 2,
                    message: 'Вы можете ввести не более 2 символов',
                  },
                ],
              })(
                <div className="parent-group-input">
                  <Input
                    className="input-hour-lead-time"
                    name="hoursTimeOpenTest"
                    placeholder="00"
                    onBlur={this.setField}
                  />
                  <Input
                    className="text-between-input"
                    placeholder=":"
                    disabled
                  />
                  <Input
                    className="input-min-lead-time"
                    name="minutesTimeOpenTest"
                    placeholder="00"
                    onBlur={this.setField}
                  />
                  <Input
                    className="text-between-input"
                    placeholder=":"
                    disabled
                  />
                  <Input
                    className="input-second-lead-time"
                    name="secondsTimeOpenTest"
                    placeholder="00"
                    onBlur={this.setField}
                  />
                </div>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Дата откр." className="form-item">
              {getFieldDecorator('passDate', {
                rules: [
                  {
                    pattern: /[0-9]/,
                    message: 'Введите число!',
                  },
                  {
                    required: true,
                    message: 'Пожалуйста, введите дaту открытия!',
                  },
                ],
              })(
                <div className="parent-group-input">
                  <Input
                    className="input-hour-lead-time"
                    name="daysLeadDateTest"
                    placeholder="00"
                    onBlur={this.setField}
                  />
                  <Input
                    className="text-between-input"
                    placeholder="."
                    disabled
                  />
                  <Input
                    className="input-min-lead-time"
                    name="mothsLeadDateTest"
                    placeholder="00"
                    onBlur={this.setField}
                  />
                  <Input
                    className="text-between-input"
                    placeholder="."
                    disabled
                  />
                  <Input
                    className="input-years-lead-time"
                    name="yearsLeadDateTest"
                    placeholder="0000"
                    onBlur={this.setField}
                  />
                </div>,
              )}
            </FormItem>
          </div>
          <div className="right-group-form-items">
            {/*<FormItem {...formItemLayout} label="Время вып." className="form-item">*/}
            {/*{getFieldDecorator('leadTime', {*/}
            {/*rules: [*/}
            {/*{*/}
            {/*pattern: /^[0-5]\d/,*/}
            {/*message: 'Введите число!',*/}
            {/*},*/}
            {/*{*/}
            {/*required: true,*/}
            {/*message: 'Пожалуйста, введите время выполнения!',*/}
            {/*},*/}
            {/*{*/}
            {/*max: 2,*/}
            {/*message: 'Вы можете ввести не более 2 символов',*/}
            {/*},*/}
            {/*],*/}
            {/*})(*/}
            {/*<div className="parent-group-input">*/}
            {/*<Input*/}
            {/*className="input-hour-lead-time"*/}
            {/*name="hoursLeadTimeTest"*/}
            {/*placeholder="00"*/}
            {/*onBlur={this.setField}*/}
            {/*/>*/}
            {/*<Input*/}
            {/*className="text-between-input"*/}
            {/*placeholder=":"*/}
            {/*disabled*/}
            {/*/>*/}
            {/*<Input*/}
            {/*className="input-min-lead-time"*/}
            {/*name="minutesLeadTimTest"*/}
            {/*placeholder="00"*/}
            {/*onBlur={this.setField}*/}
            {/*/>*/}
            {/*<Input*/}
            {/*className="text-between-input"*/}
            {/*placeholder=":"*/}
            {/*disabled*/}
            {/*/>*/}
            {/*<Input*/}
            {/*className="input-second-lead-time"*/}
            {/*name="secondsLeadTimeTest"*/}
            {/*placeholder="00"*/}
            {/*onBlur={this.setField}*/}
            {/*/>*/}
            {/*</div>,*/}
            {/*)}*/}
            {/*</FormItem>*/}
            <FormItem {...formItemLayout} label="Время сдачи" className="form-item">
              {getFieldDecorator('passTime', {
                rules: [
                  {
                    pattern: /^[0-5]\d/,
                    message: 'Введите число!',
                  },
                  {
                    required: true,
                    message: 'Пожалуйста, введите время сдачи!',
                  },
                  {
                    max: 2,
                    message: 'Вы можете ввести не более 2 символов',
                  },
                ],
              })(
                <div className="parent-group-input">
                  <Input
                    className="input-hour-lead-time"
                    name="hoursPassTimeTest"
                    placeholder="00"
                    onBlur={this.setField}
                  />
                  <Input
                    className="text-between-input"
                    placeholder=":"
                    disabled
                  />
                  <Input
                    className="input-min-lead-time"
                    name="minutesPassTimeTest"
                    placeholder="00"
                    onBlur={this.setField}
                  />
                  <Input
                    className="text-between-input"
                    placeholder=":"
                    disabled
                  />
                  <Input
                    className="input-second-lead-time"
                    name="secondsPassTimeTest"
                    placeholder="00"
                    onBlur={this.setField}
                  />
                </div>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Дата сдачи" className="form-item">
              {getFieldDecorator('passDate', {
                rules: [
                  {
                    pattern: /[0-9]/,
                    message: 'Введите число!',
                  },
                  {
                    required: true,
                    message: 'Пожалуйста, введите дaту сдачи!',
                  },
                ],
              })(
                <div className="parent-group-input">
                  <Input
                    className="input-hour-lead-time"
                    name="daysPassDateTest"
                    placeholder="00"
                    onBlur={this.setField}
                  />
                  <Input
                    className="text-between-input"
                    placeholder="."
                    disabled
                  />
                  <Input
                    className="input-min-lead-time"
                    name="mothsPassDateTest"
                    placeholder="00"
                    onBlur={this.setField}
                  />
                  <Input
                    className="text-between-input"
                    placeholder="."
                    disabled
                  />
                  <Input
                    className="input-years-lead-time"
                    name="yearsPassDateTest"
                    placeholder="0000"
                    onBlur={this.setField}
                  />
                </div>,
              )}
            </FormItem>
          </div>
        </Form>
        {/*<div className="parent-student-list">*/}
        {/*<StudentsList*/}
        {/*students={data}*/}
        {/*addStudent={addStudent}*/}
        {/*getStudentsData={getStudentsData}*/}
        {/*error={error}*/}
        {/*teacher={teacher}*/}
        {/*type={type}*/}
        {/*/>*/}
        {/*<CurrentGroupList*/}
        {/*students={students}*/}
        {/*delStudent={delStudent}*/}
        {/*/>*/}
        {/*</div>*/}
        {addTest}
        <FormItem {...tailFormItemLayout} >
          <Button
            className="button-table-with-border button-assign"
            type="primary"
            onClick={handleSubmit}
          >Назначить
          </Button>
        </FormItem>
      </div>
    );
  }
}

const WrappedTestPropertiesForm = Form.create()(TestProperties);
export default WrappedTestPropertiesForm;
