import React from 'react';
import 'antd/dist/antd.css';
import './AddTask.scss';
import PropTypes from 'prop-types';
import { Input, Button, Icon } from 'antd';

const { TextArea } = Input;

class InputOutputSet extends React.PureComponent {
  static propTypes = {
    testSet: PropTypes.arrayOf(PropTypes.object).isRequired,
    addElem: PropTypes.func.isRequired,
  };

  render() {
    const { testSet, addElem } = this.props;
    const elem = (testSet || []).map((item, i) => (
      <div className="set-container" key={i}>
        <span className="set-num">Сет {i + 1}</span>
        <TextArea placeholder="Входные данные" className="input-set" autosize/>
        <TextArea placeholder="Выходные данные" className="input-set" autosize/>
      </div>
    ));

    return (
      <div className="in-out-container">
        {elem}
        <Button type="dashed" onClick={addElem} className="add-set-button">
          <Icon type="plus" />Добавить проверочный сет
        </Button>
      </div>
    );
  }
}

export default InputOutputSet;
