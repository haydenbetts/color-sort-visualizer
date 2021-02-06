const { sleep } = require("../util");

const sum = (array, low, sort_unit) => {
  let sum = 0;
  for (let i = 0; i < sort_unit; i++) {
    sum += array[low + i];
  }
  return sum;
};

const mergesort = (array, sort_unit, cb) => {
  const helper = [];
  sort(array, helper, 0, array.length - 1, sort_unit, cb);
  return array;
};

const sort = async (array, helper, low, high, sort_unit, cb) => {
  if (low + 4 < high) {
    const absmid = Math.floor((high + 1 - low) / 2);
    const midgroup = absmid - (absmid % sort_unit);
    const middle = low + midgroup - 1;
    sort(array, helper, low, middle, sort_unit, cb);
    if (high - low > 5000) cb(array);
    // await sleep(500);
    sort(array, helper, middle + 1, high, sort_unit, cb);
    if (high - low > 5000) cb(array);
    // await sleep(500);
    merge(array, helper, low, middle, high, sort_unit);
    if (high - low > 5000) cb(array);
    // await sleep(5);
  }
};

const merge = (array, helper, low, middle, high, sort_unit) => {
  for (let i = low; i <= high; i++) {
    helper[i] = array[i];
  }

  let helperLeft = low;
  let helperRight = middle + 1;
  let current = low;

  while (helperLeft <= middle && helperRight <= high) {
    if (sum(helper, helperLeft) < sum(helper, helperRight)) {
      for (let i = 0; i < sort_unit; i++) {
        array[current] = helper[helperLeft + i];
      }
      // array[current] = helper[helperLeft];
      // array[current + 1] = helper[helperLeft + 1];
      // array[current + 2] = helper[helperLeft + 2];
      // array[current + 3] = helper[helperLeft + 3];
      helperLeft += sort_unit;
    } else {
      for (let i = 0; i < sort_unit; i++) {
        array[current] = helper[helperRight + i];
      }
      // array[current] = helper[helperRight];
      // array[current + 1] = helper[helperRight + 1];
      // array[current + 2] = helper[helperRight + 2];
      // array[current + 3] = helper[helperRight + 3];
      // helperRight += 4;
      helperRight += sort_unit;
    }
    current += sort_unit;
  }

  let remaining = middle - helperLeft;
  for (let i = 0; i <= remaining; i++) {
    array[current + i] = helper[helperLeft + i];
  }
};

module.exports = mergesort;
