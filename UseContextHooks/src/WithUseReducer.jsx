import { useContext, createContext, useReducer } from "react";

const CountContext = createContext();

function Component() {
  const { state, dispatch } = useContext(CountContext);
  return (
    <>
      <p>Count:{state}</p>
      <button onClick={() => dispatch({ type: "inc" })}>Inc +</button>
    </>
  );
}

function reducerFunction(state, action) {
  return action.type === "inc" ? state + 1 : state;
}
export default function WithUseReducer() {
  const [state, dispatch] = useReducer(reducerFunction, 0);
  return (
    <CountContext.Provider value={{ state, dispatch }}> {/* value ma aakho object pass kairo 6e etle {{}} */}
      <Component />
    </CountContext.Provider>
  );
}
