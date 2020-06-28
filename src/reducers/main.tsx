export const reducer = (state: any, action: any) => {
  const rotate = (string: string, index: number) =>
    string.length == 26 &&
    string.substring(index % 26) + string.substring(0, index % 26);
  console.log(rotate);
  switch (action.type) {
    case "rotateRotor":
      console.log(state.machine.rotors);
      return {
        ...state,
        machine: {
          ...state.machine,
          rotors: state.machine.rotors.map(
            //Iterate through rotors, shift the input and output rotor of rotor with specified index
            (oldValue: any, index: number) =>
              index == action.payload.rotorIndex
                ? {
                    inputRow: rotate(oldValue.inputRow, action.payload.shift),
                    outputRow: rotate(oldValue.outputRow, action.payload.shift),
                    shift: oldValue.shift+action.payload.shift
                  }
                : oldValue
          ),
        },
      };
  }
};
