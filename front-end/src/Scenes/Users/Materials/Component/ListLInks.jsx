import React from 'react';
import { Collapse, List } from 'antd';
import { connect } from 'react-redux';
import { getMaterials, getTopcisForMaterials } from '../Services/Actions/actions';

const { Panel } = Collapse;

const themes = ['Программірованіе', 'Тема2'];

const containerLinks = [
  {
    name: 'Программірованіе',
    links: [1, 2, 4],
  },
  {
    name: 'Тема2',
    links: [2, 4],
  },
];

class ListLinks extends React.Component {
  render() {
    const namesLinks = containerLinks.map(link => link.name);
    const themesInPanel = themes.map((theme) => {
      const indexOfTheme = namesLinks.indexOf(theme);
      const arr = indexOfTheme !== -1 ? containerLinks[indexOfTheme].links : [];
      return (
        <Panel header={theme} key={theme}>
          <List
            dataSource={arr}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Panel>
      );
    });
    return <Collapse accordion>{themesInPanel}</Collapse>;
  }
}

const mapStateToProps = state => ({
  materials: state.materials.allMaterials,
  topics: state.materials.topics,
});

const mapDispatchToProps = dispatch => ({
  getTopics: () => {
    dispatch(getTopcisForMaterials());
  },
  getMaterialsFromServer: () => {
    dispatch(getMaterials());
  },
});

ListLinks.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ListLinks);
