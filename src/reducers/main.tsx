import { state, rotor } from "../types/state";
import { action } from "../types/action";
import { rotors, alphabet, reflector } from "../config";

export const noHighlights = {
  inputRow: { forwardPass: [], backwardPass: [] },
  outputRow: { forwardPass: [], backwardPass: [] },
};
export const initialState:state= {
  machine: {
    rotors: rotors.map((rotorString: string) => {
      return { inputRow: rotorString, outputRow: alphabet, shift: 0 };
    }),
    reflector: reflector,
  },
  plaintext: "",
  ciphertext: "",
  highlights: [noHighlights, noHighlights, noHighlights],
};

export const reducer = (state: state, action: action): state => {
  const rotateString = (string: string, shift: number): string => {
    //Adding 26 is an easy way to handle negative shifts, mod 26 keeps the shift in range
    const effectiveShift = ((shift % 26) + 26) % 26;
    return (
      string.substring(effectiveShift) + string.substring(0, effectiveShift)
    );
  };

  const rotateRotor = (rotors: rotor[], rotorIndex: number, shift: number) => {
    return rotors.map(
      //Iterate through rotors, shift the input and output rotor of rotor with specified index
      (rotor: rotor, index: number): rotor =>
        index == rotorIndex
          ? {
              inputRow: rotateString(rotor.inputRow, shift),
              outputRow: rotateString(rotor.outputRow, shift),
              shift: rotor.shift + shift,
            }
          : rotor
    );
  };
  switch (action.type) {
    //Rotate a specific rotor based on it's index, controlled by dials on main screen
    case "rotateRotor":
      return {
        ...state,
        machine: {
          ...state.machine,
          rotors: rotateRotor(
            state.machine.rotors,
            action.payload.rotorIndex,
            action.payload.shift
          ),
        },
      };
    case "setHighlights":
      return { ...state, highlights: action.payload.highlights };
    case "addLetter":
      return {
        ...state,
        plaintext: state.plaintext + action.payload.inputLetter,
        ciphertext: state.ciphertext + action.payload.encryptedLetter,
        highlights: action.payload.highlights,
        machine: {
          ...state.machine,
          //Rotate first rotor after every letter that's added
          rotors: rotateRotor(state.machine.rotors, 0, 1),
        },
      };
    default:
      throw new Error();
  }
};
