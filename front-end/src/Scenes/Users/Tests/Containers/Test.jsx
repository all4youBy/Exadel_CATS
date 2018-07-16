import React from 'react';
import { Button } from 'antd';
import './Test.scss';
import SingleAnswer from '../Components/SingleAnswerQuestion';
import MultipleAnswer from '../Components/MultipleAnswersQuestion';
import OpenAnswer from '../Components/OpenAnswerQuestion';
import SymbolAnswersQuestion from '../Components/SymbolAnswerQuestion';

export default class Test extends React.PureComponent {
  render() {
    return (
      <div className="test">
        <SingleAnswer/>
        <MultipleAnswer/>
        <SymbolAnswersQuestion/>
        <OpenAnswer/>
        <Button type="primary" style={{ margin: 10, width: 'auto' }}>Завершить</Button>
      </div>
    );
  }
}
