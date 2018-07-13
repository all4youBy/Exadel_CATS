import React from 'react';
import 'antd/dist/antd.css';
import './UserTask.scss';
import { Upload, Button, Icon, Select } from 'antd';

const { Option } = Select;

export default class UserTask extends React.PureComponent {
  state = {}

  handleChange = (info) => {
    let { fileList } = info;


    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });

    this.setState({ fileList });
  };

  render() {
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange: this.handleChange,
      multiple: true,
    };
    const { fileList } = this.state;
    return (
      <div className="task-container">
        <h1>Название задачи</h1>
        <p>Постановка задачи. Включает формат входных/выходных данных и разбиение по оценкам.
        </p>
        <div className="upload-task-buttons">
          <Select style={{ width: 200 }} placeholder="Выберите компилятор">
            <Option value="java">Java</Option>
            <Option value="c++">C++</Option>
          </Select>
          <Upload style={{ margin: 10 }} {...props} fileList={fileList}>
            <Button>
              <Icon type="upload"/> Загрузить
            </Button>
          </Upload>
          <Button type="primary" className="submit-button">Отправить</Button>
        </div>
      </div>
    );
  }
}
