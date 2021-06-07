import React, { useReducer } from "react";
import "./App.css";
import { reflector, alphabet, rotorClasses } from "./config";
import { Rotor } from "./components/rotor";
import { PlainRow } from "./components/row";
import { Dials } from "./components/dials";
import { reducer, initialState } from "./reducers/main";
import { encryptLetter } from "./machineLogic";
import { Lightboard } from "./components/lightboard";
import { rotor } from "./types/state";
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const rotateRotor = (index: number, shift: number) => {
    dispatch({
      type: "rotateRotor",
      payload: { rotorIndex: index, shift: shift },
    });
  };
  //Add letter to input list(effectively type a letter)
  const addLetter = (letter: string) => {
    const encryptionResult = encryptLetter(letter, state.machine);
    dispatch({
      type: "addLetter",
      payload: {
        inputLetter: letter,
        encryptedLetter: encryptionResult.result,
        highlights: encryptionResult.highlights,
      },
    });
  };
  return (
    <div className="App">
      <div className="well">Enigma Simulator</div>
      <Lightboard
        addLetter={addLetter}
        encryptLetter={(letter: string) =>
          encryptLetter(letter, state.machine).result
        }
      ></Lightboard>
      <Dials rotateRotor={rotateRotor}></Dials>

      <div className="well">
        <div className="form-group">
          <label>
            <h2>Input</h2>
          </label>
          <input
            type="text"
            className="form-control"
            value={state.plaintext}
            disabled
          ></input>
        </div>
        <h2>Switchboard</h2>

        <table
          style={{
            borderLeft: "2px solid white !important",
            borderRight: "2px solid white !important",
          }}
        >
          <tbody>
            <PlainRow className="well" row={alphabet}></PlainRow>
            {state.machine.rotors.map((rotor: rotor, index: number) => {
              return (
                <Rotor
                  rotor={state.machine.rotors[index]}
                  className={rotorClasses[index]}
                  highlights={state.highlights[index]}
                  key={`rotor-${index}`}
                ></Rotor>
              );
            })}
            <PlainRow className="well" row={reflector}></PlainRow>
          </tbody>
        </table>
        <label>
          <h2>Output</h2>
        </label>
        <input
          type="text"
          className="form-control"
          value={state.ciphertext}
          disabled
        ></input>
      </div>
    </div>
  );
}

export default App;
