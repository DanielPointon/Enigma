//@ts-nocheck
const rotorProcess = (inputRow: any, outputRow: any, index: number) => {
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
export const encryptString = (input: string, machine: any) => {
  const initialState = {
    charAlphabetPos: input.charCodeAt(0) - 97,
    rotorHighlights: [{}, {}, {}],
  };
  let forwardPass = machine.rotors.reduce((state: any, rotor: any) => {
    const rotorResult = rotorProcess(
      rotor.inputRow,
      rotor.outputRow,
      state.charAlphabetPos
    );
    return {
      charAlphabetPos: rotorResult,
      rotorHighlights: [...state.rotorHighlights, rotorResult],
    };
  }, initialState);
  //Pass through reflector
  const reflectedResult = reflector(
    machine.reflector,
    forwardPass.charAlphabetPos
  );
  let reflectedPass = {
    ...forwardPass,
    charAlphabetPos: reflectedResult,
    rotorHighlights: [...forwardPass.rotorHighlights, reflectedResult],
  };
  //This is very similar to the forward pass, I'm aware its a violation of DRY- but it would probably make the code substantially less readable were I to generalise this.
  let backwardPass = machine.rotors.reduce((state: any, rotor: any) => {
    const rotorResult = rotorProcess(
      rotor.outputRow,
      rotor.inputRow,
      state.charAlphabetPos
    );
    return {
      charAlphabetPos: rotorResult,
      rotorHighlights: [...state.rotorHighlights, rotorResult],
    };
  }, reflectedPass);
  return backwardPass;
};
