import { generateSegments, lineBreak, pageBreak } from './utils'

type OptionsType = {
  width?: number,
  height?: number,
  padding?: {
    top: number,
    right: number,
    bottom: number,
    left: number,
  },
  fontSize?: string | number,
  fontFamily?: string,
  lineHeight?: number,
  newlineRegExp?: RegExp,
  backgroundColor?: string, 
  textColor?: string
}

import { ref, Ref } from 'vue'
export default class CanvasTextRenderer {
  private dom: HTMLCanvasElement
  private options: OptionsType
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private pages: string[][] = []
  public currentPageIndex: Ref<number, number> = ref(0)
  constructor({dom, options = {}}) {
    this.dom = dom
    this.options = this.initDefaultOptions(options)
    const { canvas, ctx } = this.createCanvas()
    this.canvas = canvas
    this.ctx = ctx
  }

  initDefaultOptions(options) {
    const defaultOptions = {
      width: 500,
      height: 800,
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      fontSize: 12,
      fontFamily: 'Helvetica, Tahoma, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Heiti SC, WenQuanYi Micro Hei, sans-serif;',
      lineHeight: 12,
      backgroundColor: '#eee',
      textColor: '#000',
    }
    return Object.assign(defaultOptions, options)
  }
  public render(text) {
    // 计算文本内容
    this.computedText(text)
    // 绘制文本
    this.drawText();
  }
  private computedText(text) {
    const { height, padding: { top, right, bottom, left }, lineHeight, width, newlineRegExp } = this.options;
    const segments = generateSegments(text, null);

    const maxWidth = width - left - right;
    const lines = lineBreak({
      segments, 
      options: {
        maxWidth,
        measureText: (text) => {
          return this.ctx?.measureText(text) || { width: 0 };
        },
        newlineRegExp,
      }
    })

    const contentHeight = height - top - bottom;
    const pages = pageBreak({
      lines, 
      options: {
        lineHeight,
        contentHeight,
      }
    })
    this.pages = pages;
    this.currentPageIndex.value = 0
  }
  private drawText() {
    const { ctx, options, currentPageIndex } = this;
    const { backgroundColor, textColor, padding } = options;
    const currentPage = this.pages[currentPageIndex.value];

    if (!ctx || !currentPage) {
      return;
    }

    // 清空画布
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 绘制背景
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 绘制文本
    ctx.fillStyle = textColor;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    currentPage.forEach((line, index) => {
      const x = padding.left;
      let y = index * options.lineHeight + padding.top;

      ctx.fillText(line, x, y);
    });
  }
  public next() {
    if(this.currentPageIndex.value >= this.pages.length - 1) return
    this.currentPageIndex.value++;
    this.drawText();
  }
  public prev() {
    if(this.currentPageIndex.value <= 0) { 
      return
    }
    this.currentPageIndex.value--;
    this.drawText();
  }
  downloadCurrentPage() {
    if (!this.ctx) {
      return;
    }
    const link = document.createElement('a');
    link.download = `第${this.currentPageIndex.value + 1}页.png`;
    link.href = this.canvas.toDataURL();
    link.click();
  }
  downloadAll() {
    if (!this.ctx) {
      return;
    }

    const currentPageIndex = this.currentPageIndex;

    this.pages.forEach((_, index) => {
      this.currentPageIndex.value = index;
      this.drawText();
      this.downloadCurrentPage();
    });

    this.currentPageIndex = currentPageIndex;
    this.drawText();
  }

  private createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    const dpi = window.devicePixelRatio || 1;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
    canvas.width *= dpi;
    canvas.height *= dpi;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpi, dpi);
    ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;
    // TODO: 这里需要考虑 dom 节点的位置，比如 dom 节点是绝对定位的，那么 canvas 节点需要相对于 dom 节点定位
    this.dom.appendChild(canvas);

    return { canvas, ctx };
  }
}
