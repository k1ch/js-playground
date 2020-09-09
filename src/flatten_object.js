/**
 * A function that flattens the object
 * example {"a" : "1", "b": {"c":3, "d": 4, "e": {"f": {"" : 5}}}} ==> {"a": 1, "b.c": 3, "b.d": 4, "b.e" : 5}
 * @param {object} dict - The input object
 * @param {string} prefix - optional prefix
 * @param {object} flatObj - optional flattened obj 
 */
function flattenObject(dict, prefix, flatObj = {}) {
  Object.entries(dict).forEach(([key, val], i, arr) => {
    const newKey = prefix && key ? `${prefix}.${key}` : prefix ? prefix : key;
    if (typeof val === 'object') flattenObject(val, newKey, flatObj);
    else flatObj[newKey] = val;
  });
  return flatObj
}

const dict = {
  "a": "1",
  "b": {
    "c": 3,
    "d": 4,
    "e": {
      "f": {
        "": 5
      }
    }
  }
}
console.log(flattenObject(dict))