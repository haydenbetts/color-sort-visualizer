const Form = require("./form");
const Sorter = require("./sorter");
const Performance = require("./performance");
const Paint = require("./paint");

load();

function load() {
  // new Performance(document.getElementById("performance"));

  const sorterA = new Sorter(document.getElementById("canvas-a"));
  const sorterB = new Sorter(document.getElementById("canvas-b"));

  new Paint(document.getElementById("canvas-a"));
  new Paint(document.getElementById("canvas-b"));

  new Form(
    document.getElementById("form"),
    document.getElementById("form-submit"),
    [sorterA, sorterB]
  );
}
