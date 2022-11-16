var Panel = /** @class */ (function () {
    function Panel(name, frontColor, backgroundColor) {
        this.min = Infinity;
        this.max = 0;
        this.devicePixelRatio = Math.round(window.devicePixelRatio || 1);
        this.basePanelWidth = document.body.clientWidth; // pannel width
        this.basePanelHeight = 60; // pannel height
        this.baseTitleHeight = 14;
        this.width = this.basePanelWidth * this.devicePixelRatio;
        this.height = this.basePanelHeight * this.devicePixelRatio;
        this.textX = 3 * this.devicePixelRatio;
        this.textY = 2 * this.devicePixelRatio;
        this.graphX = 3 * this.devicePixelRatio;
        this.graphY = this.baseTitleHeight * this.devicePixelRatio;
        this.graphWidth = this.basePanelWidth * this.devicePixelRatio - this.graphX;
        this.graphHeight = (this.basePanelHeight - this.baseTitleHeight) * this.devicePixelRatio;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext("2d");
        this.tempTips = ''; // 临时提示
        this.name = name;
        this.frontColor = frontColor;
        this.backgroundColor = backgroundColor;
        this.initCanvas();
    }
    Panel.prototype.initCanvas = function () {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.cssText = "\n      width:".concat(this.basePanelWidth, "px;\n      height:").concat(this.basePanelHeight, "px;\n      display:block;\n    ");
        this.context.font = (10 * devicePixelRatio) + 'px Helvetica,Arial,sans-serif';
        this.context.textBaseline = 'top';
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.fillStyle = this.frontColor;
        this.context.fillText(this.name, this.textX, this.textY);
        this.context.fillRect(this.graphX, this.graphY, this.graphWidth, this.graphHeight);
        this.context.fillStyle = this.backgroundColor;
        this.context.globalAlpha = 0.9;
        this.context.fillRect(this.graphX, this.graphY, this.graphWidth, this.graphHeight);
    };
    Panel.prototype.beforeRender = function (value) {
        // hook
        if (this.name === "FPS") {
            if (value > 50) {
                this.frontColor = "#fce6f7";
            }
            else if (value > 40) {
                this.frontColor = "#ff9fe9";
            }
            else if (value > 30) {
                this.frontColor = "#ee7000";
            }
            else {
                this.frontColor = "#e31e1e";
            }
        }
        // hook
        if (this.name === "MB") {
            if (value < 100) {
                this.frontColor = "#7de398";
            }
            else if (value < 200) {
                this.frontColor = "#35ca5c";
            }
            else if (value < 300) {
                this.frontColor = "#ee7000";
            }
            else {
                this.frontColor = "#e31e1e";
            }
        }
    };
    Panel.prototype.update = function (value, maxValue) {
        this.min = Math.min(this.min, value);
        this.max = Math.max(this.max, value);
        this.context.fillStyle = this.backgroundColor;
        this.context.globalAlpha = 1;
        this.context.fillRect(0, 0, this.width, this.graphY);
        this.beforeRender(value);
        this.context.fillStyle = this.frontColor;
        this.tempTips = this.name == 'MB' ? ' X5浏览器下个版本支持' : '';
        this.context.fillText("".concat(this.name, " ").concat(Math.round(value), " (").concat(Math.round(this.min), "-").concat(Math.round(this.max), ") ").concat(this.tempTips), this.textX, this.textY);
        this.context.drawImage(this.canvas, this.graphX + devicePixelRatio, this.graphY, this.graphWidth - devicePixelRatio, this.graphHeight, this.graphX, this.graphY, this.graphWidth - devicePixelRatio, this.graphHeight);
        this.context.fillRect(this.graphX + this.graphWidth - devicePixelRatio, this.graphY, devicePixelRatio, this.graphHeight);
        this.context.fillStyle = this.backgroundColor;
        this.context.globalAlpha = 0.9;
        this.context.fillRect(this.graphX + this.graphWidth - devicePixelRatio, this.graphY, devicePixelRatio, Math.round((1 - (value / maxValue)) * this.graphHeight));
    };
    return Panel;
}());
export default Panel;
