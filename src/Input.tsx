import React, { useContext, useState } from "react";
import { EditIcon, TickIcon } from "./SvgIcons";
import { ChallengeContext } from "./CentralStorage";
import Modal from "./Modal";
import SubInputs from "./SubInputs";

interface InputProps {
  id: number;
  onRemove: () => void;
  count: number;
}

const Input = ({ id, onRemove }: InputProps) => {
  const [value, setValue] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [disabled, setDisabled] = useState(false);
  const [hideButtons, setHideButtons] = useState(true);
  const [subInputs, setSubInputs] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [sCount, setSCount] = useState(0);
  const [sWidth, setSWidth] = useState(40);
  const [sVLine, setSVLine] = useState<string[]>([]);
  const { rightC, rightSV, rightSC, setRightSC } = useContext(ChallengeContext);

  const handleAddSubInput = () => {
    if (sCount >= 4) {
      setSWidth(sWidth + 70);
    } else if (sCount >= 1) {
      setRightSC(rightSC + 120);
      setSWidth(sWidth + 30);
    } else {
      setSWidth(sWidth);
    }
    setShowModal(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setDisabled(event.target.value === "");
  };

  const handleSubmit = () => {
    setBackgroundColor("lightgreen");
    setDisabled(true);
    setHideButtons(false);
  };

  const handleRemoveSubInput = (subInputId: number) => {
    setSubInputs(subInputs.filter((id) => id !== subInputId));
    setSCount(sCount - 1)
    if (sCount >= 4) {
      setSWidth(sWidth - 70);
    } else if (sCount >= 1) {
      setRightSC(rightSC - 120);
      setSWidth(sWidth - 30);
    } else {
      setSWidth(sWidth);
    }

    if (sCount >= 2) {
      setSWidth(sWidth - 165);

    } else {
      setSWidth(sWidth - 100);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSVLine((preVline) => [...preVline, ""]);

    setSubInputs([...subInputs, subInputs.length]);

    setSCount(sCount + 1);
    if (sCount >= 2) {
      setSWidth(sWidth + 165);

    } else {
      setSWidth(sWidth + 100);
    }

  };
  console.log(subInputs);
  return (
    <div style={{ right: `${rightC + 30}px` }} className="mainCategoryStyle">
      <div className="categoryStyle">
        <input
          className="inputStyle"
          style={{ backgroundColor }}
          type="text"
          placeholder={`Input ${id}`}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
        {!hideButtons && (
          <>
            <button onClick={handleAddSubInput}>+</button>
            <button onClick={() => setDisabled(false)}>
              <EditIcon />
            </button>
          </>
        )}
        <button className="deleteButtonStyle" onClick={onRemove}>
          x
        </button>
        {hideButtons && (
          <button className="saveButtonStyle" onClick={handleSubmit}>
            <TickIcon />
          </button>
        )}
      </div>
      <div
        style={{
          display: "inline-block",
          width: "10px",
          height: "0px",
          right: `${rightSV}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {sCount === 1 && (
            <span
              style={{ right: `${rightSV}px`, top: "-30px", height: "40px" }}
              className="sverticalLine"
            >
              {" "}
            </span>
          )}

          {sCount > 1 && (
            <span
              style={{
                position: "relative",
                right: `${rightSV}px`,
                top: "-40px",
              }}
              className="ssecondVerticalLineOption"
            >
              <span style={{}} className="sverticalLineMain">
                <span style={{ height: "10px" }} className="sverticalLine">
                  {" "}
                </span>
              </span>
              <span
                style={{
                  width: `${sWidth}px`,
                  height: "0.5px",
                  backgroundColor: "black",
                  marginTop: "-10px",
                }}
              ></span>
              <div style={{}} className="sverticalLines">
                {sVLine.map((span) => (
                  <span
                    style={{ height: "20px" }}
                    className="sverticalLine"
                  ></span>
                ))}
              </div>
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          display: "inline-block",
          width: "10px",
          height: "0px",
          position: "relative",
          right: `${rightSC}px`,
        }}
      >
        <div className="subCategoryStyle">
          {subInputs.map((subInputId) => (
            <div key={subInputId}>
              <SubInputs
                id={subInputId}
                onRemove={() => handleRemoveSubInput(subInputId)}
                handleAddSubInput={handleAddSubInput}
              />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "inline-block", width: "10px", height: "0px" }}>
        <Modal handleClose={() => handleClose()} showModal={showModal} />
      </div>
    </div>
  );
};

const MainApp = (props: any) => {
  return (
    <div className="dynamicComponentStyle">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.inputs.map((id: any) => (
          <Input
            key={id}
            id={id}
            onRemove={() => props.handleRemove(id)}
            count={props.count}
          />
        ))}
      </div>
    </div>
  );
};

export default MainApp;
