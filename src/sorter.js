const { mergesort } = require("./algorithms");
function random(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

function randomRGB() {
  return [random(0, 255), random(0, 255), random(0, 255), 255];
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

class Sorter {
  constructor(canvas) {
    this.canvas = canvas;
    this.init();
  }

  init() {
    const canvas = this.canvas;
    var ctx = canvas.getContext("2d");
    var imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let i = 0; i < canvas.width; i++) {
      for (let j = 0; j < canvas.height; j++) {
        setColorIndicesForCord(i, j, canvas.width, randomRGB(), imageData.data);
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

    const indices = getRowIndices(imageData.data, this.canvas.width);
    for (let i = 0; i < 1; i++) {
      const sorted = mergesort(imageData.data, indices[i][0], indices[i][1]);
      for (let j = 0; j < sorted.length; j++) {
        imageData[i + j] = sorted[i];
      }
      this.canvas.getContext("2d").putImageData(imageData, 0, 0);
    }
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
