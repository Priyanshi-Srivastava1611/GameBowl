import React from 'react';
import { useSelector } from 'react-redux';
import Scorecard from '../Scorecard';
import Controls from '../Controls';
import './Game.css';

const Game = () => {
  const {
    frames,
    cumulativeScores,
    gameOver,
    pins,
    rolls,
  } = useSelector(state => state.game);

  const totalScore = cumulativeScores.slice(-1)[0];

  return (
    <div className='Game'>
      <Controls
        gameOver={gameOver}
        lastRoll={pins.slice(-1)[0]}
        rolls={rolls}
      />
      <Scorecard
        frames={frames}
        cumulativeScores={cumulativeScores}
        totalScore={totalScore}
      />
      {gameOver && (
        <div className='Game-over-text'>
          <h1>Game Over</h1>
          <h2>You Scored: {totalScore}</h2>
        </div>
      )}
    </div>
  );
};

export default Game;
