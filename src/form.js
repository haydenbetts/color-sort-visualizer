const { snakeToCamel } = require("./util");

class Form {
  constructor(form, submit, sorters) {
    this.form = form;
    this.submit = submit;
    this.sorters = sorters;

    this.state = {
      algorithmA: "merge-sort",
      algorithmB: "merge-sort",
      order: "ascending",
      method: "hsv",
      speed: 50,
    };

    this.initializeState();
    this.attachListeners();
  }

  _initRadioButtons() {
    var fieldsets = this.form.querySelectorAll("fieldset");

    for (f of fieldsets) {
      switch (f.id) {
        case "algorithm-a":
          const algoA = f.querySelector(
            `input[value="${this.state.algorithmA}"]`
          );
          algoA.checked = true;
          break;
        case "algorithm-b":
          const algoB = f.querySelector(
            `input[value="${this.state.algorithmB}"]`
          );
          algoB.checked = true;
          break;
        case "method":
          let method = f.querySelector(`input[value="${this.state.method}"]`);
          method.checked = true;
          break;
        case "speed":
          let speed = f.querySelector(
            `input[name="speed"][value="${this.state.speed}"]`
          );
          speed.checked = true;
          break;
        // case "order":
        //   let activeOrder = f.querySelector(
        //     `input[value="${this.state.order}"]`
        //   );
        //   activeOrder.checked = true;
        //   break;
      }
    }
  }

  initializeState() {
    this._initRadioButtons();
  }

  _attachInputListeners() {
    const inputs = this.form.querySelectorAll("input");
    for (input of inputs) {
      input.onchange = (e) => {
        if (this.state[snakeToCamel(e.target.name)]) {
          this.state[snakeToCamel(e.target.name)] = e.target.value;
        }
      };
    }
  }

  _attachSubmissionListeners() {
    const buttons = this.submit.querySelectorAll("button");
    for (button of buttons) {
      button.onclick = (e) => {
        switch (e.target.id) {
          case "sort":
            this.sorters[0].sort(
              this.state.algorithmA,
              this.state.method,
              this.state.speed
            );
            this.sorters[1].sort(
              this.state.algorithmB,
              this.state.method,
              this.state.speed
            );
            break;
          case "randomize":
            this.sorters[0].randomize();
            this.sorters[1].randomize();
            break;
        }
      };
    }
  }

  attachListeners() {
    this._attachInputListeners();
    this._attachSubmissionListeners();
  }
}

module.exports = Form;
