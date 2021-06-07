import React, { useReducer } from "react";
interface IProps {
  rotateRotor: (index: number, shiftValue: number) => void;
}
export const Dials: React.FC<IProps> = ({ rotateRotor }) => {
  const reducer = (values: number[], action: any) => {
    return values.map((value: number, index: number) =>
      index === action.payload.rotorIndex ? action.payload.value : value
    );
  };
  const initalValue = [0, 0, 0];
  const [values, dispatch] = useReducer(reducer, initalValue);
  return (
    <div className="well">
      {values.map((value: number, index: number) => (
        <input
          type="range"
          className="slider"
          id="formControlRange"
          min="0"
          max="26"
          value={value}
          onChange={(event:any) => {
            rotateRotor(index, event.target.value - value);
            dispatch({
              payload: { rotorIndex: index, value: event.target.value },
            });
          }}
          key={`dial-${index}`}
        ></input>
      ))}
    </div>
  );
};
