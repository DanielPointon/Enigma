import { machine, rotor, rotorHighlights } from "./types/state";
import { noHighlights } from "./reducers/main";
const asciiA = 97;

const rotorProcess = (inputRow: string, outputRow: string, index: number) => {
  return outputRow.indexOf(inputRow[index]);
};
/*
Takes a number and a string and return the index of the other occurance of the character at that point
e.g aabbcc and 0 would return 1
I'm aware this isn't the fastest way to do it, but it keeps it concise and also has good automatic handling of 
an index larger than the length of the string, if speed became an issue I would change this
*/
const reflector = (reflector: string, index: number) => {
  const charAtIndex = reflector[index];
  const firstIndex = reflector.indexOf(charAtIndex);
  if (firstIndex === index) {
    return reflector.lastIndexOf(charAtIndex);
  } else {
    return firstIndex;
  }
};

/*
Takes an index and a string of length 26(must be permutation of alphabet for our purposes)
Returns string shifted by that index
*/

/*
  Takes a lowercase letter and returns the encrypt version, along with the highlights to display on the lightboard
*/
interface returnType {
  result: string;
  highlights: rotorHighlights[];
}
export const encryptLetter: (input: string, machine: machine) => returnType = (
  input: string,
  machine: machine
) => {
  const initialState = {
    charAlphabetPos: input.charCodeAt(0) - asciiA,
    rotorHighlights: [noHighlights, noHighlights, noHighlights],
  };

  //Type for the output of a pass down or up the rotors
  interface passOutput {
    rotorHighlights: rotorHighlights[];
    charAlphabetPos: number;
  }
  const passThroughRotors = (
    rotors: rotor[],
    inputKey: "inputRow" | "outputRow",
    outputKey: "inputRow" | "outputRow",
    passKey: "forwardPass" | "backwardPass",
    initialState: passOutput,
    goingBackwards: Boolean,
  ) => {
    return rotors.reduce(
      (state: passOutput, rotor: rotor, rotorIndex: number): passOutput => {
        //Pass in the previous out as the new input
        const rotorResult = rotorProcess(
          rotor[inputKey],
          rotor[outputKey],
          state.charAlphabetPos
        );
        return {
          //Store the new output
          charAlphabetPos: rotorResult,
          //Now update highlights(colours on the lightboard)
          rotorHighlights: state.rotorHighlights.map(
            (highlights: any, highlightIndex: number) => {
              //If we are on the highlight that corresponds to the current rotor
              return highlightIndex === (goingBackwards ? rotorIndex : rotors.length-rotorIndex-1)
                ? {
                    ...highlights,
                    [outputKey]: {
                      ...highlights[outputKey],
                      [passKey]: [
                        ...highlights.outputRow[passKey],
                        //Add the latest output to the outputRow of the current processed rotor
                        rotorResult,
                      ],
                    },
                    [inputKey]: {
                      ...highlights[inputKey],
                      [passKey]: [
                        ...highlights.inputRow[passKey],
                        //Add the old output to the inputRow of the current processed rotor
                        state.charAlphabetPos,
                      ],
                    },
                  }
                : highlights;
            }
          ),
        };
      },
      initialState
    );
  };
  //Input passes through the rotors sequentially, each feeding into next
  let forwardPass = passThroughRotors(
    [...machine.rotors],
    "inputRow",
    "outputRow",
    "forwardPass",
    initialState,
    true
  );
  const reflectedResult = reflector(
    machine.reflector,
    forwardPass.charAlphabetPos
  );
  //Then reaches the reflector and is reflected back
  let reflectedPass: passOutput = {
    ...forwardPass,
    charAlphabetPos: reflectedResult,
    rotorHighlights: [...forwardPass.rotorHighlights],
  };
  //It is then sent back through the rotors, in the reverse order to the forward pass, with the output row acting as an input, and the inputRow acting as the output
  let backwardPass = passThroughRotors(
    [...machine.rotors].reverse(),
    "outputRow",
    "inputRow",
    "backwardPass",
    reflectedPass,
    false
  );
  return {
    result: String.fromCharCode(asciiA + backwardPass.charAlphabetPos),
    highlights: backwardPass.rotorHighlights,
  };
};
