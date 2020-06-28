import React, { Fragment } from "react";
interface IProps {
  rotor: any;
  className: String;
  highlights: any;
}
export const Rotor: React.FC<IProps> = ({
  rotor,
  className,
  highlights
}) => {
  const characterToElement = (
    borderClass: string,
    highlights: any,
  ) => (char: string, index: number) => {
    const highlightClasses=Object.keys(highlights).filter((key)=>highlights[key].includes(index));
    //Class that adds a border once every two rotors, gives the impression everything is moving
    const bordered = (index + rotor.shift) % 2 === 0 && borderClass;
    console.log(index, rotor.shift);
    return (
      <td className={`td ${className} ${highlightClasses.join(' ')} ${bordered}`}>{char}</td>
    );
  };
  return (
    <Fragment>
      <tr>
        {rotor.inputRow
          .split("")
          .map(
            characterToElement(
              "borderRight",
              highlights.input
            )
          )}
      </tr>
      <tr>
        {rotor.outputRow
          .split("")
          .map(
            characterToElement(
              "borderLeft",
              highlights.output
            )
          )}
      </tr>
    </Fragment>
  );
};
