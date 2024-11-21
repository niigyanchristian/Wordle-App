import React, { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';


import CustomGrid from './CustomGrid';
import CustomKeypad from './CustomKeypad';
import CustomModal from './CustomModal';
import { WordleProps } from '../types/interfaces';


const Wordle: React.FC<WordleProps> = ({ solution }) => {
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWordle(solution);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      <CustomGrid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <CustomKeypad usedKeys={usedKeys} />
      {showModal && <CustomModal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  );
};

export default Wordle;
