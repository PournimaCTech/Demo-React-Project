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
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares1 = current.squares.slice();
    if (calculateWinner(squares1) || squares1[i]) {
      return;
    }
    squares1[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares:squares1
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      console.log("move",move);
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

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
