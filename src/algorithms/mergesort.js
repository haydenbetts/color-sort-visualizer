const merge = (arr1, arr2) => {
  const temp = [];
  let p1 = 0;
  let p2 = 0;
  while (p1 < arr1.length || p2 < arr2.length) {
    if (p1 < arr1.length && p2 < arr2.length) {
      if (arr1[p1] < arr2[p2]) {
        temp.push(arr1[p1]);
        p1 += 1;
      }
      if (arr2[p2] < arr1[p1]) {
        temp.push(arr2[p2]);
        p2 += 1;
      }
      if (arr1[p1] === arr2[p2]) {
        temp.push(arr2[p2]);
        temp.push(arr1[p1]);
        p1 += 1;
        p2 += 1;
      }
    } else if (p1 < arr1.length) {
      temp.push(arr1[p1]);
      p1++;
    } else {
      temp.push(arr2[p2]);
      p2++;
    }
  }
  return temp;
};

const mergesort = (array, start = 0, end = array.length - 1) => {
  if (end <= start) {
    return [array[start]];
  }
  let midpoint = start + Math.floor((end - start) / 2);
  return merge(
    mergesort(array, start, midpoint),
    mergesort(array, midpoint + 1, end)
  );
};

module.exports = mergesort;
