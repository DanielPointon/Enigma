import { rotorHighlights } from "./state";

type rotateRotor = {
  type: "rotateRotor";
  payload: { shift: number; rotorIndex: number };
};

type setHighlights = {
  type: "setHighlights";
  payload: { highlights: rotorHighlights[] };
};

type addLetter = {
  type: "addLetter";
  payload: {
    inputLetter: string;
    encryptedLetter: string;
    highlights: rotorHighlights[];
  };
};

export type action = rotateRotor | setHighlights | addLetter;
