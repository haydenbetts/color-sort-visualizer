const Form = require("./form");
const Sorter = require("./sorter");

load();

function load() {
  const sorter = new Sorter(document.getElementsByTagName("canvas")[0]);

  new Form(
    document.getElementById("form"),
    document.getElementById("form-submit"),
    sorter
  );
}
