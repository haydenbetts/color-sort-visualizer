const { sleep, compare, sum } = require("../util");

const quicksort = async (arr, left = 0, right = arr.length - 1, cb, method) => {
  let len = arr.length,
    index;

  if (len > 4) {
    index = partition(arr, left, right, method);

    if (left < index - 1) {
      quicksort(arr, left, index - 1, cb, method);
    }

    if (index < right) {
      quicksort(arr, index, right, cb, method);
    }
  }

  return arr;
};

const swap = (array, i, j) => {
  const temp = [array[j], array[j + 1], array[j + 2], array[j + 3]];

  array[j] = array[i];
  array[j + 1] = array[i + 1];
  array[j + 2] = array[i + 2];
  array[j + 3] = array[i + 3];

  array[i] = temp[0];
  array[i + 1] = temp[1];
  array[i + 2] = temp[2];
  array[i + 3] = temp[3];
};

const partition = (arr, left, right, method) => {
  let middle = Math.floor((right + left) / 2),
    pivot = sum(arr, middle, method),
    i = left,
    j = right;

  while (i <= j) {
    while (sum(arr, arr[i], method) < pivot) {
      i += 4;
    }

    while (sum(arr, arr[j], method) > pivot) {
      j -= 4;
    }

    if (i <= j) {
      swap(arr, i, j);
      i += 4;
      j -= 4;
    }
  }

  return i;
};

module.exports = quicksort;
