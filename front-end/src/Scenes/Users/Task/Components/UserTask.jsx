/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import './UserTask.scss';
import { Upload, Button, Icon, Tag } from 'antd';
import PropTypes from 'prop-types';
import requestLoginInformation from '../../../../Services/loginService';
import Loading from '../../../../Components/Loading';

class UserTask extends React.Component {
  static propTypes = {
    uploadFiles: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    getTaskInformation: PropTypes.func.isRequired,
    taskId: PropTypes.string.isRequired,
    taskInfo: PropTypes.arrayOf.isRequired,
    getAddSolution: PropTypes.func.isRequired,
    response: PropTypes.string.isRequired,
    deleteSolution: PropTypes.func.isRequired,
    responseAddFile: PropTypes.bool.isRequired,
    clearResponse: PropTypes.func.isRequired,
  };

  state = {
    fileList: [],
    uploading: false,
  };

  componentDidMount() {
    const { getTaskInformation, taskId } = this.props;
    getTaskInformation(requestLoginInformation().email, taskId);
  }

  // componentDidUpdate() {
  //   const { response } = this.props;
  //   // if (response.solution) {
  //   //   this.setState(({ uploading: true }));
  //   //   message.success(`Решение добавлено. Ваша отметка: ${response.solution.mark}`);
  //   //   history.push('/assignedtasks');
  //   // }
  // }

  handleUpload = () => {
    const { uploadFiles, taskInfo, clearResponse, responseAddFile } = this.props;
    const { fileList } = this.state;
    const formData = new FormData();
    if (fileList.length !== 0) {
      formData.append('file', fileList[fileList.length - 1]);
      clearResponse();
      console.log(responseAddFile, 893);
      uploadFiles(formData, taskInfo.solution.id);
    }
  };

  handleAddSolution = () => {
    const { getAddSolution, taskInfo } = this.props;
    getAddSolution({}, taskInfo.solution.id);
    this.setState({
      uploading: true,
    });
  };

  handleDeleteSolution = () => {
    const { deleteSolution, taskInfo } = this.props;
    deleteSolution(taskInfo.solution.id);
    const element = document.querySelector('.delete-files');
    element.classList.add('hide');
  };

  render() {
    let { uploading } = this.state;
    const { responseAddFile, clearResponse } = this.props;
    const { fileList: files } = this.state;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      // onRemove: (file) => {
      //   this.setState(({ fileList }) => {
      //     const index = fileList.indexOf(file);
      //     const newFileList = fileList.slice();
      //     newFileList.splice(index, 1);
      //     return {
      //       fileList: newFileList,
      //     };
      //   });
      // },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: files,
    };

    function formatDate(date) {
      let dd = date.getDate();
      if (dd < 10) dd = `0${dd}`;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = `0${mm}`;

      let yy = date.getFullYear() % 100;
      if (yy < 10) yy = `0${yy}`;

      return `${dd}.${mm}.${yy}`;
    }

    const { fileList } = this.state;
    const { taskInfo, response } = this.props;
    let deadline = null;
    let tags = [];
    if (taskInfo && taskInfo.topicIds) {
      tags = taskInfo.topicIds.map(element => <Tag color="blue">{element}</Tag>);
    }
    if (taskInfo.solution) {
      const date = new Date(taskInfo.solution.deadline);
      deadline = formatDate(date);
    }
    let deleteFiles = <div/>;
    if (taskInfo.solution && taskInfo.solution.files && taskInfo.solution.files.length) {
      const fileNames = taskInfo.solution.files.map(element => (<div>{element}</div>));
      deleteFiles = (
        <div className="delete-files">
          <span className="text-delete-file">Удалите раннее загруженные файлы,
      чтобы добавить новое решение:
          </span>
          {fileNames}
          <Button
            className="button-table-with-border"
            type="primary"
            onClick={this.handleDeleteSolution}
          >Удалить
          </Button>
        </div>
      );
    }
    if (response) {
      uploading = false;
    }
    console.log(fileList.length === 0 || responseAddFile, 896);
    let container = taskInfo.solution ? (
      <div>
        <div className="task-title">
          <div className="text-task-title">{taskInfo.title}</div>
          <div className="author-task-title"> Автор: {taskInfo.solution.assignedBy}</div>
          <div>Дата сдачи: {deadline} </div>
        </div>
        <div className="tags">{tags}</div>
        <div className="task-text-border">
          <div className="task-text">{taskInfo.text}</div>
        </div>
        <div className="parent-buttons">
          <Upload {...props}>
            <Button
              className="button-load-file"
              onBlur={this.handleUpload}
              onclick={clearResponse}
            >
              <Icon type="upload"/> Выбрать файл
            </Button>
          </Upload>
          {deleteFiles}
          <Button
            className="upload-button"
            type="primary"
            onClick={this.handleAddSolution}
            disabled={fileList.length === 0}
            loading={uploading}
          >
            {uploading ? 'Загрузить' : 'Загрузить'}
          </Button>
        </div>
      </div>) : <Loading/>;
    if (response.solution) {
      container = <div className="mark-add-solution">Ваша отметка: {response.solution.mark}</div>;
    }
    return (
      <div className="add-solution-task-container">
        {container}
      </div>);
  }
}


export default UserTask;
