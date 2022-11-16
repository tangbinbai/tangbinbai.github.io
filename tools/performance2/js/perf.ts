import Panel from './panel.js';
import Statistics from './statistics.js';
class Perf { 
  container: HTMLElement = document.createElement('div'); 
  prevTime: number = performance.now();
  frames: number = 0;
  fpsPanel: Panel = new Panel('FPS', "#fce6f7", "#301225");
  memPanel?: Panel = (performance as any).memory ? new Panel('MB', '#7de398', "#002809") : undefined;
  requestAnimationFrameTimer: number = 0;
  constructor() { 
    this.setContainnerStyle();
    this.addPanel(this.fpsPanel);
    this.memPanel && this.addPanel(this.memPanel);
  }
  setContainnerStyle() {
    this.container.style.cssText = `
      position:fixed;
      top:0;
      left:0;
      cursor:pointer;
      opacity:0.9;
      z-index:10000
    `;
  }
  addPanel(panel: Panel) {
    this.container.appendChild(panel.canvas);
    return panel;
  }
  runOneFrame() { 
    this.frames++;
    const time = performance.now();
    if (time < this.prevTime + 1000) { 
      return;
    }
    this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 60);
    this.prevTime = time;
    this.frames = 0;
    if (this.memPanel) {
      this.memPanel.update((performance as any).memory.usedJSHeapSize / 1048576, 300);
    }
  }
  watch() { 
    this.runOneFrame();
    this.requestAnimationFrameTimer = requestAnimationFrame(() => {
      this.watch();
    })
    return this;
  }
  unWatch() { 
    this.requestAnimationFrameTimer && cancelAnimationFrame(this.requestAnimationFrameTimer);
    return this;
  }
}

const pr = new Perf();
pr.watch();
document.body.appendChild(pr.container);
// pr.unWatch();


window.onload = () => {
  setTimeout(() => {
    const sta = new Statistics();
    pr.container.append(sta.container)
  }, 200);
};