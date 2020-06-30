import React, { useState } from "react";
import { KeyboardView } from "./keyboardView";
interface IProps {
  encryptLetter: (letter: string) => string;
  addLetter: (letter: string) => void;
}
export const Lightboard: React.FC<IProps> = ({ encryptLetter, addLetter }) => {
  const [keyboardLetter, setKeyboardLetter] = useState("A");
  const [lightboardLetter, setLightboardLetter] = useState("A");
  return (
    <div className="well" id="inText">
      <div className="container fluid">
        <div className="col-sm-6">
          <u>
            <h2 style={{ fontFamily: "Ranchers" }}>Keyboard Input</h2>
          </u>
          <KeyboardView
            highlightedLetter={keyboardLetter}
            onMouseEnter={(letter: string) => {
              setKeyboardLetter(letter);
              setLightboardLetter(encryptLetter(letter));
            }}
            onMouseLeave={(letter: string) => {
              setKeyboardLetter("");
              setLightboardLetter("");
            }}
            onClick={(letter: string) => addLetter(letter)}
          ></KeyboardView>
        </div>
        <div className="col-sm-6">
          <u>
            <h2 style={{ fontFamily: "Ranchers" }}>Lightboard output:</h2>
          </u>
          <KeyboardView highlightedLetter={lightboardLetter}></KeyboardView>
        </div>
      </div>
    </div>
  );
};
