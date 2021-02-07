class Paint {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.isDragging = false;
    this.startPoint = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.canvas.onmousedown = this.mouseDown.bind(this);
    this.canvas.onmouseup = this.mouseUp.bind(this);
    this.canvas.onmousemove = this.mouseMove.bind(this);

    this.canvas.ontouchstart = this.mouseDown.bind(this);
    this.canvas.ontouchend = this.mouseUp.bind(this);
    this.canvas.ontouchmove = this.mouseMove.bind(this);
  }

  mouseDown(e) {
    this.isDragging = true;
    this.startPoint.x = e.offsetX;
    this.startPoint.y = e.offsetY;
    this.context.beginPath();
    this.context.moveTo(this.startPoint.x, this.startPoint.y);
    this.context.strokeStyle = "#fff";
  }

  mouseUp(e) {
    this.isDragging = false;
  }

  mouseMove(e) {
    if (!this.isDragging) return;

    if (e instanceof TouchEvent) {
      this.context.lineTo(
        e.touches[0].pageX - e.touches[0].target.offsetLeft,
        e.touches[0].pageY - e.touches[0].target.offsetTop
      );
    } else {
      this.context.lineTo(e.offsetX, e.offsetY);
    }
    this.context.stroke();
  }
}

module.exports = Paint;
