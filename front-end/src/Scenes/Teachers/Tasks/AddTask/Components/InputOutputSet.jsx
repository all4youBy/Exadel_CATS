/* eslint-disable react/no-array-index-key */
import React from 'react';
import 'antd/dist/antd.css';
import './AddTask.scss';
import PropTypes from 'prop-types';
import { Input, Button, Icon, Select, Form } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

class InputOutputSet extends React.PureComponent {
  static propTypes = {
    testSet: PropTypes.arrayOf(PropTypes.object).isRequired,
    addElem: PropTypes.func.isRequired,
    testSets: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  setField = (event) => {
    const { name, formId } = event.target;
    console.log(event.target, formId, name, 748);
    const { value } = event.target;
    const { testSets } = this.props;
    switch (name) {
      case 'inputSet': {
        if (value !== '') {
          testSets.push({ correct: false, text: value });
        }
        break;
      }
      case 'outputSet': {
        if (value !== '') {
          testSets.push({ correct: true, text: value });
        }
        break;
      }
      case 'level': {
        testSets.push({ correct: true, text: value });
        break;
      }
      default:
        console.log(name);
    }
  };


  render() {
    const { testSet, addElem } = this.props;
    const elem = (testSet || []).map((item, i) => (
      <Form className="set-container" onBlur={this.setField} formId={i}>
        <span className="set-num">Сет {i + 1}</span>
        <Select defaultValue="lucy" style={{ width: 120 }} name="level">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>Disabled</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <TextArea
          formId={i}
          placeholder="Входные данные"
          className="input-set"
          name="inputSet"
          autosize
          onBlur={this.setField}
        />
        <TextArea
          formId={i}
          placeholder="Выходные данные"
          className="input-set"
          name="outputSet"
          autosize
          onBlur={this.setField}
        />
      </Form>
    ));

    return (
      <div className="in-out-container">
        {elem}
        <Button type="dashed" onClick={addElem} className="add-set-button">
          <Icon type="plus"/>Добавить проверочный сет
        </Button>
      </div>
    );
  }
}

export default InputOutputSet;
