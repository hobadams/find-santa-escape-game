import React, { useState } from 'react';

const MagicSquare: React.FC = () => {
  const initialSquare: (number | null)[][] = [
    [8, null, null],
    [null, 5, null],
    [null, null, 2],
  ];
  const targetSum = 15;

  const [square, setSquare] = useState<(number | null)[][]>([
    [8, null, null],
    [null, 5, null],
    [null, null, 2],
  ]);

  const handleChange = (row: number, col: number, value: string) => {
    if (initialSquare[row][col] !== null) return; // Prevent changes to initial numbers
    const numValue = value ? parseInt(value, 10) : null;
    const updatedSquare = square.map((r, rIdx) =>
      rIdx === row
        ? r.map((c, cIdx) => (cIdx === col ? numValue : c))
        : r
    );
    setSquare(updatedSquare);
  };

  const calculateRowSum = (row: (number | null)[]) => row.reduce((acc, val) => acc + (val || 0), 0);

  const calculateColumnSum = (col: number) =>
    square.reduce((acc, row) => acc + (row[col] || 0), 0);

  const calculateDiagonalSums = () => {
    const primaryDiagonal = (square[0][0] || 0) + (square[1][1] || 0) + (square[2][2] || 0);
    const secondaryDiagonal = (square[0][2] || 0) + (square[1][1] || 0) + (square[2][0] || 0);
    return [primaryDiagonal, secondaryDiagonal];
  };

  const isComplete = () => {
    const rowsValid = square.every(row => calculateRowSum(row) === targetSum);
    const colsValid = [0, 1, 2].every(col => calculateColumnSum(col) === targetSum);
    const [primary, secondary] = calculateDiagonalSums();
    return rowsValid && colsValid && primary === targetSum && secondary === targetSum;
  };

  const findEmptySquare = (): [number, number] | null => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (square[row][col] === null) {
          return [row, col];
        }
      }
    }
    return null;
  };

  const getCorrectValueForSquare = (row: number, col: number): number | null => {
    const solution: number[][] = [
      [8, 1, 6],
      [3, 5, 7],
      [4, 9, 2],
    ];
    return solution[row][col];
  };

  const fillClue = () => {
    const emptySquare = findEmptySquare();
    if (emptySquare) {
      const [row, col] = emptySquare;
      const correctValue = getCorrectValueForSquare(row, col);
      const updatedSquare = square.map((r, rIdx) =>
        rIdx === row
          ? r.map((c, cIdx) => (cIdx === col ? correctValue : c))
          : r
      );
      setSquare(updatedSquare);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Magic Square</h2>
      <p>Fill in the blanks so each row, column, and diagonal adds up to {targetSum}.</p>
      <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '5px' }}>
        {square.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              value={value ?? ''}
              onChange={e => handleChange(rowIndex, colIndex, e.target.value)}
              disabled={initialSquare[rowIndex][colIndex] !== null} // Disable initial numbers
              style={{
                width: '50px',
                height: '50px',
                textAlign: 'center',
                fontSize: '18px',
                color: 'black',
                backgroundColor: initialSquare[rowIndex][colIndex] !== null ? '#f0f0f0' : 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          ))
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={fillClue}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
          }}
        >
          Clue
        </button>
      </div>
      {isComplete() ? (
        <p style={{ color: 'green', marginTop: '20px' }}>🎉 Congratulations! You solved the magic square!</p>
      ) : (
        <p style={{ marginTop: '20px' }}>Keep going!</p>
      )}
    </div>
  );
};

export default MagicSquare;
