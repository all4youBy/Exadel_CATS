import React from 'react';
import 'antd/dist/antd.css';
import './ButtonAddLink.scss';
import { Cascader, Button, List } from 'antd';
import PropTypes from 'prop-types';

class MaterialsList extends React.Component {
  static propTypes = {
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf(PropTypes.any).isRequired,
    getMaterial: PropTypes.func.isRequired,
    material: PropTypes.arrayOf(PropTypes.any).isRequired,
  };

  state = {
    tagId: '',
  };

  componentDidMount() {
    const { getTopics } = this.props;
    getTopics();
  }

  onChange = (value) => {
    this.setState(({ tagId: value[value.length - 1].id }));
  };

  onSelect = () => {
    const { getMaterial } = this.props;
    const { tagId } = this.state;
    getMaterial(tagId);
  };

  render() {
    const data = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];
    const { topics, material } = this.props;
    const { tag } = this.state;
    console.log(tag);
    const placeholderText = (topics && topics[0]) ? topics[0].label : 'Выберите тему';
    const content = material ? (
      <div>
        <Cascader
          options={topics}
          onChange={this.onChange}
          placeholder={placeholderText}
          changeOnSelect
        />
        <Button
          onClick={this.onSelect}
        >OK
        </Button>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<div>{item.title}</div>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
    ) : <div/>;


    return (<div>{content}</div>);
  }
}

export default MaterialsList;
