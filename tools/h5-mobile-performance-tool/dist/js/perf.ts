import Panel from './panel.js';
import LoadTime from './loadTime.js';
class Perf {
  fpsPanel: Panel;
  memPanel?: Panel;
  frames: number = 0;
  isMinimized: boolean = false;
  prevTime: number = performance.now();
  loadTime: LoadTime;
  requestAnimationFrameTimer: number = 0;
  container: HTMLElement = document.createElement('div');
  private static instance: Perf;
  public static getInstance() {
    if (!Perf.instance) {
      Perf.instance = new Perf();
    }
    return Perf.instance;
  }
  private constructor() {
    // fps panel
    this.fpsPanel = new Panel({
      name: 'FPS',
      frontColor: "#fce6f7",
      titleBgColor: "#301225",
      contentBgColor: "#402237",
      unit: ''
    });
    this.addPanel(this.fpsPanel);

    // memPanel panel
    if ((performance as any).memory) { 
      this.memPanel = new Panel({
        name: 'MEM',
        frontColor: '#b6fed4',
        titleBgColor: "#002809",
        contentBgColor: "#183d19",
        unit: 'MB'
      });
      this.addPanel(this.memPanel);
      // //X5暂时不支持的问题，临时提醒
      // const memPanel = this.memPanel;
      // this.memPanel.getHeader = (value: number) => { 
      //   return `${memPanel.name} ${Math.round(value)}${memPanel.unit || ''} (${Math.round(memPanel.historicalMin)} ~ ${Math.round(memPanel.historicalMax)}) X5浏览器下个版本支持`
      // }
    }

    // todo cpu panel 等待客户端给接口

    // loadTime
    this.loadTime = new LoadTime();
    this.container.append(this.loadTime.container)
    // 一些样式和事件
    this.setContainnerStyle();
    this.initEvent()
  }

  /**
   * @description 设置容器样式
   */
  setContainnerStyle() {
    this.container.style.cssText = `
      position:fixed;
      top:0;
      left:0;
      right:0;
      height:0;
      cursor:pointer;
      opacity:0.95;
      z-index:9998;
    `;
  }
  initEvent() { 
    let self = this;
    this.container.addEventListener("click", () => {
      self.toggleView()
    })
  }
  addPanel(panel: Panel) {
    this.container.appendChild(panel.canvas);
    return panel;
  }
  renderOneFrame() {
    this.frames++;
    const time = performance.now();
    if (time < this.prevTime + 1000) {
      return;
    }
    this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 60);
    this.prevTime = time;
    this.frames = 0;
    if (this.memPanel) {
      this.memPanel.update((performance as any).memory?.usedJSHeapSize / 1048576, 300);
    }
  }
  toggleView() { 
    if (this.isMinimized) {
      this.isMinimized = false;
      this.container.style.width = "auto";
      this.container.style.height = "0px";
      this.container.style.overflow = "visible";
    } else {
      this.isMinimized = true;
      this.container.style.width = "40px";
      this.container.style.height = "14px";
      this.container.style.overflow = "hidden";
    }
  }
  start() {
    document.body.appendChild(this.container)
    const animation = () => { 
      this.renderOneFrame();
      this.requestAnimationFrameTimer = requestAnimationFrame(() => {
        animation();
      })
    }
    animation();
  }
  end() {
    this.reset();
    this.pause();
    this.container.remove();
  }
  pause() {
    this.requestAnimationFrameTimer && cancelAnimationFrame(this.requestAnimationFrameTimer);
  }
  reset() {
    this.isMinimized = false;
    this.fpsPanel.reset();
    this.memPanel?.reset(); 
    this.loadTime.reset();
  }
}

// 对外暴露，todo改单例
// const pr = Perf.getInstance();
// pr.start();
// // pr.end();
// // pr.reset();
// // pr.pause();
// console.dir(pr)