import { useEffect, useState } from 'react';
import Wordle from './components/Wordle';

function App() {
  const [solution, setSolution] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then((res) => res.json())
      .then((json: { word: string }[]) => {
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      })
      .catch((error) => console.error('Error fetching solutions:', error));
  }, []);

  return (
    <div className="App">
      <h1>Wordle App</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
