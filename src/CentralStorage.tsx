import { createContext, useState } from "react";

type UserCProps = {
  rightV: number;
  rightSV: number;
  rightC: number;
  rightSC: number;
  zoomLevel: number;
  setRightC: (value: number) => void;
  setRightSC: (value: number) => void;
  setZoomLevel: (value: number) => void;
  setRightV: (value: number) => void;
  setRightSV: (value: number) => void;
};
const ChallengeContext = createContext({} as UserCProps);
const { Provider } = ChallengeContext;

type ChallengeContextProps = {
  children: React.ReactNode;
};
const ChallengeContextProvider = ({ children }: ChallengeContextProps) => {
  const [rightV, setRightV] = useState(-100);
  const [rightSV, setRightSV] = useState(-40);
  const [rightC, setRightC] = useState(-91);
  const [rightSC, setRightSC] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);

  return (
    <Provider
      value={{
        rightV,
        rightSV,
        rightC,
        rightSC,
        zoomLevel,

        setRightV: (value) => setRightV(value),
        setRightC: (value) => setRightC(value),
        setRightSC: (value) => setRightSC(value),
        setZoomLevel: (value) => setZoomLevel(value),
        setRightSV: (value) => setRightSV(value),
      }}
    >
      {children}
    </Provider>
  );
};

export { ChallengeContextProvider, ChallengeContext };
