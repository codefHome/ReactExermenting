import { useState } from "react";
import { EditIcon, TickIcon } from "./SvgIcons";

interface InputProps {
  id: number;
  onRemove: () => void;
  handleAddSubInput: () => void;
}
const SubInputs = ({ id, onRemove, handleAddSubInput }: InputProps) => {
  const [value, setValue] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [disabled, setDisabled] = useState(false);
  const [hideButtons, setHideButtons] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setDisabled(event.target.value === "");
  };

  const handleSubmit = () => {
    setBackgroundColor("green");
    setDisabled(true);
    setHideButtons(false);
  };

  return (
    <div className="mainCategoryStyle">
      <div className="subCategoriesStyle">
        <input
          className="inputStyle"
          style={{ backgroundColor }}
          type="text"
          placeholder={`sub-input ${id}`}
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
    </div>
  );
};

export default SubInputs;
