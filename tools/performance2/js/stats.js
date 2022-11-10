
let loadingDataContainer;
let Stats = function () {
  // 当前模式？
  let mode = 0;
  const container = document.createElement('div');
  container.style.cssText = `
    position:fixed;
    top:0;
    left:0;
    cursor:pointer;
    opacity:0.9;
    z-index:10000
  `;
  const addPanel = (panel) => {
    container.appendChild(panel.dom);
    return panel;
  }


  let beginTime = performance.now(), prevTime = beginTime, frames = 0;
  let fpsPanel = addPanel(new Stats.Panel('FPS', '#0ef', '#002'));
  // let msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));
  let memPanel;
  if (performance && performance.memory) {
    memPanel = addPanel(new Stats.Panel('MB', '#3e2', '#201'));
  }
  loadingDataContainer = document.createElement('pre');
  loadingDataContainer.style.color = "#fff";
  loadingDataContainer.style.fontSize = "14px";
  loadingDataContainer.style.backgroundColor = "rgba(0,0,0,.3)";
  container.appendChild(loadingDataContainer);
  // let { } = performance.timing;
  // loadingDataContainer.innerHTML = JSON.stringify(performance.timing,null,2);

  return {
    REVISION: 16,
    dom: container,
    addPanel: addPanel,
    begin: function () {
      beginTime = performance.now();
    },
    end: function () {
      frames++;
      let time = performance.now();
      // msPanel.update(time - beginTime, 200);
      if (time >= prevTime + 1000) {
        fpsPanel.update((frames * 1000) / (time - prevTime), 100);
        prevTime = time;
        frames = 0;
        if (memPanel) {
          let memory = performance.memory; 
          // memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
          memPanel.update(memory.usedJSHeapSize / 1048576, 600);
        }
      }
      return time;
    },
    update: function () {
      beginTime = this.end();
    },
    domElement: container,
  };
};

Stats.Panel = function (name, fg, bg) {
  let min = Infinity, max = 0, round = Math.round;
  let devicePixelRatio = round(window.devicePixelRatio || 1);
  let WIDTH = document.body.clientWidth * devicePixelRatio,
    HEIGHT = 48 * devicePixelRatio,
    TEXT_X = 3 * devicePixelRatio,
    TEXT_Y = 2 * devicePixelRatio,
    GRAPH_X = 3 * devicePixelRatio,
    GRAPH_Y = 15 * devicePixelRatio,
    GRAPH_WIDTH = document.body.clientWidth * devicePixelRatio - GRAPH_X,
    GRAPH_HEIGHT = 30 * devicePixelRatio;

  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas.style.cssText = `width:${document.body.clientWidth}px;height:48px;display:block`;

  const context = canvas.getContext('2d');
  context.font = 'bold ' + (9 * devicePixelRatio) + 'px Helvetica,Arial,sans-serif';
  context.textBaseline = 'top';

  context.fillStyle = bg;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  context.fillStyle = fg;
  context.fillText(name, TEXT_X, TEXT_Y);
  context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

  context.fillStyle = bg;
  context.globalAlpha = 0.9;
  context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
  let a = 0;
  return {
    dom: canvas,
    update: function (value, maxValue) {
      // debugger
      min = Math.min(min, value);
      max = Math.max(max, value);
      // 绘制panel bg
      context.fillStyle = bg;
      context.globalAlpha = 1;
      context.fillRect(0, 0, WIDTH, GRAPH_Y);
      context.fillStyle = fg;
      // 绘制pannel title
      context.fillText(
        round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')',
        TEXT_X,
        TEXT_Y
      );
      // loadingDataContainer.innerHTML = `
      // "performance.memory."
      // "totalJSHeapSize:" ${performance.memory.totalJSHeapSize}
      // "jsHeapSizeLimit:" ${performance.memory.usedJSHeapSize}
      // "usedJSHeapSize:" ${performance.memory.usedJSHeapSize}
      // `
      // 绘制图像？
      context.drawImage(
        canvas,
        GRAPH_X + devicePixelRatio,
        GRAPH_Y,
        GRAPH_WIDTH - devicePixelRatio,
        GRAPH_HEIGHT,
        GRAPH_X,
        GRAPH_Y,
        GRAPH_WIDTH - devicePixelRatio,
        GRAPH_HEIGHT);
      
      context.fillRect(
        GRAPH_X + GRAPH_WIDTH - devicePixelRatio,
        GRAPH_Y,
        devicePixelRatio,
        GRAPH_HEIGHT);
      
      context.fillStyle = bg;
      context.globalAlpha = 0.9;
      context.fillRect(
        GRAPH_X + GRAPH_WIDTH - devicePixelRatio,
        GRAPH_Y,
        devicePixelRatio,
        round((1 - (value / maxValue)) * GRAPH_HEIGHT));
    }
  };
};

stats = new Stats();
document.body.appendChild(stats.domElement);

const run = () => { 
  stats.end();
  requestAnimationFrame(() => { 
    run();
  })
}
run();

const _P = {
  getFirstPaintTime: function () {
    var firstPaintTime = 0;
    if (window.chrome && typeof window.chrome.loadTimes === "function") { //Chrome
      firstPaintTime = window.chrome.loadTimes().firstPaintTime * 1000;
    } else if (typeof _P.timing.msFirstPaint === "number") { //IE
      firstPaintTime = _P.timing.msFirstPaint;
    }
    return Math.round(firstPaintTime);
  }
}
const useReportPageLoadTime = () => {
  const reportTime = () => {
    // let navPerformance;
    // navPerformance = window.performance.getEntriesByType('navigation')[0]

    // console.log({
    //   duration: navPerformance.duration,
    //   blob: navPerformance.toJSON()
    // })

    let timing=window.performance.timing;
    var startTime = timing.navigationStart || timing.fetchStart;
    // var data = {
    //   "t_unload": timing.unloadEventEnd - timing.unloadEventStart, //上个文档的卸载时间
    //   "t_redirect": timing.redirectEnd - timing.redirectStart, //*重定向时间
    //   "t_dns": timing.domainLookupEnd - timing.domainLookupStart, //*DNS查询时间
    //   "t_tcp": timing.connectEnd - timing.connectStart, //*服务器连接时间
    //   "t_request": timing.responseStart - timing.requestStart, //*服务器响应时间
    //   "t_response：网页下载时间": timing.responseEnd - timing.responseStart, //*网页下载时间
    //   "t_paint：首次渲染时间": _P.getFirstPaintTime() - startTime, //*首次渲染时间
    //   "t_dom": timing.domContentLoadedEventStart - timing.domLoading, //dom ready时间（阶段）
    //   "t_domready": timing.domContentLoadedEventStart - startTime, //*dom ready时间（总和）
    //   "t_load": timing.loadEventStart - timing.domLoading, //onload时间（阶段）
    //   "t_onload:总onload时间": timing.loadEventStart - startTime, //*onload时间（总和）
    //   "t_white：白屏时间": timing.responseStart - startTime, //*白屏时间
    //   "t_all": timing.loadEventEnd - startTime //整个过程的时间之和
    // };
    var data = {
      // "t_unload": timing.unloadEventEnd - timing.unloadEventStart, //上个文档的卸载时间
      // "t_redirect": timing.redirectEnd - timing.redirectStart, //*重定向时间
      "DNS查询时间": timing.domainLookupEnd - timing.domainLookupStart, //*DNS查询时间
      "服务器连接时间": timing.connectEnd - timing.connectStart, //*服务器连接时间
      "服务器响应时间": timing.responseStart - timing.requestStart, //*服务器响应时间
      "网页下载时间": timing.responseEnd - timing.responseStart, //*网页下载时间
      // "白屏时间": timing.responseStart - startTime, //*白屏时间
      "首次渲染时间": _P.getFirstPaintTime() - startTime, //*首次渲染时间
      "dom ready时间": timing.domContentLoadedEventStart - startTime, //*dom ready时间（总和）
      "onload时间": timing.loadEventStart - startTime, //*onload时间（总和）
      // "整个过程的时间之和": timing.loadEventEnd - startTime //整个过程的时间之和
    };
    loadingDataContainer.innerHTML=JSON.stringify(data,null,2);
  }


  window.addEventListener('load', reportTime)

}

useReportPageLoadTime();