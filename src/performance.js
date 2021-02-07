class Performance {
  constructor(container) {
    this.container = container;
    this.heapUsage = this.container.querySelector("#heap-usage");
    this.interval = null;
    this.init();
  }

  render() {
    const {
      usedJSHeapSize,
      totalJSHeapSize,
      jsHeapSizeLimit,
    } = window.performance.memory;
    const heappct = ((usedJSHeapSize / jsHeapSizeLimit) * 100).toFixed(2);
    this.heapUsage.innerHTML = "Pct of limit: " + heappct + " %";
  }

  init() {
    this.interval = setInterval(this.render.bind(this), 1000);
  }
}

module.exports = Performance;
