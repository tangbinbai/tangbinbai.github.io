export default class InfoBar {
  // backgroundColor: string = '#002809';
  backgroundColor: string = '#222454';
  fontColor: string = 'rgba(255,255,255,.75)';

  container: HTMLElement = document.createElement('div');
  name: string = '';
  value: number = 0;
  unit: string = "MS"
  constructor(params: {
    name: string,
    value: number,
    fontColor?: string
    backgroundColor?: string
  }) {
    this.name = params.name;
    this.value = params.value;
    this.backgroundColor = params.backgroundColor || this.backgroundColor;
    this.fontColor = params.fontColor || this.fontColor;
    const valueNum = Math.round(this.value);
    this.setContent(`${this.name}: ${isNaN(this.value) ? this.value : valueNum} ${isNaN(this.value) ? '' : this.unit}`)
    this.setStyle();
  }
  setContent(content:string) { 
    this.container.innerHTML = content;
  }
  setStyle() { 
    this.container.style.cssText = `
      float:left;
      clear:both;
      height: 22px;
      line-height: 22px;
      padding-left:4px;
      padding-right:8px;
      font-size:10px;
      white-space: nowrap;
      text-shadow: 0 0 3px soild black;
      background-color:${this.backgroundColor};
      color:${this.fontColor};
      border-top-right-radius:20px;
      border-bottom-right-radius:20px;
      margin-bottom:-2px;
      font-size:10px;
      transform:scale(.9);
      transform-origin:left top;
    `;
  }
  setAlertStyle() { 
    this.container.style.backgroundColor = "#e31e1e"
  }
}