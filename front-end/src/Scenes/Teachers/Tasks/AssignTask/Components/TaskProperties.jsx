import React from 'react';
import { Form, Input, Button } from 'antd';
import './TaskProperties.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import TimeInputGroup from './TimeInputGroup';
import TreeWithTags from '../../../../../Components/TreeWithTags';
import {
  addTestTag,
  deleteTestTag,
  addStudentToList,
  deleteStudentFromList,
  fetchStudentListForTask,
  fetchGroupsListForTask,
  fetchTopics,
} from '../Services/Actions/actions';
import StudentsList from '../../../../../Components/StudentsList';
import CurrentGroupList from '../../../../../Components/CurrentGroupList';

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

class TaskProperties extends React.Component {
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
    getGroupsData: PropTypes.func.isRequired,
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.bool.isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf.isRequired,
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
      handleAddTestTag, handleDeleteTestTag, tags, handleCreateTest, data,
      addStudent, delStudent, getStudentsData, students, error, getGroupsData,
      groups, getTopics, topics,
    } = this.props;
    const { form } = this.props;
    const {
      nameTest, countQuestionsTest, hoursLeadTimeTest, minutesLeadTimeTest,
      secondsLeadTimeTest, hoursTimeOpenTest, minutesTimeOpenTest,
      secondsTimeOpenTest, hoursPassTimeTest, minutesPassTimeTest,
      secondsPassTimeTest,
    } = this.state;

    const { getFieldDecorator } = form;
    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFieldsAndScroll((err) => {
        const obj = {
          name: nameTest,
          countQuestions: countQuestionsTest,
          leadTime: new Date(hoursLeadTimeTest, minutesLeadTimeTest, secondsLeadTimeTest),
          timeOpen: new Date(hoursTimeOpenTest, minutesTimeOpenTest, secondsTimeOpenTest),
          passTime: new Date(hoursPassTimeTest, minutesPassTimeTest, secondsPassTimeTest),
          hashTags: tags,
        };
        console.log(obj, 12546);
        if (!err) {
          handleCreateTest({
            name: nameTest,
            countQuestions: countQuestionsTest,
            leadTime: new Date(hoursLeadTimeTest, minutesLeadTimeTest, secondsLeadTimeTest),
            timeOpen: new Date(hoursTimeOpenTest, minutesTimeOpenTest, secondsTimeOpenTest),
            passTime: new Date(hoursPassTimeTest, minutesPassTimeTest, secondsPassTimeTest),
          });
        }
      });
    };
    return (
      <div className="test-properties-content">
        <FormItem {...formItemLayout} label="" className="name-form-item">
          {getFieldDecorator('Название', {
            rules: [
              {
                required: true,
                message: 'Пожалуйста, введите название задачи!',
              },
            ],
          })(
            <TextArea
              name="nameTest"
              className="input-task-name"
              placeholder="Название задачи"
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
            getTopics={getTopics}
            topics={topics}
          />
        </div>
        <Form className="parent-form">
          <div className="left-group-form-items">
            <FormItem {...formItemLayout} label="Время сдачи" className="form-item">
              {getFieldDecorator('timePassTask', {
                rules: [
                  {
                    pattern: /^[0-5]\d/,
                    message: 'Введите число!',
                  },
                  {
                    required: true,
                    message: 'Пожалуйста, введите время сдачи задачи!',
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
          </div>
          <div className="right-group-form-items">
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
        <div className="parent-student-list">
          <StudentsList
            students={data}
            addStudent={addStudent}
            getStudentsData={getStudentsData}
            getGroupsData={getGroupsData}
            error={error}
            groups={groups}
          />
          <CurrentGroupList
            students={students}
            delStudent={delStudent}
          />
        </div>
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

function mapStateToProps(state) {
  return {
    tags: state.taskInformation.tags,
    test: state,
    students: state.taskInformation.students,
    data: state.taskInformation.data,
    error: state.taskInformation.error,
    groups: state.taskInformation.groups,
    topics: state.taskInformation.topics,
  };
}

const mapDispatchToProps = dispatch => ({
  handleAddTestTag: (tag) => {
    dispatch(addTestTag(tag));
  },
  handleDeleteTestTag: (tag) => {
    dispatch(deleteTestTag(tag));
  },
  addStudent: (student) => {
    dispatch(addStudentToList(student));
  },
  delStudent: (student) => {
    dispatch(deleteStudentFromList(student));
  },
  getStudentsData: () => {
    dispatch(fetchStudentListForTask());
  },
  getGroupsData: () => {
    dispatch(fetchGroupsListForTask());
  },
  getTopics: () => {
    dispatch(fetchTopics());
  },
});

const WrappedTestPropertiesForm = Form.create()(TaskProperties);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedTestPropertiesForm);
