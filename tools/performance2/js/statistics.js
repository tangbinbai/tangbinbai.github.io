import InfoBar from './infoBar.js';
var Statistics = /** @class */ (function () {
    function Statistics() {
        this.container = document.createElement('div');
        this.infoBarList = [];
        this.includeField = {
            name: true,
            // connectStart: true,
            connectEnd: true,
            // decodedBodySize: true,
            domComplete: true,
            // domContentLoadedEventEnd: true,
            // domContentLoadedEventStart: true,
            domInteractive: true,
            // domainLookupEnd: true,
            // domainLookupStart: true,
            // encodedBodySize: true,
            // fetchStart: true,
            // loadEventStart: true,
            loadEventEnd: true,
            duration: true,
            // redirectCount: true,
            // redirectEnd: true,
            // redirectStart: true,
            // requestStart: true,
            // responseEnd: true,
            // responseStart: true,
        };
        var timing = performance.getEntriesByType("navigation")[0];
        this.timing = timing;
        this.listFiled();
    }
    Statistics.prototype.listFiled = function () {
        var _this = this;
        Object.keys(this.includeField).forEach(function (keyName) {
            if (_this.timing[keyName]) {
                _this.infoBarList.push(new InfoBar({
                    name: keyName,
                    value: _this.timing[keyName]
                }));
            }
        });
        this.infoBarList.forEach(function (infoBar) {
            _this.container.appendChild(infoBar.container);
        });
    };
    return Statistics;
}());
export default Statistics;
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
