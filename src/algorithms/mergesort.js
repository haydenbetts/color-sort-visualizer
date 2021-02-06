const { sleep } = require("../util");

const sum = (array, low) => {
  return array[low] + array[low + 1] + array[low + 2] + array[low + 3];
};

const mergesort = (array, cb) => {
  const helper = [];
  sort(array, helper, 0, array.length - 1, cb);
  return array;
};

const sort = async (array, helper, low, high, cb) => {
  if (low + 4 < high) {
    const absmid = Math.floor((high + 1 - low) / 2);
    const midgroup = absmid - (absmid % 4);
    const middle = low + midgroup - 1;
    sort(array, helper, low, middle, cb);
    if (high - low > 20000) cb(array);
    // await sleep(500);
    sort(array, helper, middle + 1, high, cb);
    if (high - low > 20000) cb(array);
    // await sleep(500);
    merge(array, helper, low, middle, high);
    if (high - low > 20000) cb(array);
    // await sleep(5);
  }
};

const merge = (array, helper, low, middle, high) => {
  for (let i = low; i <= high; i++) {
    helper[i] = array[i];
  }

  let helperLeft = low;
  let helperRight = middle + 1;
  let current = low;

  while (helperLeft <= middle && helperRight <= high) {
    if (sum(helper, helperLeft) < sum(helper, helperRight)) {
      array[current] = helper[helperLeft];
      array[current + 1] = helper[helperLeft + 1];
      array[current + 2] = helper[helperLeft + 2];
      array[current + 3] = helper[helperLeft + 3];
      helperLeft += 4;
    } else {
      array[current] = helper[helperRight];
      array[current + 1] = helper[helperRight + 1];
      array[current + 2] = helper[helperRight + 2];
      array[current + 3] = helper[helperRight + 3];
      helperRight += 4;
    }
    current += 4;
  }

  let remaining = middle - helperLeft;
  for (let i = 0; i <= remaining; i++) {
    array[current + i] = helper[helperLeft + i];
  }
};

module.exports = mergesort;
