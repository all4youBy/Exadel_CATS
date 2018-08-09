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
    deleteSet: PropTypes.func.isRequired,
    difficulty: PropTypes.bool.isRequired,
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
    setTestSets(testSets);
  };

  deleteSet = (id) => {
    const { deleteSet } = this.props;
    deleteSet(id);
  };

  render() {
    const options = [];
    const { testSet, addElem, difficulty } = this.props;
    for (let index = 0; index <= 10; index += 1) {
      options.push(<Option value={index}>{index}</Option>);
    }
    let elem = null;
    if (difficulty) {
      elem = (testSet || []).map((item, i) => (
        <div className="set-container" onBlur={this.setField} id={item.key}>
          <span className="set-num">Сет {i + 1}</span>
          <Select
            defaultValue="0"
            name="level"
            className="select-add-task"
            onBlur={this.setSelectionValue.bind(this, item.key)}
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
          <Button
            onClick={this.deleteSet.bind(this, item.key)}
            shape="circle"
            icon="close"
            className="button-table"
            size="small"
          />
        </div>
      ));
    } else {
      elem = (testSet || []).map((item, i) => (
        <div className="set-container" onBlur={this.setField} id={item.key}>
          <span className="set-num">Сет {i + 1}</span>
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
          <Button
            onClick={this.deleteSet.bind(this, item.key)}
            shape="circle"
            icon="close"
            className="button-table"
            size="small"
          />
        </div>
      ));
    }

    // this.setState(({
    //   [arraySets]: elem,
    // }));
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
