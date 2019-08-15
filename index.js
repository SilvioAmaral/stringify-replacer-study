// Import stylesheets
import './style.css';

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {    
    console.log(key, value, Object.getOwnPropertyNames(value), Object.keys(value))
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        console.log('circ-ref', key)
        return '[Circ Ref]';
      }
      seen.add(value);
    }
    return value;
  };
};

const obj = {
  prop1: 'silvio',
  prop2: 40,
  prop3: {
    prop4: 'test'
  }
}
obj.prop3.prop5 = obj;

var stringifyError = function(err, filter, space) {
  var plainObject = {};
  Object.getOwnPropertyNames(err).forEach(function(key) {
      console.log('str fn',  err[key], key)
    plainObject[key] = err[key];
  });
  return JSON.stringify(plainObject, filter, space);
};

const err = Error('t');
err.message = 'abc';
err.stack = ['1', '2'];
err.test = 'yeah';
// err.message2 = obj;
console.info(err)

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerText = JSON.stringify(obj, getCircularReplacer());

const appDiv2 = document.getElementById('app2');
appDiv2.innerText = stringifyError(err);

const appDiv3 = document.getElementById('app3');
appDiv3.innerText = JSON.stringify(err, getCircularReplacer());
