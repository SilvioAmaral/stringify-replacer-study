// Import stylesheets
import './style.css';

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {    
    // console.log(key, value, Object.getOwnPropertyNames(value), Object.keys(value))
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        // console.log('circ-ref', key)
        return '[Circ Ref]';
      }
      seen.add(value);
    }
    return value;
  };
};

var stringifyError = function(err, filter, space) {
  var plainObject = {};
  const seen = new WeakSet();
  Object.getOwnPropertyNames(err).forEach(function(key) {
    // console.log('str fn',  err[key], key)
    const value = err[key];
    console.log(typeof value, value);
    if (typeof value === "object" && value !== null) {
      console.log('in check', value)
      if (seen.has(value)) {
        // console.log('circ-ref', key)
        plainObject[key] = '[Circ Ref]';
      }
      seen.add(value);
    } 
    plainObject[key] = value;
  });
  return JSON.stringify(plainObject, filter, space);
};

/** Object with circular reference */
const obj = {
  prop1: 'silvio',
  prop2: 40,
  prop3: {
    prop4: 'test'
  }
}
// obj.prop3.prop5 = obj;


/** Error object with circular reference */
const err = new Error('t');
err.message = 'abc'; // inherited prop
err.stack = ['1', '2']; // inherited prop
err.test = 'yeah';
err.message2 = obj;
console.info(err)

// The replacer works fine for regular objects
const appDiv = document.getElementById('app');
appDiv.innerText = JSON.stringify(obj, getCircularReplacer());

// but it does not work for inherited members (error obj props message like or stack)
const appDiv2 = document.getElementById('app2');
appDiv2.innerText = JSON.stringify(err, getCircularReplacer());

// so we will have to use a custom method on this case
const appDiv3 = document.getElementById('app3');
appDiv3.innerText = stringifyError(err);

