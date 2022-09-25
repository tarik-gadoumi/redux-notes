import { combineReducers, createStore } from "redux";
// import { store } from "./bindActionCreators.js";
/**
 * combineReducers( takes an Object where the keys are namespaces of splices of my reducer store)
 */
console.log("\u001b[1;45m");

const initialState = {
  users: [
    {
      id: 1,
      name: "tarik",
    },
    { id: 2, name: "Ayman" },
    { id: 3, name: "Adam" },
    { id: 4, name: "Rania" },
  ],
  Rôle: [
    { status: "Grand Frère" },
    { status: "petit frère" },
    { status: "petit frère" },
    { status: "petite soeur <3" },
  ],
};
const ADD_USER = "ADD_USER";
const ADD_STATUS = "ADD_STATUS";
const addStatusActionCreator = (status) => ({
  type: ADD_STATUS,
  payload: { status },
});
const addUserActionCreator = (name, id) => ({
  type: ADD_USER,
  payload: { name: name, id: id },
});
/**
 * instead of writing a gigantic reducer that handles all the logic, which is verry bad for scalability ( ofc if we are talking about  Huge applications)
 * engineers found a good solution that makes our life easier, which boils down to make reducers that handle independent parts of the state
 * look example bellow : cool ! pas comme j'ai l'habitude de faire (https://codepen.io/tarik-gadoumi/pen/mdLqWNW?editors=0010)
 */
const userReducer = (users = initialState.users, action) => {
  if (action.type === "ADD_USER") {
    return [...users, action.payload];
  }
  return users;
};
const rôleReducer = (rôle = initialState.Rôle, action) => {
  if (action.type === "ADD_STATUS") {
    return [...rôle, action.payload];
  }
  return rôle;
};
// keys are namespaces of slices of my reducer store
const reducer = combineReducers({ users: userReducer, Rôle: rôleReducer });
const store = createStore(reducer, initialState);
console.log(store.dispatch(addUserActionCreator("cristiano ronaldo", 10)));
console.log(store.getState());
/**
 * todo : if i wan t to implement combineReducers how would i proceed ?
 * * i'm using the same implementation on this video : https://www.youtube.com/watch?v=7q60_OwFY64
 */
const RewriteCombineReducers = (reducers) => {
  return (state = {}, action) => {
    Object.keys(reducers).forEach((reducerKey) => {
      /**
       * waw here we are taking slices of the global state Object
       * & pass it to each part of the reducer function
       * (another explanation : we are only updating the state according to the given key in the combineReducers Object attribute)
       * ! très important à savoir :
       * ! when store.dispatch({type :"someTypeThatExistsInMultipleReducersCombinedByTheCombineReducerTree"})
       * ! note that it's gonna trigger the case 'blabla' : in all the reducers tree
       * */
      const reducerFunction = reducers[reducerKey];
      const sliceState = state[reducerKey];
      state[reducerKey] = reducerFunction(sliceState, action);
      return state;
    });
  };
};
