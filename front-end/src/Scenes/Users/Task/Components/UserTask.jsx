import React from 'react';
import 'antd/dist/antd.css';
import './UserTask.scss';
import { Upload, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
// import reqwest from 'reqwest';

// const { Option } = Select;
//
// export class UserTask extends React.PureComponent {
//   state = {
//     fileList: [{
//       uid: -1,
//       name: 'xxx.png',
//       status: 'done',
//       url: 'http://www.baidu.com/xxx.png',
//     }],
//   };
//
//   handleChange = (info) => {
//     let { fileList } = info;
//     // 2. read from response and show file link
//     fileList = fileList.map((file) => {
//       if (file.response) {
//         // Component will show file.url as link
//         file.url = file.response.url;
//       }
//       return file;
//     });
//
//     // 3. filter successfully uploaded files according to response from server
//     fileList = fileList.filter((file) => {
//       if (file.response) {
//         return file.response.status === 'success';
//       }
//       return true;
//     });
//
//     this.setState({ fileList });
//   };
//
//   render() {
//     const props = {
//       action: '//jsonplaceholder.typicode.com/posts/',
//       onChange: this.handleChange,
//       multiple: true,
//     };
//     const { fileList } = this.state;
//     return (
//       <div className="task-container">
//         <h1>Название задачи</h1>
//         <p>Постановка задачи. Включает формат входных/выходных данных и разбиение по оценкам.
//         </p>
//         <div className="upload-task-buttons">
//           <Select style={{ width: 200 }} placeholder="Выберите компилятор">
//             <Option value="java">Java</Option>
//             <Option value="c++">C++</Option>
//           </Select>
//           <Upload style={{ margin: 10 }} {...props} fileList={fileList}>
//             <Button>
//               <Icon type="upload"/> Загрузить
//             </Button>
//           </Upload>
//           <Button type="primary" className="submit-button">Отправить</Button>
//         </div>
//       </div>
//     );
//   }
// }
//

class UserTask extends React.Component {
  static propTypes = {
    uploadFiles: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  };

  state = {
    fileList: [],
    uploading: false,
  };

  handleUpload = () => {
    const { uploadFiles } = this.props;
    const { fileList } = this.state;
    console.log(fileList);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
      console.log(formData, 88888);
    });
    this.setState({
      uploading: true,
    });

    uploadFiles(formData);
    // You can use any AJAX library you like
    // reqwest({
    //   url: '//jsonplaceholder.typicode.com/posts/',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });
  };

  render() {
    const { uploading } = this.state;
    const { fileList: files } = this.state;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: files,
    };
    const { fileList } = this.state;
    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload"/> Select File
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  }
}


export default UserTask;
