import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Card, Row, Col, Button, Modal, Space } from 'antd'
import {
  UndoOutlined,
  RedoOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './../styles/chessborad.css'

// A fully refactored ChessBoard component with:
// - Promotion UI (modal)
// - Undo / Redo support (redo stack)
// - Sync with parent FEN (position prop)
// - Reset and Exit buttons
// - Live scoring and captured pieces derived from game.history({verbose:true})

export default function ChessBoard({
  players,
  game,
  position,
  setPosition,
  onExit,
}) {
  const navigate = useNavigate()

  // local UI state
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [legalMoves, setLegalMoves] = useState([]) // verbose moves for selected piece
  const [moveHistory, setMoveHistory] = useState(() =>
    game.history({ verbose: true }),
  )
  const [redoStack, setRedoStack] = useState([])

  // Promotion state: when a pawn move requires promotion, open dialog
  const [promotionState, setPromotionState] = useState({
    open: false,
    from: null,
    to: null,
    color: null,
  })

  // Unicode piece glyphs (consistent mapping)
  const UNICODE = useMemo(
    () => ({
      p: '♟',
      n: '♞',
      b: '♝',
      r: '♜',
      q: '♛',
      k: '♚',
      P: '♙',
      N: '♘',
      B: '♗',
      R: '♖',
      Q: '♕',
      K: '♔',
    }),
    [],
  )

  // ---- Keep local moveHistory always in sync with game ----
  const syncFromGame = useCallback(() => {
    // Pull the verbose history from the chess.js instance
    const verbose = game.history({ verbose: true })
    setMoveHistory(verbose)
  }, [game])

  // When parent provides a position (FEN) that's different from the current game, load it
  useEffect(() => {
    try {
      const currentFEN = game.fen()
      if (position && position !== currentFEN) {
        game.load(position)
        syncFromGame()
        setRedoStack([])
        setSelectedSquare(null)
        setLegalMoves([])
      }
    } catch (e) {
      console.warn('Failed to load FEN into chess.js:', e)
    }
  }, [position, game, syncFromGame])

  // Helper: compute algebraic square name
  const sq = (row, col) => `${String.fromCharCode(97 + col)}${8 - row}`

  // Helper: calculate score (material)
  function calculateScore(gameInstance, color) {
    const piecesValue = { p: 1, n: 3, b: 3, r: 5, q: 9 }
    let score = 0
    const board = gameInstance.board()
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j]
        if (piece && piece.color === color)
          score += piecesValue[piece.type] || 0
      }
    }
    return score
  }

  function calculateWinningChances(gameInstance) {
    const whiteScore = calculateScore(gameInstance, 'w')
    const blackScore = calculateScore(gameInstance, 'b')
    const advantage = whiteScore - blackScore
    return {
      white: Math.min(Math.max(50 + advantage * 5, 0), 100),
      black: Math.min(Math.max(50 - advantage * 5, 0), 100),
    }
  }

  // Derived captured lists (always computed from moveHistory so undo/redo keep sync)
  const capturedByWhiteList = useMemo(
    () =>
      moveHistory
        .filter((m) => m.captured && m.color === 'w')
        .map((m) => ({ icon: UNICODE[m.captured], color: 'black' })),
    [moveHistory, UNICODE],
  )

  const capturedByBlackList = useMemo(
    () =>
      moveHistory
        .filter((m) => m.captured && m.color === 'b')
        .map((m) => ({
          icon: UNICODE[m.captured.toUpperCase()],
          color: 'white',
        })),
    [moveHistory, UNICODE],
  )

  // Live stats memo
  const gameStats = useMemo(
    () => ({
      whiteScore: calculateScore(game, 'w'),
      blackScore: calculateScore(game, 'b'),
      capturedByWhite: capturedByWhiteList.length,
      capturedByBlack: capturedByBlackList.length,
      winningChances: calculateWinningChances(game),
    }),
    [
      position,
      moveHistory,
      capturedByWhiteList.length,
      capturedByBlackList.length,
    ],
  )

  // ---- Move handling ----
  const isLegalMove = (row, col) => {
    const square = sq(row, col)
    return legalMoves.some((move) => move.to === square)
  }

  // Attempt to perform a move. If the move requires promotion, open the promotion picker.
  const tryPerformMove = (from, to) => {
    const moves = game.moves({ square: from, verbose: true })
    const candidate = moves.find((m) => m.to === to)
    if (!candidate) return false // illegal

    // If this verbose move indicates promotion (flag contains 'p' or `promotion` present), ask user
    if (
      candidate.promotion ||
      (candidate.flags && candidate.flags.includes('p'))
    ) {
      setPromotionState({ open: true, from, to, color: candidate.color })
      return true // we handled by asking for promotion
    }

    const m = game.move({ from, to, promotion: 'q' }) // default queen if not promotion
    if (m) {
      setPosition(game.fen())
      syncFromGame()
      setRedoStack([])
      setSelectedSquare(null)
      setLegalMoves([])
      return true
    }
    return false
  }

  // Main click handler: select -> show legalMoves -> move
  const handleSquareClick = (row, col) => {
    const square = sq(row, col)

    if (selectedSquare) {
      // If clicked same square, toggle off
      if (selectedSquare === square) {
        setSelectedSquare(null)
        setLegalMoves([])
        return
      }

      // Try to move from selectedSquare to clicked square
      const moved = tryPerformMove(selectedSquare, square)
      if (moved) return

      // If move not performed, maybe user clicked another piece of current side -> select it
      const piece = game.get(square)
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square)
        setLegalMoves(game.moves({ square, verbose: true }))
      } else {
        setSelectedSquare(null)
        setLegalMoves([])
      }
    } else {
      // no selection yet — select piece if belongs to current player
      const piece = game.get(square)
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square)
        setLegalMoves(game.moves({ square, verbose: true }))
      }
    }
  }

  // User chose promotion piece
  const completePromotion = (pieceChar) => {
    const { from, to } = promotionState
    if (!from || !to) return
    const moveObj = game.move({ from, to, promotion: pieceChar })
    if (moveObj) {
      setPosition(game.fen())
      syncFromGame()
      setRedoStack([])
      setSelectedSquare(null)
      setLegalMoves([])
    }
    setPromotionState({ open: false, from: null, to: null, color: null })
  }

  // Undo
  const handleUndo = () => {
    const undone = game.undo()
    if (undone) {
      // push undone move onto redo stack so we can reapply it later
      setRedoStack((prev) => [...prev, undone])
      setPosition(game.fen())
      syncFromGame()
    }
  }

  // Redo (re-apply last undone move)
  const handleRedo = () => {
    const last = redoStack[redoStack.length - 1]
    if (!last) return
    // last contains fields like {color, from, to, piece, promotion}
    const re = game.move({
      from: last.from,
      to: last.to,
      promotion: last.promotion || 'q',
    })
    if (re) {
      setRedoStack((prev) => prev.slice(0, prev.length - 1))
      setPosition(game.fen())
      syncFromGame()
    }
  }

  // Reset board to starting position
  const handleReset = () => {
    game.reset()
    setPosition(game.fen())
    syncFromGame()
    setRedoStack([])
    setSelectedSquare(null)
    setLegalMoves([])
  }

  // Exit board: call onExit if passed, else navigate back
  const handleExit = () => {
    if (onExit && typeof onExit === 'function') return onExit()
    navigate("/dashboard")
  }

  // Render helpers
  const renderPiece = (piece) => {
    if (!piece) return null
    const key =
      piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase()
    return (
      <div
        className={`piece ${piece.color === 'w' ? 'white-piece' : 'black-piece'}`}
      >
        {UNICODE[key]}
      </div>
    )
  }

  const renderSquare = (piece, row, col) => {
    const squareName = sq(row, col)
    const isSelected = selectedSquare === squareName
    const isLegal = isLegalMove(row, col)

    return (
      <div
        key={`${row}-${col}`}
        className={`chess-square ${(row + col) % 2 === 0 ? 'square-light' : 'square-dark'} ${isSelected ? 'selected' : ''} ${isLegal ? 'legal-move' : ''}`}
        onClick={() => handleSquareClick(row, col)}
      >
        {renderPiece(piece)}
        {col === 0 && (
          <span className="coordinate coordinate-row">{8 - row}</span>
        )}
        {row === 7 && (
          <span className="coordinate coordinate-col">
            {String.fromCharCode(97 + col)}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="chess-container">
      <Row gutter={[16, 16]} className="chess-row">
        <Col xs={24} md={6} className="side-col">
          <PlayerCard
            name={players.player1}
            score={gameStats.whiteScore}
            capturedList={capturedByWhiteList}
            winChance={gameStats.winningChances.white}
            isActive={game.turn() === 'w'}
          />

          <div className="move-history">
            <h3>Move History</h3>
            {moveHistory.length === 0 && (
              <div className="muted">No moves yet</div>
            )}
            {moveHistory.map((move, i) => (
              <div key={i}>
                {i + 1}. {move.san}
              </div>
            ))}
          </div>
        </Col>

        <Col xs={24} md={12} className=" chess-board-wrapper">
          <div
            className="board-toolbar"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginBottom: 12,
            }}
          >
            <Space>
              <Button
                icon={<UndoOutlined />}
                onClick={handleUndo}
                disabled={moveHistory.length === 0}
              >
                Undo
              </Button>
              <Button
                icon={<RedoOutlined />}
                onClick={handleRedo}
                disabled={redoStack.length === 0}
              >
                Redo
              </Button>
              <Button icon={<ReloadOutlined />} onClick={handleReset}>
                Reset
              </Button>
            </Space>
            <Space>
              <Button icon={<ArrowLeftOutlined />} onClick={handleExit}>
                Exit
              </Button>
            </Space>
          </div>

          <div className="chess-board">
            {game
              .board()
              .map((row, i) =>
                row.map((piece, j) => renderSquare(piece, i, j)),
              )}
          </div>
        </Col>

        <Col xs={24} md={6} className="side-col">
          <PlayerCard
            name={players.player2}
            score={gameStats.blackScore}
            capturedList={capturedByBlackList}
            winChance={gameStats.winningChances.black}
            isActive={game.turn() === 'b'}
          />
        </Col>
      </Row>

      {/* Promotion modal */}
      <Modal
        open={promotionState.open}
        title="Choose promotion"
        onCancel={() =>
          setPromotionState({ open: false, from: null, to: null, color: null })
        }
        footer={null}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button className="promo-btn" onClick={() => completePromotion('q')}>
            Queen (Q)
          </button>
          <button className="promo-btn" onClick={() => completePromotion('r')}>
            Rook (R)
          </button>
          <button className="promo-btn" onClick={() => completePromotion('b')}>
            Bishop (B)
          </button>
          <button className="promo-btn" onClick={() => completePromotion('n')}>
            Knight (N)
          </button>
        </div>
      </Modal>
    </div>
  )
}

function PlayerCard({ name, score, capturedList = [], winChance, isActive }) {
  return (
    <Card
      title={name}
      headStyle={{ fontSize: '1.1rem', fontWeight: 600 }}
      bodyStyle={{ padding: '12px' }}
      className={`player-card ${isActive ? 'active' : ''}`}
    >
      <div className="player-card-inner">
        <div className="score-section">
          <div className="score-label">Score</div>
          <div className="score-value">{score}</div>
        </div>

        <div className="captured-block">
          <div className="captured-title">Captured</div>
          <div className="captured-pieces">
            {capturedList.length > 0 ? (
              capturedList.map((p, idx) => (
                <span key={idx} className={`captured-piece-icon ${p.color}`}>
                  {p.icon}
                </span>
              ))
            ) : (
              <span className="captured-placeholder">—</span>
            )}
          </div>
        </div>

        <div className="win-chance">
          Winning Chance: {winChance.toFixed(1)}%
        </div>
      </div>
    </Card>
  )
}
