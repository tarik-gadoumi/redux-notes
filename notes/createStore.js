import { createStore } from "redux";
/**
 * * createStore is @deprecated, but if i have ever to deal with this old API
 * * here i'll try to demistify how it works
 */

// The Store ( after all  even a console log here will  throw and error because of the missing arguments)

//const emptyStore = createStore(); //? here all the args are missing in createStore it mean's that the store is empty

/**
 * The Store + The Reducer
 * step 1 : creating the store + the reducer
 * step 2 : creating the actions
 * step 3 : values inside the actions objects have to be given by reference and not by value (just a fancy word to say put the type value in a variable)
 * step 4 : creating the actions creators (it's just a fn that return the action object)
 *
 *
 * */
// todo : 4
const INCREMENT = "INCREMENT";
const ADD = "ADD";

/**
 * todo : 3
 * note that i my action objects i might need these optional keys :
 * ! / payload: 5,
 * ! / meta: {},
 * ! / error: "some error message"
 */
const incrementAction = {
  type: INCREMENT,
};
const addAction = {
  type: ADD,
};
/**
 * todo : 5
 * after creating the action creator,forget about the actions ! (not sure 100% what i'm saying in this comment)
 * */
const incrementActionCreator = () => incrementAction;
const addActionCreator = (v) => ({ ...addAction, payload: v });
// todo : 2
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, value: state.value + 1 };
    case "ADD":
      return { ...state, value: state.value + action.payload };
    default:
      state;
  }
};
// todo : 1
const initialState = { value: 0 };
const store = createStore(reducer);

/**
 * todo : 6
 *  let's explore the built-in methods in the store object
 * * the dispatch fn is verry interesting, let give details vy  explaning our console.log on line X
 * * because it fires the case : "INCREMENT" inside the reducer ,
 * * Then it returns an Object whom the purpose of it's existence is becoming (The New State)
 * *
 * */
console.log("\u001b[1;46m Section A");
console.log(store);
console.log(store.dispatch(incrementActionCreator())); // return the action *BUT* changes the state of the world
console.log(store.getState()); // return the updated State of the world (càd l'état à l'instant T dans notre example c'est l"état après le dispatch)
console.log(store.dispatch(addActionCreator(9999)));
console.log(store.getState());

/**
 * * The other methods inside the store object :
 * ! replaceReducer : https://redux.js.org/usage/code-splitting#using-replacereducer
 */
/**
 * let's play with the subscribe method
 */
const subscriber = () => console.log("SUBSCRIBER", store.getState());
/**
 * what it does is calling a function every time the state changes
 * useful for event listener (DOM) or event Emitter (Nodejs)
 * Why this is usefull ?
 * imagine we wan"t to pass a new props every time our  react app changes
 * well react-redux can subscribe to the store and we might have  different mechanism
 * (whether hooks or the connect API to figure out what props we sould be given to the react component)
 */
console.log("\u001b[1;42m Section B");
store.subscribe(subscriber);
store.dispatch(incrementActionCreator());
store.dispatch(incrementActionCreator());
store.dispatch(incrementActionCreator());
export { store, incrementActionCreator, addActionCreator };
