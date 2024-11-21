import React, { useEffect, useState } from 'react';

interface Letter {
  key: string;
}

interface KeypadProps {
  usedKeys: Record<string, string | undefined>;
}

const CustomKeypad: React.FC<KeypadProps> = ({ usedKeys }) => {
  const [letters, setLetters] = useState<Letter[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/letters')
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);

  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter.key];
          return (
            <div key={letter.key} className={color}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
};

export default CustomKeypad;
