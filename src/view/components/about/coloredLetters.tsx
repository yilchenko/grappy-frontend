import React, { useState, useEffect } from "react";

interface ColoredLettersProps {
  letters: string;
  colorXAmount: number;
  colorYAmount: number;
}

type ColoredSpan = React.ReactElement<{
  key: number;
  style?: { color: string };
}>;

function ColoredLetters({
  letters,
  colorXAmount,
  colorYAmount,
}: ColoredLettersProps): JSX.Element {
  const [coloredLetters, setColoredLetters] = useState<ColoredSpan[]>([]);
  const colorX = "#3E5141";
  const colorY = "#6c6887";

  function getRandomIndexes(total: number, amount: number): number[] {
    const indexes: number[] = [];
    while (indexes.length < amount) {
      const randomIndex = Math.floor(Math.random() * total);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  }

  useEffect(() => {
    const totalLetters = letters.length;
    const colorXIndexes = getRandomIndexes(totalLetters, colorXAmount);
    const colorYIndexes = getRandomIndexes(totalLetters, colorYAmount);

    const result = letters.split("").map((letter, index) => {
      if (colorXIndexes.includes(index)) {
        return (
          <span key={index} style={{ color: colorX }}>
            {letter}
          </span>
        );
      } else if (colorYIndexes.includes(index)) {
        return (
          <span key={index} style={{ color: colorY }}>
            {letter}
          </span>
        );
      }
      return <span key={index}>{letter}</span>;
    });

    setColoredLetters(result);

    const interval = setInterval(() => {
      setColoredLetters((prevResult) => {
        return prevResult.map((span) => {
          if (span.props?.style?.color === colorX) {
            return React.cloneElement(span, { style: { color: colorY } });
          } else if (span.props?.style?.color === colorY) {
            return React.cloneElement(span, { style: { color: colorX } });
          }
          return span;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [letters, colorXAmount, colorYAmount]);

  return <>{coloredLetters}</>;
}

export default ColoredLetters;
