import { useState, useMemo } from 'react';
import { Card, Row, Col, Badge } from 'antd';
import './../styles/chessborad.css';

export default function ChessBoard({ players, game, position, setPosition }) {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);

  // Unicode glyphs map (both lower/upper keys for convenience)
  const UNICODE = {
    p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚',
    P: '♙', N: '♘', B: '♗', R: '♖', Q: '♕', K: '♔'
  };

  // Derived captured lists (from moveHistory). capturedByWhite = pieces white captured from black
  const capturedByWhiteList = useMemo(
    () => moveHistory.filter(m => m.captured && m.color === 'w').map(m => UNICODE[m.captured]),
    [moveHistory]
  );
  const capturedByBlackList = useMemo(
    () => moveHistory.filter(m => m.captured && m.color === 'b').map(m => UNICODE[m.captured.toUpperCase()]),
    [moveHistory]
  );

  // Live game stats — recompute when position or moveHistory changes
  const gameStats = useMemo(() => {
    return {
      whiteScore: calculateScore(game, 'w'),
      blackScore: calculateScore(game, 'b'),
      capturedByWhite: capturedByWhiteList.length,
      capturedByBlack: capturedByBlackList.length,
      winningChances: calculateWinningChances(game)
    };
  }, [position, moveHistory]); // position is the FEN passed from parent and is updated after each move

  // ========== Helpers ==========
  function calculateScore(game, color) {
    // values for piece types (chess.js uses lowercase for piece.type)
    const piecesValue = { p: 1, n: 3, b: 3, r: 5, q: 9 };
    let score = 0;
    const board = game.board();
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece && piece.color === color) {
          score += piecesValue[piece.type] || 0;
        }
      }
    }
    return score;
  }

  function calculateWinningChances(game) {
    const whiteScore = calculateScore(game, 'w');
    const blackScore = calculateScore(game, 'b');
    const advantage = whiteScore - blackScore;
    return {
      white: Math.max(50 + advantage * 5, 0),
      black: Math.max(50 - advantage * 5, 0)
    };
  }

  // ========== Board interactions ==========
  const handleSquareClick = (row, col) => {
    const square = `${String.fromCharCode(97 + col)}${8 - row}`;

    if (selectedSquare) {
      try {
        // game.move returns a move object (with captured if any) — push that into moveHistory
        const move = game.move({
          from: selectedSquare,
          to: square,
          promotion: 'q'
        });

        if (move) {
          setPosition(game.fen()); // notify parent about position (FEN) — used to re-render and update stats
          setMoveHistory(prev => [...prev, move]); // record verbose move object returned
        }

        setSelectedSquare(null);
        setLegalMoves([]);
      } catch (e) {
        // if move throws — treat as selection attempt
        if (game.get(square)) {
          setSelectedSquare(square);
          setLegalMoves(game.moves({ square, verbose: true }));
        } else {
          setSelectedSquare(null);
          setLegalMoves([]);
        }
      }
    } else {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        setLegalMoves(game.moves({ square, verbose: true }));
      }
    }
  };

  const isLegalMove = (row, col) => {
    const square = `${String.fromCharCode(97 + col)}${8 - row}`;
    return legalMoves.some(move => move.to === square);
  };

  // Render a single piece (uses UNICODE map)
  const renderPiece = (piece) => {
    if (!piece) return null;
    // chess.js gives piece.type in lowercase; color tells us white/black
    const key = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
    return (
      <div className={`piece ${piece.color === 'w' ? 'white-piece' : 'black-piece'}`}>
        {UNICODE[key]}
      </div>
    );
  };

  // Render square with coordinates + piece
  const renderSquare = (piece, row, col) => {
    const isSelected = selectedSquare === `${String.fromCharCode(97 + col)}${8 - row}`;
    const isLegal = isLegalMove(row, col);

    return (
      <div
        key={`${row}-${col}`}
        className={`chess-square ${(row + col) % 2 === 0 ? 'square-light' : 'square-dark'} ${isSelected ? 'selected' : ''} ${isLegal ? 'legal-move' : ''}`}
        onClick={() => handleSquareClick(row, col)}
      >
        {renderPiece(piece)}
        {col === 0 && <span className="coordinate coordinate-row">{8 - row}</span>}
        {row === 7 && <span className="coordinate coordinate-col">{String.fromCharCode(97 + col)}</span>}
      </div>
    );
  };

  return (
    <div className="chess-container">
      <Row gutter={16} className="chess-row">
        <Col span={6} className="side-col">
          <PlayerCard
            name={players.player1}
            score={gameStats.whiteScore}
            capturedList={capturedByWhiteList}
            winChance={gameStats.winningChances.white}
            isActive={game.turn() === 'w'}
          />

          <div className="move-history">
            <h3>Move History</h3>
            {moveHistory.length === 0 && <div className="muted">No moves yet</div>}
            {moveHistory.map((move, i) => (
              <div key={i}>{i + 1}. {move.san}</div>
            ))}
          </div>
        </Col>

        <Col span={12} className="center-col">
          <div className="chess-board-wrapper">
            <div className="chess-board">
              {game.board().map((row, i) => row.map((piece, j) => renderSquare(piece, i, j)))}
            </div>
          </div>
        </Col>

        <Col span={6} className="side-col">
          <PlayerCard
            name={players.player2}
            score={gameStats.blackScore}
            capturedList={capturedByBlackList}
            winChance={gameStats.winningChances.black}
            isActive={game.turn() === 'b'}
          />
        </Col>
      </Row>
    </div>
  );
}

function PlayerCard({ name, score, capturedList = [], winChance, isActive }) {
  return (
    <Card title={name} headStyle={{ fontSize: '1.8rem' }} bodyStyle={{ padding: '10px',fontSize:'1.8rem'}} className={`player-card ${isActive ? 'active' : ''}`}>
      <div className="player-card-inner">
        <div className="score-section">
        <div className="score-label">Score</div>
        <div className="score-value">{score}</div>
        </div>
        <div className="captured-block">
          <div className="captured-title">Captured</div>
          <div className="captured-pieces">
            {capturedList.length > 0
              ? capturedList.map((icon, idx) => <span key={idx} className="captured-piece-icon">{icon}</span>)
              : <span className="captured-placeholder">—</span>
            }
          </div>
        </div>

        <div className="win-chance">Winning Chance: {winChance.toFixed(1)}%</div>
      </div>
    </Card>
  );
}
