import React, { Fragment } from "react";
interface IProps {
  row: any;
  className: String;
  // inputHighlight: number;
  // ouputHighlight: number;
}
export const PlainRow: React.FC<IProps> = ({
  row,
  className,
  // inputHighlight,
  // ouputHighlight,
}) => {
  const characterToElement = (
    // highlightIndex: number,
    // highlightClass: string
  ) => (char: string, index: number) => {
    // const highlighted = index === highlightIndex && highlightClass;
    return <td className={`td ${className}`}>{char}</td>;
  };
  return (
    <Fragment>
      <tr>
        {row
          .split("")
          .map(characterToElement())}
      </tr>
    </Fragment>
  );
};
