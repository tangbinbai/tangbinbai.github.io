import Panel from './panel.js';
import Statistics from './statistics.js';
var colorsGroup = {
    g1: ["#fce6f7", "#301225"],
    g2: ["#cd45a2", "#29001c"],
    g3: ['#7de398', "#002809"],
};
var Perf = /** @class */ (function () {
    function Perf() {
        this.container = document.createElement('div');
        this.prevTime = performance.now();
        this.frames = 0;
        this.fpsPanel = new Panel('FPS', colorsGroup.g1[0], colorsGroup.g1[1]);
        this.memPanel = performance.memory ? new Panel('MB', colorsGroup.g3[0], colorsGroup.g3[1]) : undefined;
        this.requestAnimationFrameTimer = 0;
        this.setContainnerStyle();
        this.addPanel(this.fpsPanel);
        this.memPanel && this.addPanel(this.memPanel);
    }
    Perf.prototype.setContainnerStyle = function () {
        this.container.style.cssText = "\n      position:fixed;\n      top:0;\n      left:0;\n      cursor:pointer;\n      opacity:0.9;\n      z-index:10000\n    ";
    };
    Perf.prototype.addPanel = function (panel) {
        this.container.appendChild(panel.canvas);
        return panel;
    };
    Perf.prototype.runOneFrame = function () {
        this.frames++;
        var time = performance.now();
        if (time < this.prevTime + 1000) {
            return;
        }
        this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 60);
        this.prevTime = time;
        this.frames = 0;
        if (this.memPanel) {
            this.memPanel.update(performance.memory.usedJSHeapSize / 1048576, 300);
        }
    };
    Perf.prototype.watch = function () {
        var _this = this;
        this.runOneFrame();
        this.requestAnimationFrameTimer = requestAnimationFrame(function () {
            _this.watch();
        });
        return this;
    };
    Perf.prototype.unWatch = function () {
        this.requestAnimationFrameTimer && cancelAnimationFrame(this.requestAnimationFrameTimer);
        return this;
    };
    return Perf;
}());
var pr = new Perf();
pr.watch();
document.body.appendChild(pr.container);
// pr.unWatch();
window.onload = function () {
    setTimeout(function () {
        var sta = new Statistics();
        pr.container.append(sta.container);
    }, 200);
};
