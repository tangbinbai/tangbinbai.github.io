
import InfoBar from './infoBar.js';
export default class Statistics {
  container: HTMLElement = document.createElement('div'); 
  infoBarList: InfoBar[] = [];
  timing: any;
  includeField: object = {
    name: true,
    connectStart: true,
    // connectEnd: true,
    // decodedBodySize: true,
    domComplete: true,
    // domContentLoadedEventEnd: true,
    // domContentLoadedEventStart: true,
    domInteractive: true,
    // domainLookupEnd: true,
    // domainLookupStart: true,
    // encodedBodySize: true,
    // fetchStart: true,
    loadEventStart: true,
    loadEventEnd: true,
    duration: true,
    // redirectCount: true,
    // redirectEnd: true,
    // redirectStart: true,
    // requestStart: true,
    // responseEnd: true,
    // responseStart: true,
  }
  constructor() { 
    const [timing] = performance.getEntriesByType("navigation");
    this.timing = timing;
    this.listFiled();
  }
  listFiled() { 
    Object.keys(this.includeField).forEach(keyName => { 
      if ((this.timing as any)[keyName]) {
        this.infoBarList.push(new InfoBar({
          name: keyName as string,
          value: this.timing[keyName] as number
        }))
      }
    })
    this.infoBarList.forEach(infoBar => { 
      this.container.appendChild(infoBar.container);
    })
  }
}



// let p0 = new InfoBar({
//   name: "FPS",
//   value: 60,
// })
// let p1 = new InfoBar({
//   name: "内存",
//   value: 60,
// })
// let p2 = new InfoBar({
//   name: "HTML加载",
//   value: 200,
// })
// let p3 = new InfoBar({
//   name: "onload event",
//   value: 300,
// })
// let p4 = new InfoBar({
//   name: "加载相关",
//   value: 300,
// })
// let p5 = new InfoBar({
//   name: "加载相关",
//   value: 300,
// })
// let p6 = new InfoBar({
//   name: "加载相关",
//   value: 300,
// })
// let p7 = new InfoBar({
//   name: "加载相关",
//   value: 300,
// })

// // backgroundColor: 'rgba(251,43,60,.9)',

// // backgroundColor: 'rgba(251,43,60,.9)',

// pr.container.appendChild(p2.container);
// pr.container.appendChild(p3.container);
// pr.container.appendChild(p4.container);
// pr.container.appendChild(p5.container);
// pr.container.appendChild(p6.container);
// pr.container.appendChild(p7.container);

// // 2分钟后终止？
// // pr.container.appendChild(p0.container);
// // pr.container.appendChild(p1.container);