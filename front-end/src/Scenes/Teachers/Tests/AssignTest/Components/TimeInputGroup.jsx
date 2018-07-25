import React from 'react';
import './TimeInputGroup.scss';
import { Input } from 'antd';

const InputGroup = Input.Group;

class TimeInputGroup extends React.PureComponent {
  render() {
    return (
      <div className="parent-group-input">
        <InputGroup compact>
          <Input
            className="input-hour-lead-time"
            name="hourLeadTime"
            placeholder="00"
            // onBlur={this.setTextField}
          />
          <Input
            className="text-between-input"
            placeholder=":"
            disabled
          />
          <Input
            className="input-min-lead-time"
            name="minLeadTime"
            placeholder="00"
            // onBlur={this.setTextField}
          />
          <Input
            className="text-between-input"
            placeholder=":"
            disabled
          />
          <Input
            className="input-second-lead-time"
            name="secondLeadTime"
            placeholder="00"
            // onBlur={this.setTextField}
          />
        </InputGroup>
      </div>
    );
  }
}

export default TimeInputGroup;
