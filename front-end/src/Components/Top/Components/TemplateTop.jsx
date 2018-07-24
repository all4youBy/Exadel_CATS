import React from 'react';
import PropTypes from 'prop-types';
import './TemplateTop.scss';

class TemplateTop extends React.PureComponent {
  render() {
    const { listUsers, nameTop, nameTheFirstColumn, nameTheSecondColumn } = this.props;
    const formedTable = (listUsers || []).map(element => (
      <tr key={element.id}>
        <td className="left">{element.name}</td>
        <td className="right">{element.score}</td>
      </tr>
    ));
    return (
      <div align="center">
        <h4>{nameTop}</h4>
        <table>
          <thead>
            <tr>
              <th className="left">{nameTheFirstColumn}</th>
              <th className="right">{nameTheSecondColumn}</th>
            </tr>
          </thead>
          <tbody>
            {formedTable}
          </tbody>
        </table>
      </div>
    );
  }
}

TemplateTop.propTypes = {
  listUsers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  nameTop: PropTypes.string.isRequired,
  nameTheFirstColumn: PropTypes.string.isRequired,
  nameTheSecondColumn: PropTypes.string.isRequired,
};

export default TemplateTop;
