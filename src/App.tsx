import React, { useReducer, useState } from "react";
import "./App.css";
import { rotors, reflector } from "./config";
import { Rotor } from "./components/rotor";
import { PlainRow } from "./components/row";
import { Dials } from "./components/dials";
import { reducer } from "./reducers/main";
function App() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const initialState = {
    machine: {
      rotors: rotors.map((rotorString: string) => {
        return { inputRow: rotorString, outputRow: alphabet, shift: 0 };
      }),
      reflector: reflector,
    },
    input: "I am an input",
  };

  const highlights: any = {
    input: { forwardPassLightUp: [0], backwardPassLightUp: [1] },
    output: { forwardPassLightUp: [2], backwardPassLightUp: [3] },
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.machine);
  const rotateRotor = (index: number, shift: number) => {
    console.log("INDEX:")
    console.log(index);
    console.log("^")
    dispatch({
      type: "rotateRotor",
      payload: { rotorIndex: index, shift: shift },
    });
  };
  return (
    <div className="App">
      <Dials rotateRotor={rotateRotor}></Dials>
      <button
        onClick={() =>
          dispatch({
            type: "rotateRotor",
            payload: { rotorIndex: 0, shift: 1 },
          })
        }
      >
        Shift
      </button>
      ;<div className="well">Enigma Simulator</div>
      <div className="well">
        <div className="form-group">
          <label>
            <h2>Input</h2>
          </label>
          <input
            type="text"
            className="form-control bg-success"
            id="in"
            value=""
          ></input>
        </div>
        <table
          style={{
            borderLeft: "2px solid white !important",
            borderRight: "2px solid white !important",
          }}
        >
          <tbody>
            <PlainRow
              className="well"
              row={alphabet}
              // highlights={highlights}
            ></PlainRow>
            {state.machine.rotors.map((rotor: any) => (
              <Rotor
                rotor={state.machine.rotors[0]}
                className={`alcert-danger`}
                highlights={highlights}
              ></Rotor>
            ))}
            <PlainRow className="well" row={reflector}></PlainRow>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
