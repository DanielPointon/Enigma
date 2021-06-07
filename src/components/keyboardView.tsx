import { keyboardRows } from "../config";

import React from "react";
interface IProps {
  highlightedLetter: string;
  onMouseEnter?: (letter: string) => void;
  onMouseLeave?: (letter: string) => void;
  onClick?: (letter: string) => void;
}
export const KeyboardView: React.FC<IProps> = ({
  highlightedLetter,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => (
    <div id="keyboard">
      <table style={{ textAlign: "center" }}>
        <tbody>
          {keyboardRows.map((row) => (
            <tr key={`letter-row-${row}`}>
              {row.split("").map((letter) => (
                <td
                  //Highlight the current letter on the lightboard
                  className={`well well-sm key ${letter === highlightedLetter && "contrast"
                    }`}
                  onMouseEnter={() => onMouseEnter && onMouseEnter(letter)}
                  onMouseLeave={() => onMouseLeave && onMouseLeave(letter)}
                  onClick={() => onClick && onClick(letter)}
                  key={`letter-${letter}`}
                >
                  {letter}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
