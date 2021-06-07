import React, { Fragment } from "react";
import { rotor, rowHighlights } from "../types/state";
interface IProps {
  rotor: rotor;
  className: String;
  highlights: any;
}
export const Rotor: React.FC<IProps> = ({ rotor, className, highlights }) => {
  const characterToElement = (
    borderClass: string,
    highlights: rowHighlights
  ) => (char: string, index: number) => {
    const forwardPassHighlight =
      highlights.forwardPass.includes(index) && "forwardPassLightUp";
    const backwardPassLightUp =
      highlights.backwardPass.includes(index) && "backwardPassLightUp";

    //Class that adds a border once every two rotors, gives the impression everything is moving
    const bordered = (index + rotor.shift) % 2 === 0 && borderClass;
    return (
      <td
        className={`td ${className} ${forwardPassHighlight} ${backwardPassLightUp} ${bordered}`}
        key={`rotor-char-${char}`}
      >
        {char}
      </td>
    );
  };

  return (
    <Fragment>
      <tr>
        {rotor.inputRow
          .split("")
          .map(characterToElement("borderTop", highlights.inputRow))}
      </tr>
      <tr>
        {rotor.outputRow
          .split("")
          .map(characterToElement("borderBottom", highlights.outputRow))}
      </tr>
    </Fragment>
  );
};
