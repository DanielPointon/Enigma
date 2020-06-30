import React, { Fragment } from "react";
interface IProps {
  row: string;
  className: String;
}
export const PlainRow: React.FC<IProps> = ({ row, className }) => {
  const characterToElement = () => (char: string, index: number) => {
    return <td className={`td ${className}`}>{char}</td>;
  };
  return (
    <Fragment>
      <tr>{row.split("").map(characterToElement())}</tr>
    </Fragment>
  );
};
