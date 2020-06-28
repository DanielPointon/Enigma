import React, { useReducer } from "react";
interface IProps {
  rotateRotor: (index: number, shiftValue: number) => void;
}
export const Dials: React.FC<IProps> = ({ rotateRotor }) => {
  const reducer = (values: any, action: any) => {
    return values.map((value: any, index: any) =>
      index == action.payload.rotorIndex ? action.payload.value : value
    );
  };
  const initalValue = [0, 0, 0];
  const [values, dispatch] = useReducer(reducer, initalValue);
  return (
    <div className="well">
      <p>
        Configuration Code:
        <button className="btn btn-info">Reset</button>
      </p>
      {values.map((value: any, index: number) => (
        <input
          type="range"
          className="slider"
          id="formControlRange"
          min="0"
          max="26"
          value={value}
          onChange={(event: any) => {
            rotateRotor(index, (event.target.value - value + 26) % 26);
            dispatch({
              payload: { rotorIndex: index, value: event.target.value },
            });
          }}
        ></input>
      ))}
    </div>
  );
};
