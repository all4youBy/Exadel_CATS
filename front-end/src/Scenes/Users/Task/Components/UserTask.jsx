import React from 'react';
import './UserTask.scss';
import { Upload, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import requestLoginInformation from '../../../../Services/loginService';

let count = 0;

class UserTask extends React.Component {
  static propTypes = {
    uploadFiles: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    getTaskInformation: PropTypes.func.isRequired,
    taskId: PropTypes.string.isRequired,
    taskInfo: PropTypes.arrayOf.isRequired,
    getAddSolution: PropTypes.func.isRequired,
  };

  state = {
    fileList: [],
    uploading: false,
  };

  componentDidMount = () => {
    const { getTaskInformation, taskId } = this.props;
    getTaskInformation(requestLoginInformation().email, taskId);
  };

  handleUpload = () => {
    const { uploadFiles, taskInfo } = this.props;
    const { fileList } = this.state;
    const formData = new FormData();
    console.log(fileList[0], 855);
    // fileList.forEach((file) => {
    // formData.append('file', file);
    // });
    // uploadFiles(formData, taskInfo.solution.id);
    formData.append('file', fileList[0]);
    count += 1;
    console.log(count);
    uploadFiles(formData, taskInfo.solution.id);
    this.setState({
      uploading: true,
    });
    // You can use any AJAX library you like
    // reqwest({
    // url: '//jsonplaceholder.typicode.com/posts/',
    // method: 'post',
    // processData: false,
    // data: formData,
    // success: () => {
    // this.setState({
    // fileList: [],
    // uploading: false,
    // });
    // message.success('upload successfully.');
    // },
    // error: () => {
    // this.setState({
    // uploading: false,
    // });
    // message.error('upload failed.');
    // },
    // });
  };

  handleAddSolution = () => {
    const { getAddSolution, taskInfo } = this.props;
    // fileList.forEach((file) => {
    // formData.append('file', file);
    // });
    // uploadFiles(formData, taskInfo.solution.id);
    getAddSolution({}, taskInfo.solution.id);
    // You can use any AJAX library you like
    // reqwest({
    // url: '//jsonplaceholder.typicode.com/posts/',
    // method: 'post',
    // processData: false,
    // data: formData,
    // success: () => {
    // this.setState({
    // fileList: [],
    // uploading: false,
    // });
    // message.success('upload successfully.');
    // },
    // error: () => {
    // this.setState({
    // uploading: false,
    // });
    // message.error('upload failed.');
    // },
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
          onClick={this.handleAddSolution}
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
