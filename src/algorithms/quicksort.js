const { sleep, compare, sum } = require("../util");

const quicksort = async (
  arr,
  left = 0,
  right = arr.length - 4,
  cb = () => {},
  method = "rgb"
) => {
  let len = right - left;
  let index;

  if (len > 4) {
    index = partition(arr, left, right, method);

    if (left < index - 1) {
      await quicksort(arr, left, index - 4, cb, method);
      if (len > 20000) {
        cb(arr);
        await sleep(5);
      }
    }

    if (index < right) {
      await quicksort(arr, index, right, cb, method);
      if (len > 20000) {
        cb(arr);
        await sleep(5);
      }
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
  let mid = Math.floor((right + left) / 2);
  let middle = mid - (mid % 4);
  let pivot = sum(arr, middle, method);
  let i = left;
  let j = right;

  while (i <= j) {
    // console.log(i, j);
    while (sum(arr, i, method) < pivot) {
      i += 4;
    }

    while (sum(arr, j, method) > pivot) {
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
