const snakeToCamel = (str) => {
  return str
    .split("-")
    .map((elt, i) => (i > 0 ? elt[0].toUpperCase() + elt.slice(1) : elt))
    .join("");
};

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const luminosity = (r, g, b) => {
  return 0.241 * r + 0.691 * g + 0.068 * b;
};

const rgb = (r, g, b) => {
  return r + g + b;
};

function rgb2hsv(r, g, b) {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  (v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs));
  diffc = (c) => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = (num) => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return [
    Math.round(h * 360), //h
    percentRoundFn(s * 100), //s
    percentRoundFn(v * 100), //v
  ];
}

const sum = (array, left, method) => {
  switch (method) {
    case "hsv":
      const l = rgb2hsv(array[left], array[left + 1], array[left + 2]);
      return l[0];
    case "luminosity":
      return luminosity(array[left], array[left + 1], array[left + 2]);
    case "rgb":
      return array[left];
  }
};

const compare = (array, left, right, method) => {
  switch (method) {
    case "hsv":
      const l = rgb2hsv(array[left], array[left + 1], array[left + 2]);
      const r = rgb2hsv(array[right], array[right + 1], array[right + 2]);
      return l[0] - r[0];
    case "luminosity":
      return (
        luminosity(array[left], array[left + 1], array[left + 2]) -
        luminosity(array[right], array[right + 1], array[right + 2])
      );
    case "rgb":
      return array[left] - array[right];
  }
};

module.exports = {
  sleep,
  rgb2hsv,
  luminosity,
  rgb,
  compare,
  sum,
  snakeToCamel,
};
