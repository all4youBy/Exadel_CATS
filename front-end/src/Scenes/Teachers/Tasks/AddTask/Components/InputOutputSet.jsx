/* eslint-disable prefer-const */
import React from 'react';
import 'antd/dist/antd.css';
import './AddTask.scss';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import addInOutSet from '../Services/Actions/actions';

const { TextArea } = Input;

class InputOutputSet extends React.PureComponent {
  static propTypes = {
    testSet: PropTypes.arrayOf.isRequired,
    addElem: PropTypes.func.isRequired,
  };

  render() {
    const { testSet, addElem } = this.props;
    const elem = (testSet || []).map((data, i) => (
      <div className="in-out-container" key={i}>
        <TextArea placeholder="Входные данные" className="input-task-desc" autosize value={data.in}/>
        <TextArea placeholder="Выходные данные" className="input-task-desc" autosize value={data.out}/>
      </div>
    ));

    return (
      <div className="in-out-container">
        <Button onClick={addElem}>Добавить сет</Button>
        {elem}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    testSet: state.inOutSet.testSet,
  };
}

const mapDispatchToProps = dispatch => ({
  addElem: () => {
    dispatch(addInOutSet());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InputOutputSet);
