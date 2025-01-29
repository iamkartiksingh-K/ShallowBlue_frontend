import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import type { Color, Move, Square } from "chess.js";
import "./App.css";

function App() {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move: Move) {
    const result = game.move(move);
    setGame(new Chess(game.fen()));
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function engineMove() {
    const possibleMoves = game.moves({ verbose: true });
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }
  function humanMove(sourceSquare: string, targetSquare: string) {
    if (game.isGameOver() || game.isDraw() || game.isStalemate()) return;
    const move = makeAMove({
      from: sourceSquare as Square,
      to: targetSquare as Square,
    } as Move);
    return move;
  }
  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = humanMove(sourceSquare, targetSquare);
    if (move === null) return false;
    setTimeout(engineMove, 200);
    return true;
  }

  return (
    <div className="app">
      <div className="board">
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        <button type="button" onClick={engineMove}>
          random move
        </button>
      </div>
    </div>
  );
}

export default App;
