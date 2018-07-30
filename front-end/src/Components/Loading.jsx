import React from 'react';
import 'antd/dist/antd.css';
import '../Scenes/Teachers/Tasks/AddTask/Components/AddTask.scss';
import './Loading.scss';
import { Icon } from 'antd';

class Loading extends React.PureComponent {
  render() {
    return (
      <div className="loading-container">
        <Icon type="loading" className="loading"/>
      </div>
    );
  }
}

export default Loading;
