import React, { FC } from "react";
import { AppContext, SpeciesFamilyInfo, SpeciesFamily } from "./types";

// Use React Context rather than a more complicated state management library like Redux
// for handling global app state. Inspiration taken from:
// https://kentcdodds.com/blog/application-state-management-with-react

// In order to make TS happy, we need to pass in a defaultValue.
const Context = React.createContext<AppContext>({
  speciesFamilyList: [],
  isLoading: false,
  setIsLoading: () => undefined,
  setCurrentFamily: () => undefined
});

// Custom hook that components can use to access the AppContext
export function useContext(): AppContext {
  return React.useContext<AppContext>(Context);
}

interface AppContextProviderProps {
  // When using a simple user prop, the value was always undefined. Must be something
  // related to the lazy importing. Using a function does the trick.
  getSpeciesFamilyList: () => SpeciesFamilyInfo[];
  getCurrentFamily: () => SpeciesFamily | undefined;
}

const AppContextProvider: FC<AppContextProviderProps> = props => {
  const [state, setState] = React.useState({
    speciesFamilyList: props.getSpeciesFamilyList(),
    isLoading: false,
    currentFamily: props.getCurrentFamily()
  });

  const setCurrentFamily = (family: SpeciesFamily | undefined) =>
    setState({ ...state, currentFamily: family, isLoading: false });

  const setIsLoading = () => setState({ ...state, isLoading: true });

  return (
    <Context.Provider value={{ ...state, setIsLoading, setCurrentFamily }}>
      {props.children}
    </Context.Provider>
  );
};

// // Because we are lazy importing, the AppContextProvider must be the default export.
export default AppContextProvider;
