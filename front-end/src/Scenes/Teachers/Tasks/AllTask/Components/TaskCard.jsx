import React from 'react';
import 'antd/dist/antd.css';
import './TaskCard.scss';
import { Card } from 'antd';

class TaskCard extends React.Component {
  render() {
    return (
      <Card
        style={{ width: 300 }}
        cover={(
          <div>
            <div className="parent-task-title">
              <div className="task-title-name">Название</div>
              <div className="task-title-author">Автор</div>
            </div>
            <div>Дата</div>
          </div>
        )}
        // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
      />
    );
  }
}

export default TaskCard;
