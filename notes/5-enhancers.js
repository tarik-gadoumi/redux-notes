import { createStore, compose } from "redux";

/**
 * enhancers allow use to add additional stuff to our store https://github.com/reduxjs/redux/blob/master/src/createStore.ts#L96
 * we can pass it as 3th argument to my createStore fn or a 2nd argument ^^
 * because createStore checks the typeof if it's a 'function' https://github.com/reduxjs/redux/blob/master/src/createStore.ts#L68
 * the example bellow shows an enhancer
 */
// useless reducer returning the sate of the world (just to make the code works)
const reducer = (state) => state;

const monitorEnhancer = (createStore) => (reducer, initialState) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = end - start;
    console.log(diff);
    return newState;
  };
  return createStore(monitoredReducer, initialState);
};
const store = createStore(reducer, monitorEnhancer);
store.dispatch({ type: "hello" });

/**
 * * let's play a little bit with enhancers
 *
 */
// isolating this exercice inside {} so i can reuse some naming variables that i used in the global scope
{
  const initialState = {
    users: [
      {
        name: "tarik",
        id: 0,
      },
      {
        name: "ayman",
        id: 1,
      },
      {
        name: "adam",
        id: 2,
      },
      {
        name: "rania",
        id: 3,
      },
    ],
  };
  const reducer = (state, action) => {
    if (action.type === "DELET_USER") {
      return [
        ...state.users.filter((v, i, l) => {
          if (v.name === action.name) return;
          return v;
        }),
      ];
    }
    return state;
  };
  const stateEnhancer = (createStore) => (reducer, initialS) => {
    const logReducer = (state, action) => {
      console.log("before => ", state);
      const newState = reducer(state, action);
      console.log("after =>", newState);
      return newState;
    };
    const storePlusStuff = createStore(logReducer, initialS);

    return storePlusStuff;
  };
  const store = createStore(reducer, initialState, stateEnhancer);
  //store.dispatch({ type: "DELET_USER", name: "tarik" });
  //console.log('state after dispatching "DELET_USER Action"', store.getState());
  const storeTwo = createStore(
    reducer,
    initialState,
    compose(stateEnhancer, monitorEnhancer)
  );
  storeTwo.dispatch({ type: "DELET_USER", name: "tarik" });
}
