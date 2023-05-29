import React from "react";
import ZoomComponent from "./ZoomComponent";
import { PositionCenterIcon } from "./SvgIcons";
interface IProps {
  handlePosition: () => void;
}
export const Header = ({ handlePosition }: IProps) => {
  return (
    <div className="headerStyle">
      <div className="serviceStyle">
        <label>Services</label>
        <button>{0}</button>
      </div>
      <div className="listViewStyle">
        <label>LIST VIEW</label>
        <span onClick={handlePosition}>
          {" "}
          <PositionCenterIcon />
        </span>
        <div>
          <ZoomComponent />
        </div>
      </div>
    </div>
  );
};
