import { combineReducers, createStore } from "redux";
// import { store } from "./bindActionCreators.js";
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
 * engineers found a good solution that makes our life easier, which boils down to make reducers that handle the state of each section of our payload
 * look example bellow
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
const reducer = combineReducers({ users: userReducer, Rôle: rôleReducer });
const store = createStore(reducer, initialState);
console.log(store.dispatch(addUserActionCreator("cristiano ronaldo", 10)));
console.log(store.getState());
