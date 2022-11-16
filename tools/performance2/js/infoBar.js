var InfoBar = /** @class */ (function () {
    function InfoBar(params) {
        // backgroundColor: string = '#002809';
        this.backgroundColor = '#222454';
        this.fontColor = 'rgba(255,255,255,.75)';
        this.container = document.createElement('div');
        this.name = '';
        this.value = 0;
        this.unit = "MS";
        this.name = params.name;
        this.value = params.value;
        this.backgroundColor = params.backgroundColor || this.backgroundColor;
        this.fontColor = params.fontColor || this.fontColor;
        var valueNum = Math.round(this.value);
        this.setContent("".concat(this.name, ": ").concat(isNaN(this.value) ? this.value : valueNum, " ").concat(isNaN(this.value) ? '' : this.unit));
        this.setStyle();
    }
    InfoBar.prototype.setContent = function (content) {
        this.container.innerHTML = content;
    };
    InfoBar.prototype.setStyle = function () {
        this.container.style.cssText = "\n      float:left;\n      clear:both;\n      height: 22px;\n      line-height: 22px;\n      padding-left:4px;\n      padding-right:8px;\n      font-size:10px;\n      white-space: nowrap;\n      text-shadow: 0 0 3px soild black;\n      background-color:".concat(this.backgroundColor, ";\n      color:").concat(this.fontColor, ";\n      border-top-right-radius:20px;\n      border-bottom-right-radius:20px;\n      margin-bottom:-2px;\n      font-size:10px;\n      transform:scale(.9);\n      transform-origin:left top;\n    ");
    };
    InfoBar.prototype.setAlertStyle = function () {
        this.container.style.backgroundColor = "#e31e1e";
    };
    return InfoBar;
}());
export default InfoBar;
