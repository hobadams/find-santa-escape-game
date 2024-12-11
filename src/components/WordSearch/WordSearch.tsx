import React, { useState } from 'react';

interface WordSearchProps {
  word: string;
  onComplete: () => void;
}

const WordSearch: React.FC<WordSearchProps> = ({ word, onComplete }) => {
  const gridSize = 10;
  const [grid, _] = useState(() => generateGrid(gridSize, word));
  const [selectedLetters, setSelectedLetters] = useState<{ row: number; col: number }[]>([]);

  const handleLetterClick = (row: number, col: number) => {
    if (selectedLetters.length === 0 || isValidNextLetter(row, col)) {
      setSelectedLetters([...selectedLetters, { row, col }]);

      const selectedWord = selectedLetters
        .map((pos) => grid[pos.row][pos.col])
        .join('') + grid[row][col];

      const reversedSelectedWord = selectedWord.split('').reverse().join('');

      if (selectedWord === word || reversedSelectedWord === word) {
        onComplete()
      }
    } else {
      setSelectedLetters([]); // Reset selection if the letter is not valid
    }
  };

  const isValidNextLetter = (row: number, col: number) => {
    const last = selectedLetters[selectedLetters.length - 1];
    if (!last) return true;

    const rowDiff = row - last.row;
    const colDiff = col - last.col;

    const isSameDirection = selectedLetters.length < 2 ||
      (rowDiff === selectedLetters[1].row - selectedLetters[0].row &&
        colDiff === selectedLetters[1].col - selectedLetters[0].col);

    return (
      isSameDirection &&
      ((Math.abs(rowDiff) === 1 && colDiff === 0) || // Up or Down
        (rowDiff === 0 && Math.abs(colDiff) === 1))    // Left or Right
    );
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 40px)` }}>
      {grid.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleLetterClick(rowIndex, colIndex)}
            className="text-lg uppercase text-black"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: selectedLetters.some(
                (pos) => pos.row === rowIndex && pos.col === colIndex
              )
                ? 'lightblue'
                : 'white',
            }}
          >
            {letter}
          </button>
        ))
      )}
    </div>
  );
};

const generateGrid = (size: number, word: string): string[][] => {
  const grid: string[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
  );

  // Place the word in the grid
  const startRow = Math.floor(Math.random() * size);
  const startCol = Math.floor(Math.random() * (size - word.length));

  for (let i = 0; i < word.length; i++) {
    grid[startRow][startCol + i] = word[i];
  }

  return grid;
};

export default WordSearch;
