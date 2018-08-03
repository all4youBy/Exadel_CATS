// /* eslint-disable no-unused-vars */
// import React from 'react';
// import './MaterialsList.scss';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Collapse, Badge } from 'antd';
// import ButtonAddLink from './ButtonAddLink';
//
// const { Panel } = Collapse;
//
// class MaterialsList extends React.PureComponent {
//   render() {
//     const themes = data.map((element) => {
//       const links = element.links.map((item) => {
//         const text = <Link to="item.link">{item.link}</Link>;
//         return (<div><Badge status="default" text={text}/></div>);
//       });
//       return (
//         <Panel header={element.theme} key={element.key}>
//           <div className="materials-links">{links}
//             <ButtonAddLink className="button-add-link"/>
//           </div>
//         </Panel>
//       );
//     });
//     return (
//       <Collapse defaultActiveKey={['1']}>
//         {themes}
//       </Collapse>
//     );
//   }
// }
//
//
// function mapStateToProps(state) {
//   return { students: state.groupStudentsList.group };
// }
//
// const mapDispatchToProps = dispatch => ({
//   // handleStudentAdd: (book) => {
//   //   dispatch(addStudent(book));
//   // },
//   // handleStudentDelete: (key) => {
//   //   dispatch(deleteStudent(key));
//   // },
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(MaterialsList);
