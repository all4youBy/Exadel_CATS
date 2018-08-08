import React from 'react';
import 'antd/dist/antd.css';
import './Materials.scss';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import MaterialsList from '../Components/MaterialsList';
import { getTopicsMaterials, getMaterialInfo } from '../Services/Actions/actions';

class Materials extends React.Component {
  static propTypes = {
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf(PropTypes.any).isRequired,
    getMaterial: PropTypes.func.isRequired,
    material: PropTypes.arrayOf(PropTypes.any).isRequired,
  };

  render() {
    const { getTopics, topics, getMaterial, material } = this.props;
    return (
      <div><MaterialsList
        getTopics={getTopics}
        topics={topics}
        getMaterial={getMaterial}
        material={material}
      />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    topics: state.materials.topics,
    material: state.materials.material,
  };
}

const mapDispatchToProps = dispatch => ({
  getTopics: () => {
    dispatch(getTopicsMaterials());
  },
  getMaterial: (id) => {
    dispatch(getMaterialInfo(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Materials);
