import React from 'react';

import CustomRow from './CustomRow';
import { GridProps } from '../types/interfaces';



const CustomGrid: React.FC<GridProps> = ({ guesses, currentGuess, turn }) => {
  return (
    <div>
      {guesses.map((g, i) => {
        if (turn === i) {
          return <CustomRow key={i} currentGuess={currentGuess} />;
        }
        return <CustomRow key={i} guess={g} />;
      })}
    </div>
  );
};

export default CustomGrid;
