import { useState } from 'react';

interface Letter {
  key: string;
  color: 'grey' | 'yellow' | 'green';
}

interface UsedKeys {
  [key: string]: 'grey' | 'yellow' | 'green' | undefined;
}

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<(Letter[] | undefined)[]>([...Array(6)]);
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [usedKeys, setUsedKeys] = useState<UsedKeys>({});


  const formatGuess = (): Letter[] => {
    const solutionArray = [...solution];
    const formattedGuess: Letter[] = [...currentGuess].map((letter) => ({
      key: letter,
      color: 'grey',
    }));


    formattedGuess.forEach((letter, i) => {
      if (solution[i] === letter.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = '';
      }
    });


    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(letter.key)] = '';
      }
    });

    return formattedGuess;
  };


  const addNewGuess = (formattedGuess: Letter[]) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => [...prevHistory, currentGuess]);

    setTurn((prevTurn) => prevTurn + 1);

    setUsedKeys((prevUsedKeys) => {
      const newUsedKeys = { ...prevUsedKeys };

      formattedGuess.forEach((letter) => {
        const currentColor = newUsedKeys[letter.key];

        if (letter.color === 'green') {
          newUsedKeys[letter.key] = 'green';
        } else if (letter.color === 'yellow' && currentColor !== 'green') {
          newUsedKeys[letter.key] = 'yellow';
        } else if (letter.color === 'grey' && !['green', 'yellow'].includes(currentColor || '')) {
          newUsedKeys[letter.key] = 'grey';
        }
      });

      return newUsedKeys;
    });

    setCurrentGuess('');
  };


  const handleKeyup = ({ key }: KeyboardEvent) => {
    console.log('====================================');
    console.log(key);
    console.log('====================================');
    if (key === 'Enter') {

      if (turn >= 6) {
        console.log('You used all your guesses!');
        return;
      }

      if (history.includes(currentGuess)) {
        console.log('You already tried that word.');
        return;
      }

      if (currentGuess.length !== 5) {
        console.log('Word must be 5 characters long.');
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    } else if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
  };
};

export default useWordle;
