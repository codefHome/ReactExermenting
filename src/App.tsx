import { useState, useRef, useContext, useEffect } from "react";
import "./App.css";
import { ChallengeContext } from "./CentralStorage";
import { Header } from "./Header";
import { GreaterThanIcon } from "./SvgIcons";
import MainApp from "./Input";

interface IPosition {
  x: number;
  y: number;
}
function App() {
  const [position, setPosition] = useState<IPosition>({
    x: window.innerWidth / 2 - 50,
    y: window.innerHeight / 2 - 50,
  });
  const [dragging, setDragging] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [width, setWidth] = useState(100);
  const [vLine, setVLine] = useState<string[]>([]);
  const [countIndex, setCountIndex] = useState(-1);
  const { rightV, rightC, setRightV, setRightC, rightSV } =
    useContext(ChallengeContext);

  const { zoomLevel } = useContext(ChallengeContext);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      if (dragging) {
        setPosition({
          x: event.clientX,
          y: event.clientY,
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    const handleOnMouseUp = () => {
      setDragging(false);
    };

    document.addEventListener("mouseup", handleOnMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleOnMouseUp);
    };
  }, [dragging]);

  const handleOnMouseDown = () => {
    setDragging(true);
  };

  const handlePosition = () => {
    setPosition({
      x: window.innerWidth / 2 - 50,
      y: window.innerHeight / 2 - 50,
    });
  };

  const [inputs, setInputs] = useState<number[]>([]);

  const handleClick = () => {
    setInputs([...inputs, inputs.length]);
    setVLine((preVline) => [...preVline, ""]);
    setCount(count + 1);
    if (count >= 5) {
      setWidth(width + 245);
    } else if (count >= 2) {
      setWidth(width + 200);
    } else {
      setWidth(width + 60);
    }

    setCountIndex(countIndex + 1);

    setRightV(rightV + 100);
  };
  console.log("rightSV", rightSV);
  const handleRemove = (id: number) => {
    setInputs(inputs.filter((inputId: any) => inputId !== id));

    const newVline = [...vLine];
    newVline.splice(id, 1);
    setVLine(newVline);
    setCount(count - 1);

    if (count > 2) {
      setWidth(width - 200);
    } else {
      setWidth(width - 90);
    }

    setRightV(rightV - 100);
    if (count >= 2) {
      setRightC(rightC - 60);
    } else {
      setRightC(rightC - 90);
    }
  };

  return (
    <>
      <header>
        <Header handlePosition={handlePosition} />
      </header>
      <button
        className="topStyle"
        style={{
          position: "relative",
          left: `${window.innerWidth / 2}px`,
          top: "0px",
        }}
      >
        <GreaterThanIcon />{" "}
      </button>
      <div className="mainBodyStyle">
        <button
          className="leftStyle"
          style={{
            position: "absolute",
            top: `${window.innerHeight / 2}px`,
            left: "0px",
          }}
        >
          <GreaterThanIcon />
        </button>

        <main style={{ zoom: zoomLevel / 100 }}>
          <div
            className="App"
            style={{ position: "absolute", left: position.x, top: position.y }}
          >
            <div ref={divRef} className="categoriesContainer">
              <span>
                <label onMouseDown={handleOnMouseDown}>Categories</label>
                <button onClick={handleClick}>+</button>
              </span>
            </div>
            {count === 1 && (
              <span
                style={{ right: `${rightV + 10}px` }}
                className="verticalLine"
              >
                {" "}
              </span>
            )}

            {count > 1 && (
              <span className="secondVerticalLineOption">
                <span className="verticalLineMain">
                  <span className="verticalLine"> </span>
                </span>
                <span
                  style={{
                    width: `${width}px`,
                    height: "0.5px",
                    backgroundColor: "black",
                  }}
                ></span>
                <div className="verticalLines">
                  {vLine.map((span) => (
                    <span className="verticalLine"></span>
                  ))}
                </div>
              </span>
            )}
            <div className="categoriesStyle">
              <MainApp
                inputs={inputs}
                setInputs={setInputs}
                handleRemove={handleRemove}
                count={count}
              />
            </div>
          </div>
        </main>
      </div>

      <button
        className="rightStyle"
        style={{
          position: "absolute",
          top: `${window.innerHeight / 2}px`,
          right: "0px",
        }}
      >
        <GreaterThanIcon />
      </button>
      <button
        className="bottomStyle"
        style={{
          position: "absolute",
          bottom: "0px",
          left: `${window.innerWidth / 2}px`,
        }}
      >
        <GreaterThanIcon />
      </button>
    </>
  );
}

export default App;
