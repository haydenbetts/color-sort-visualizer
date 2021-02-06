const { mergesort } = require("./algorithms");
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

class Sorter {
  constructor(canvas) {
    this.canvas = canvas;
    this.init();
  }

  init() {
    const canvas = this.canvas;
    var ctx = canvas.getContext("2d");
    var imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let i = 0; i < canvas.height; i += ROW_WIDTH) {
      const rgb = randomRGB();
      let x = 0;
      while (x < canvas.width) {
        for (let j = i; j < i + ROW_WIDTH; j++) {
          setColorIndicesForCord(x, j, canvas.width, rgb, imageData.data);
        }
        x++;
      }
    }

    this.canvas.getContext("2d").putImageData(imageData, 0, 0);
  }

  randomize() {
    this.init();
  }

  mergeWrapper() {
    var imageData = this.canvas
      .getContext("2d")
      .getImageData(0, 0, this.canvas.width, this.canvas.height);
    mergesort(imageData.data, ROW_WIDTH, (d) => {
      let _this = this;
      _this.canvas
        .getContext("2d")
        .clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      // imageData.data = d;
      _this.canvas.getContext("2d").putImageData(imageData, 0, 0);
    });
  }

  sort(algorithm, direction) {
    console.log(algorithm);
    switch (algorithm) {
      case "merge-sort":
        this.mergeWrapper();
        break;
      case "quick-sort":
        break;
    }
  }
}

module.exports = Sorter;
