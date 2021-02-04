class Form {
  constructor(form, submit, sorter) {
    this.form = form;
    this.submit = submit;
    this.sorter = sorter;

    this.state = {
      algorithm: "merge-sort",
      order: "ascending",
    };

    this.initializeState();
    this.attachListeners();
  }

  _initRadioButtons() {
    var fieldsets = this.form.querySelectorAll("fieldset");

    for (f of fieldsets) {
      console.log(f.id);
      console.log(f.querySelector(`input[value="${this.state.algorithm}"]`));
      switch (f.id) {
        case "algorithm":
          const activeAlgo = f.querySelector(
            `input[value="${this.state.algorithm}"]`
          );
          activeAlgo.checked = true;
          break;
        case "order":
          let activeOrder = f.querySelector(
            `input[value="${this.state.order}"]`
          );
          activeOrder.checked = true;
          break;
      }
    }
  }

  initializeState() {
    this._initRadioButtons();
  }

  _attachInputListeners() {
    console.log("input");
    const inputs = this.form.querySelectorAll("input");
    for (input of inputs) {
      input.onchange = (e) => {
        if (this.state[e.target.name]) {
          this.state[e.target.name] = e.target.value;
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
            this.sorter.sort(this.state.algorithm, this.state.order);
            break;
          case "randomize":
            this.sorter.randomize();
            break;
        }
      };
    }
  }

  attachListeners() {
    console.log("attempting to attach");
    this._attachInputListeners();
    this._attachSubmissionListeners();
  }
}

module.exports = Form;
