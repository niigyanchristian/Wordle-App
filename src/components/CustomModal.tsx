import React from 'react';

interface ModalProps {
  isCorrect: boolean;
  solution: string;
  turn: number;
}

const CustomModal: React.FC<ModalProps> = ({ isCorrect, solution, turn }) => {
  return (
    <div className="modal">
      {isCorrect ? (
        <div>
          <h1>You Win!</h1>
          <p className="solution">{solution}</p>
          <p>You found the solution in {turn} guesses :)</p>
        </div>
      ) : (
        <div>
          <h1>Nevermind</h1>
          <p className="solution">{solution}</p>
          <p>Better luck next time :)</p>
        </div>
      )}
    </div>
  );
};

export default CustomModal;
