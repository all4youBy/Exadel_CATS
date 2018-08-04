/* eslint-disable react/no-array-index-key,react/jsx-no-bind,no-undef */
import React from 'react';
import 'antd/dist/antd.css';
import './AddTask.scss';
import PropTypes from 'prop-types';
import { Input, Button, Icon, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

class InputOutputSet extends React.PureComponent {
  static propTypes = {
    testSet: PropTypes.arrayOf(PropTypes.object).isRequired,
    addElem: PropTypes.func.isRequired,
    testSets: PropTypes.arrayOf(PropTypes.object).isRequired,
    setTestSets: PropTypes.func.isRequired,
  };

  setField = (event) => {
    const { name } = event.target;
    const { id } = event.target.closest('.set-container');
    const { value } = event.target;
    const { testSets, setTestSets } = this.props;
    if (!testSets[id]) {
      testSets[id] = {};
    }
    switch (name) {
      case 'inputSet': {
        if (value !== '') {
          testSets[id].input = value;
        }
        break;
      }
      case 'outputSet': {
        if (value !== '') {
          testSets[id].output = value;
        }
        break;
      }
      default: {
        if (value) {
          testSets[id].difficultyLevel = value;
          break;
        }
        testSets[id].difficultyLevel = null;
        break;
      }
    }
    setTestSets(testSets);
  };

  setSelectionValue = (id, value) => {
    const { testSets, setTestSets } = this.props;
    if (!testSets[id]) {
      testSets[id] = {};
    }
    testSets[id].difficultyLevel = +value;
    console.log(testSets[id].difficultyLevel, 805);
    setTestSets(testSets);
  };

  render() {
    const options = [];
    const { testSet, addElem } = this.props;
    for (let index = 0; index <= 10; index += 1) {
      options.push(<Option value={index}>{index}</Option>);
    }
    const elem = (testSet || []).map((item, i) => (
      <div className="set-container" onBlur={this.setField} id={i}>
        <span className="set-num">Сет {i + 1}</span>
        <Select
          defaultValue="0"
          name="level"
          className="select-add-task"
          onBlur={this.setSelectionValue.bind(this, i)}
        >
          {options}
        </Select>
        <TextArea
          id={i}
          placeholder="Входные данные"
          className="input-set"
          name="inputSet"
          autosize
          onBlur={this.setField}
        />
        <TextArea
          id={i}
          placeholder="Выходные данные"
          className="input-set"
          name="outputSet"
          autosize
          onBlur={this.setField}
        />
      </div>
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
