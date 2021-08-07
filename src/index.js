//A react component takes in parameters called props and returns a hierarchy of views to display via the render method.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(_props) {    
      return (
        <button 
           className="square"
           onClick={_props.onClicked}>
          {_props.numba}
        </button>
      );
  }
  
  class Board extends React.Component {
      constructor(props){
          super(props);
          this.state = {
              squares: Array(9).fill(null),
              xIsNext: true,
          }
      }

      handleClick(i){
          const sqrs = this.state.squares.slice();
          if(calculateWinner(sqrs) || sqrs[i])
          {
              return;
          }
          sqrs[i] = this.state.xIsNext ? 'R' : 'C';
          this.setState({
              squares : sqrs,
              xIsNext : !this.state.xIsNext            
            });
      }

      renderSquare(i) {
        //pass a prop called numba to the Square
        return(
        <Square 
         numba={this.state.squares[i]} 
         onClicked={()=> this.handleClick(i)}
        />
        );
    }
  
    render() {
    //   const status = 'Next player: ' + (this.state.xIsNext ? 'Champess' : 'Champe');
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } 
    
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'Champe' : 'Champess');
    }  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }