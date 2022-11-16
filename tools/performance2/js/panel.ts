export default class Panel {
  name: string;
  backgroundColor: string;
  frontColor: string;
  min : number = Infinity;
  max: number = 0;
  devicePixelRatio: number = Math.round(window.devicePixelRatio || 1);
  basePanelWidth: number = document.body.clientWidth; // pannel width
  basePanelHeight: number = 60;// pannel height
  baseTitleHeight: number = 14;
  width: number = this.basePanelWidth * this.devicePixelRatio;
  height: number = this.basePanelHeight * this.devicePixelRatio;
  textX:number =  3 * this.devicePixelRatio;
  textY:number =  2 * this.devicePixelRatio;
  graphX:number =  3 * this.devicePixelRatio;
  graphY: number = this.baseTitleHeight * this.devicePixelRatio;
  graphWidth:number =  this.basePanelWidth * this.devicePixelRatio - this.graphX;
  graphHeight: number = (this.basePanelHeight-this.baseTitleHeight) * this.devicePixelRatio;
  canvas: HTMLCanvasElement = document.createElement('canvas');
  context: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  tempTips: string= ''; // 临时提示
  constructor(name: string, frontColor: string, backgroundColor: string) {
    this.name = name;
    this.frontColor = frontColor;
    this.backgroundColor = backgroundColor;
    this.initCanvas()
  }
  initCanvas() { 
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.cssText = `
      width:${this.basePanelWidth}px;
      height:${this.basePanelHeight}px;
      display:block;
    `;
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
  }
  beforeRender(value: number) { 
    // hook
    if (this.name === "FPS") {
      if (value > 50) {
        this.frontColor = "#fce6f7"
      }else if (value > 40) {
        this.frontColor = "#ff9fe9"
      } else if (value > 30) { 
        this.frontColor = "#ee7000"
      }else{
        this.frontColor = "#e31e1e";
      }
    }
    // hook
    if (this.name === "MB") {
      if (value < 100) {
        this.frontColor = "#7de398"
      } else if (value < 200) {
        this.frontColor = "#35ca5c"
      } else if (value < 300) {
        this.frontColor = "#ee7000"
      } else {
        this.frontColor = "#e31e1e";
      }
    }
  }
  update(value: number, maxValue: number) {
    this.min = Math.min(this.min, value);
    this.max = Math.max(this.max, value);
    this.context.fillStyle = this.backgroundColor;
    this.context.globalAlpha = 1;
    this.context.fillRect(0, 0, this.width, this.graphY);
    this.beforeRender(value);
    this.context.fillStyle = this.frontColor;
    this.tempTips= this.name=='MB'? ' X5浏览器下个版本支持': '';
    this.context.fillText(
      `${this.name} ${Math.round(value)} (${Math.round(this.min)}-${Math.round(this.max)}) ${this.tempTips}`,
      this.textX,
      this.textY
    );
    this.context.drawImage(
      this.canvas,
      this.graphX + devicePixelRatio,
      this.graphY,
      this.graphWidth - devicePixelRatio,
      this.graphHeight,
      this.graphX,
      this.graphY,
      this.graphWidth - devicePixelRatio,
      this.graphHeight);
    this.context.fillRect(
      this.graphX + this.graphWidth - devicePixelRatio,
      this.graphY,
      devicePixelRatio,
      this.graphHeight);
    this.context.fillStyle = this.backgroundColor;
    this.context.globalAlpha = 0.9;
    this.context.fillRect(
      this.graphX + this.graphWidth - devicePixelRatio,
      this.graphY,
      devicePixelRatio,
      Math.round((1 - (value / maxValue)) * this.graphHeight));
  }
}
