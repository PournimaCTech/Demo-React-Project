import React from 'react';

// class Square extends React.Component {
//     constructor(props) {
//       super(props);
//       // this.state = {
//       //   value: null,
//       // };
//     }
//     render() {
//       console.log("jvbnm,");
//       return (
//         // <button className="square" onClick={function() { console.log('click'); }}>
//         // <button className="square" onClick={()=>{console.log('click',this.props.Ukey); }}>
//         <button 
//                 className="square" 
//                 onClick={
//                   () => this.props.onClick()}
//         >
//           {this.props.value}
//         </button>
//       );
//     }
//   }

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
export default Square;
