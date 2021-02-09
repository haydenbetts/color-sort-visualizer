const { mergesort, quicksort } = require("./algorithms");

function random(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

function randomRGB(i = 1) {
  return [random(0, 255), random(0, 255), random(0, 255), 255].map((elt) =>
    Math.floor(elt * i)
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const setColorIndicesForCord = (x, y, width, rgb, data) => {
  const red = y * (width * 4) + x * 4;
  data[red] = rgb[0];
  data[red + 1] = rgb[1];
  data[red + 2] = rgb[2];
  data[red + 3] = rgb[3];
};

const getRowIndices = (data, width) => {
  const numRows = data.length / width / 4;
  const indices = [];
  for (let i = 0; i < numRows; i++) {
    const start = i * width * 4;
    const end = start + width;
    indices.push([start, end]);
  }
  return indices;
};

const ROW_WIDTH = 4; //px

const cb = (imageData, canvas, timeout) => {
  return async function (d) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    imageData.data = d;
    canvas.getContext("2d").putImageData(imageData, 0, 0);
    await sleep(timeout);
  };
};

class Sorter {
  constructor(canvas) {
    this.canvas = canvas;
    this.init();
  }

  init() {
    const canvas = this.canvas;
    // this.canvas.width = canvas.parentElement.innerWidth;
    this.canvas.width = canvas.parentElement.offsetWidth;
    var ctx = canvas.getContext("2d");
    var imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < canvas.height; i++) {
      for (let j = 0; j < canvas.width; j++) {
        setColorIndicesForCord(j, i, canvas.width, randomRGB(), imageData.data);
      }
    }

    this.canvas.getContext("2d").putImageData(imageData, 0, 0);
  }

  randomize() {
    this.init();
  }

  sort(algorithm, method, timeout) {
    const imageData = this.canvas
      .getContext("2d")
      .getImageData(0, 0, this.canvas.width, this.canvas.height);

    switch (algorithm) {
      case "merge-sort":
        mergesort(imageData.data, cb(imageData, this.canvas, timeout), method);
        break;
      case "quick-sort":
        quicksort(
          imageData.data,
          0,
          imageData.data.length - 4,
          cb(imageData, this.canvas),
          method
        );
        break;
    }
  }
}

module.exports = Sorter;
