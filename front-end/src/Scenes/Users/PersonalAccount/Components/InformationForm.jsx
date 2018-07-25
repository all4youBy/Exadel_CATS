import React from 'react';
import 'antd/dist/antd.css';
import './ButtonAssignTask.scss';
import { Button } from 'antd';

class InformationForm extends React.Component {
  render() {
    return (
      <Button shape="circle" icon="file" className="button-assign-task" size="small"/>
    );
  }
}

export default InformationForm;
