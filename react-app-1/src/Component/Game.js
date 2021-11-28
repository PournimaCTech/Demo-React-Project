import React, { Component } from 'react';
import Board from './Board';

var calculateWinner = require('../helper/Helper').calculateWinner;


// class Game extends React.Component {
//     render() {
//         return (
//           <div className="game">
//             <div className="game-board">
//               <Board />
//             </div>
//             <div className="game-info">
//               <div>{/* status */}</div>
//               <ol>{/* TODO */}</ol>
//             </div>
//           </div>
//         );
//       }
// }


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    };
  }

  handleClick(i) {
    // const history = this.state.history;
    console.log("this.state.history ----------(handleClick)",this.state.history);
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    console.log("this.state.history.slice(0, this.state.stepNumber + 1) ----------(handleClick)",history);
    const current = history[history.length - 1];
    console.log("current ----------(handleClick)",current);
    const squares1 = current.squares.slice();
    console.log("squares1 ----------(handleClick)",squares1);
    if (calculateWinner(squares1) || squares1[i]) {
      return;
    }
    squares1[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares:squares1
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    console.log("state ----------(handleClick)",this.state);
    console.log("---------------------------------------------------");

  }

  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
    console.log("state ----------(jumpTo)",this.state);
  }
  
  render() {
    const history = this.state.history;
    console.log("history ----------(render)",history);
    // const current = history[history.length - 1];
    const current = history[this.state.stepNumber];
    console.log("current ----------(render)",current);
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      console.log("move",move);
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li  key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    console.log("moves ----------(moves)",moves);


    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
export default Game;
