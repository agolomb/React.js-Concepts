import React, { useReducer, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";

////useContext////
//1st Create a Context
const MyContext = React.createContext();
//2nd Create the provider
const MyContextProvider = ({ children }) => {
  const contextValue = "Hello, useContext!";
  //making use of the 'provider'. The value is the string above.
  console.log(children); //the children in this case is "myComponent"
  //note below that we're passing it the string of "Hello, useContext!"
  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
// 3rd: Consume the context value using useContext
const MyComponent = () => {
  const value = useContext(MyContext);
  console.log(value);
  //this child component now has that string we passed it. Then we render it down below.
  return <div>{value}</div>;
};
////useContext////

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};
function Hooks() {
  const location = useLocation();
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };
  const initialState = { count: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <React.Fragment>
      <div className="container bg-primary">
        <h4>useReducer</h4>
        <p>
          useReducer is an alternative to useState. It's useful when we have a
          situation where our state would change and it's dependent on the
          previous state.
        </p>
        <p>
          Unlike the useState hook, useReducer takes in 2 arguments. The reducer
          function and the initial state
        </p>
        <p>
          The reducer function: it takes in the current state and handles the
          actions performed on the current state. Then it returns the updated
          state. A classic example with this hook is a plus and minus counter.
        </p>
        <div>
          <p>Count: {state.count}</p>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
        </div>
      </div>
      <div className="container bg-success">
        <h4>useContext</h4>
        <p>
          useContext allows us to pass values down a component tree without
          passing props
        </p>
        <MyContextProvider>
          <MyComponent />
        </MyContextProvider>
      </div>
      <div className="container bg-primary">
        <h4>useLocation</h4>
        <p>
          useLocation is showing us the url parameter on this page. If our url
          has an item ID#, we can grab that ID# use it to fetch data from the
          backend if needed.
        </p>
        <h6>Current location: {location.pathname}</h6>
      </div>
      <div className="container bg-success">
        <h4>useRef</h4>
        <p>
          useRef allows us to access and change the DOM without triggering a
          re-render. If we click the button, the focus effect highlights the
          input field but our entire DOM doesn't need to re-render.
        </p>
        <div>
          <input ref={inputRef} type="text" />
          {/*     ↑ this 'ref' piece is vital to useRef, inside inputRef it has a property called 'current' that changes to focus() when we click
          the button. We change the current property but it doesn't cause a re-rendering of the DOM */}
          <button onClick={handleClick}>Focus Input</button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Hooks;
