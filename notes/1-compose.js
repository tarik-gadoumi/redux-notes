import { compose } from "redux";

/**
 * Compose has nothing to do with redux it is just attached to the redux Object
 * because i might need it for things (no spoil for now
 * basically {compose} allows me :
 * { to take a set of Functions} & {create On Fn that passes a value through each one of them}
 * the example bellow using reduce built-in fn shows one of the possible implementation of {compose}
 */

const makeLouder = (string) => {
  return string.toUpperCase();
};
const repeatThreeTimes = (string) => {
  return string.repeat(3);
};
const embolden = (string) => string.bold() + "\n";
const attribute = " Peace & Love ";
/** 
 * output wanted :
    <b> PEACE & LOVE </b>
    <b> PEACE & LOVE </b>
    <b> PEACE & LOVE </b> 
*/

//! Solution A :
console.log(
  "\u001b[1;41m  Solution A \n" +
    repeatThreeTimes(embolden(makeLouder(attribute)))
);

//! Solution B :
const myCompose = (string) => {
  return [makeLouder, embolden, repeatThreeTimes].reduce((prev, v) => {
    return v(prev);
  }, string);
};
console.log("\u001b[1;42m Solution B \n" + myCompose(attribute));

//! Solution C :
/**
 * i noticed that designers of this API decided to proceed the implementation of compose like this :
 *  {when input is a set of simple functions the last IN, the first get executed}
 * */
const result = compose(repeatThreeTimes, embolden, makeLouder);
console.log("\u001b[1;46m Solution C \n" + result(attribute));
