import React from 'react';
import './MaterialsList.scss';
import { Link } from 'react-router-dom';
import { Collapse, Badge } from 'antd';
import ButtonAddLink from './ButtonAddLink';

const { Panel } = Collapse;

class MaterialsList extends React.PureComponent {
  render() {
    const data = [{
      key: '1',
      theme: 'Программирование',
      links: [{
        link: 'Java',
        comment: 'aaaaaaaaaa',
      }, {
        link: 'C++',
        comment: 'oooooooooo',
      }, {
        link: 'Java Scripts',
        comment: 'eeeeeeeeee',
      }],
    }, {
      key: '2',
      theme: 'Математика',
      links: [{
        link: 'ФАН',
        comment: 'идрои',
      }, {
        link: 'Матан',
        comment: 'ролио',
      }],
    }];
    const themes = data.map((element) => {
      const links = element.links.map((item) => {
        const text = <Link to="item.link">{item.link}</Link>;
        return (<div><Badge status="default" text={text}/></div>);
      });
      return (
        <Panel header={element.theme} key={element.key}>
          <div className="materials-links">{links}
            <ButtonAddLink className="button-add-link"/>
          </div>
        </Panel>
      );
    });
    return (
      <Collapse defaultActiveKey={['1']}>
        {themes}
      </Collapse>
    );
  }
}

export default MaterialsList;
