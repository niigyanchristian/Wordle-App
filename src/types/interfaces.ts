export interface WordleProps {
    solution: string;
}

export interface GridProps {
    guesses: Array<{ key: string; color: string }[] | undefined>;
    currentGuess: string;
    turn: number;
}