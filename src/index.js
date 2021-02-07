const Form = require("./form");
const Sorter = require("./sorter");
const Performance = require("./performance");

load();

function load() {
  // new Performance(document.getElementById("performance"));

  const sorterA = new Sorter(document.getElementById("canvas-a"));
  const sorterB = new Sorter(document.getElementById("canvas-b"));

  new Form(
    document.getElementById("form"),
    document.getElementById("form-submit"),
    [sorterA, sorterB]
  );
}
