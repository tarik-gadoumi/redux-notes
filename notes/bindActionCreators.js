import { bindActionCreators, compose } from "redux";
import {
  store,
  incrementActionCreator,
  addActionCreator,
} from "./createStore.js";

/**
 * i'll show how it work's then try to implement it
 */
const actions = bindActionCreators(
  { incrementActionCreator, addActionCreator },
  store.dispatch
);
console.log("\u001b[1;43m Section C");
/**
 * * binActionCreators :
 * * this method allow use to fire dispatches from calling
 * * To understand how bindActionCreators works let's implement it in different ways
 */
const callbackIfExecutedFireDispatchForINCREMENT = compose(
  store.dispatch,
  incrementActionCreator
);
console.log(
  "firing the dispatch fron calling actionsCreatorOne()",
  callbackIfExecutedFireDispatchForINCREMENT()
);
console.log("expected output 10004", store.getState());
const callbackIfExecutedFireDispatchForADD = compose(
  store.dispatch,
  addActionCreator
);
console.log(
  "firing the dispatch fron calling addActionCreator()",
  callbackIfExecutedFireDispatchForADD(10000)
);
console.log("expected output 20004", store.getState());
/**
 * * what if we had multiple action creators ?
 * *
 */
