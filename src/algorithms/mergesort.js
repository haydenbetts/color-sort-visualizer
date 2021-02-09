const { sleep, compare } = require("../util");

const mergesort = async (array, cb, method) => {
  const helper = [];
  await sort(array, helper, 0, array.length - 1, cb, method);
  return array;
};

const sort = async (array, helper, low, high, cb, method) => {
  if (low + 4 < high) {
    const absmid = Math.floor((high + 1 - low) / 2);
    const midgroup = absmid - (absmid % 4);
    const middle = low + midgroup - 1;
    await sort(array, helper, low, middle, cb, method);
    if (high - low > 20000) {
      await cb(array);
    }
    await sort(array, helper, middle + 1, high, cb, method);
    if (high - low > 20000) {
      await cb(array);
    }
    merge(array, helper, low, middle, high, method);
    if (high - low > 20000) {
      await cb(array);
    }
  }
};

const merge = (array, helper, low, middle, high, method) => {
  for (let i = low; i <= high; i++) {
    helper[i] = array[i];
  }

  let helperLeft = low;
  let helperRight = middle + 1;
  let current = low;

  while (helperLeft <= middle && helperRight <= high) {
    if (compare(helper, helperLeft, helperRight, method) < 0) {
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
