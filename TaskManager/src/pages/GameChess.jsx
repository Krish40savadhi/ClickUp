import { useState, useRef, useEffect } from 'react';
import { Modal, Input, Button} from 'antd';
import { Chess } from 'chess.js';
import ChessBoard from '../components/ChessBoard';

export default function ChessGame() {
    const [players, setPlayers] = useState({
        player1: '',
        player2: ''
    });
    const [gameStarted, setGameStarted] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const player1InputRef = useRef(null);
    const [game] = useState(new Chess());
    const [position, setPosition] = useState(game.fen());
    
    // Focus on first input when modal opens
    useEffect(() => {
        if (showModal) {
             setTimeout(() => player1InputRef.current?.focus(), 50);
        }
    }, [showModal]);

      const handleOpenModalFromSplash = () => {
    setShowSplash(false); // hide splash while modal is open
    setShowModal(true);
  };

  const handleCancelModal = () => {
    setShowModal(false);
    setShowSplash(true);
  };
    const handleStartGame = () => {
        setGameStarted(true);
        setShowModal(false);
        setShowSplash(false);
        setPlayers(prev => ({
            player1: prev.player1 || 'Player 1',
            player2: prev.player2 || 'Player 2'
        }));
    };

    return (
        <div className="p-5">
            {showSplash && !gameStarted &&(
                     <div className="splash-container">
                    <div className="splash-card">
                        <h2>Let's play a fun 2-player chess game!</h2>
                        <p>Play locally with a friend — take turns and enjoy.</p>
                        <Button
                            type="primary"
                            size="large"
                            className="splash-start-btn"
                            onClick={handleOpenModalFromSplash}
                        >
                            Start
                        </Button>
                    </div>
                </div>
            )}

                <Modal 
                    open={showModal}
                    title="Start New Chess Game"
                    footer={null}
                    closable={true}
                    maskClosable={false}
                    onCancel={handleCancelModal}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Player 1 (White)
                            </label>
                            <Input
                                ref={player1InputRef}
                                value={players.player1}
                                onChange={e => setPlayers(prev => ({...prev, player1: e.target.value}))}
                                placeholder="Enter player 1 name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Player 2 (Black)
                            </label>
                            <Input
                                value={players.player2}
                                onChange={e => setPlayers(prev => ({...prev, player2: e.target.value}))}
                                placeholder="Enter player 2 name"
                            />
                        </div>
                        <Button type="primary" block onClick={handleStartGame}>
                            Start Game
                        </Button>
                    </div>
                </Modal>

            {gameStarted && (
                <ChessBoard 
                    players={players}
                    game={game}
                    position={position}
                    setPosition={setPosition}
                />
            )}
        </div>
    );
}