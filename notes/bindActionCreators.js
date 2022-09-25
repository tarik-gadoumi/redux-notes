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
// ! INCREMENT
const fnIfExecutedFireDispatchForINCREMENT = compose(
  store.dispatch,
  incrementActionCreator
);
console.log(
  "firing the dispatch fron calling actionsCreatorOne()",
  fnIfExecutedFireDispatchForINCREMENT()
);
console.log("expected output 10004", store.getState());
// ! ADD
const fnIfExecutedFireDispatchForADD = compose(
  store.dispatch,
  addActionCreator
);
console.log(
  "firing the dispatch fron calling addActionCreator()",
  fnIfExecutedFireDispatchForADD(10000)
);
console.log("expected output 20004", store.getState());
/**
 * * here is a more elegant way to do the job,
 * * looping over action creators and using some destructuring magic
 */
const [dispatchInrement, dispatchAdd] = [
  incrementActionCreator,
  addActionCreator,
].map((fn) => {
  return compose(store.dispatch, fn);
});
dispatchInrement();
console.log("expected output 20005", store.getState());
dispatchAdd(10000);
console.log("expected outpur 30005 ", store.getState());
