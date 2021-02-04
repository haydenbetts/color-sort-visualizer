const sum = (p, arr) => {
  return arr[p] + arr[p + 1] + arr[p + 2] + arr[p + 3];
};

const elts = (p, arr) => {
  return arr[p], arr[p + 1], arr[p + 2], arr[p + 3];
};

const merge = (arr1, arr2) => {
  const temp = [];
  let p1 = 0;
  let p2 = 0;
  while (p1 < arr1.length || p2 < arr2.length) {
    if (p1 < arr1.length && p2 < arr2.length) {
      if (sum(p1, arr1) < sum(p2, arr2)) {
        temp.push(elts(p1, arr1));
        p1 += 4;
      }
      if (sum(p2, arr2) < sum(p1, arr1)) {
        temp.push(elts(p2, arr2));
        p2 += 4;
      }
      if (sum(p1, arr1) === sum(p2, arr2)) {
        temp.push(elts(p2, arr2));
        temp.push(elts(p1, arr1));
        p1 += 4;
        p2 += 4;
      }
      if (Number.isNaN(sum(p1, arr1)) || Number.isNaN(sum(p2, arr2))) {
        p1 += 4;
        p2 += 4;
      }
    } else if (p1 < arr1.length) {
      temp.push(elts(p1, arr1));
      p1 += 4;
    } else {
      temp.push(elts(p2, arr2));
      p2 += 4;
    }
  }
  return temp;
};

const mergesort = (array, start = 0, end = array.length - 1) => {
  if (end - start <= 4) {
    return array.slice(start, end + 1);
  }
  let midpoint = start + Math.floor((end - start) / 2);

  return merge(
    mergesort(array, start, midpoint),
    mergesort(array, midpoint + 1, end)
  );
};

module.exports = mergesort;
