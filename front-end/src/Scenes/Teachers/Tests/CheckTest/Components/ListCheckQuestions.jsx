import React from 'react';
import './ListCheckQuestions.scss';
import TestNameAndThemes from '../../../../Users/Tests/Components/TestNameAndThemes';
import OpenAnswer from './OpenAnswerQuestion';
import ButtonFinishTest from './ButtonFinishTest';

const listData = [];
for (let i = 0; i < 15; i += 1) {
  listData.push({
    href: 'http://ant.design',
    title: `Тест ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: 'Плюшкин Иван Васильевич',
  });
}

class ListCheckQuestions extends React.Component {
  render() {
    return (
      <div className="test">
        <TestNameAndThemes/>
        <OpenAnswer/>
        <ButtonFinishTest/>
      </div>
    );
  }
}

export default ListCheckQuestions;
