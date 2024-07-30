
type currentType = 'circle' | 'square' | 'line' | 'pencil' | 'diamond' | 'arrow'
type OptionType = {
    container: HTMLElement
    type: currentType
}

export default class Board {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    currentType: currentType;
    pathSegmentHistory: ImageData[];
    index: number;
    constructor(option: OptionType) {
        const { container, type } = option
        this.container = container;
        this.canvas = this.createCanvas(container);
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.currentType = type;
        this.pathSegmentHistory = [];
        this.index = 0;
        this.init()
    }

    createCanvas(container: HTMLElement) {
        const canvas = document.createElement('canvas')
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
        canvas.style.display = 'block'
        canvas.style.backgroundColor = 'antiquewhite'
        container.appendChild(canvas)
        return canvas
    }

    init() {
        this.render();
        this.bindEvent();
    }

    render() {
        this.addPathSegment()
        this.setContext2DStyle();
    }
    bindEvent() {
        this.canvas.addEventListener('contextmenu', e => e.preventDefault())
        this.canvas.addEventListener('mousedown', this.mousedownEvent.bind(this))
        window.document.addEventListener('keydown', this.keydownEvent.bind(this))
    }
    // 设置画笔样式
    setContext2DStyle() {
        this.ctx.strokeStyle = '#EB7347'
        this.ctx.lineWidth = 3
        this.ctx.lineCap = 'round'
        this.ctx.lineJoin = 'round'
    }
    // 添加路径片段
    addPathSegment() {
        const data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        // 删除当前索引后的路径片段，然后追加一个新的路径片段，更新索引
        this.pathSegmentHistory.splice(this.index + 1)
        this.pathSegmentHistory.push(data)
        this.index = this.pathSegmentHistory.length - 1
    }
    // 鼠标事件
    mousedownEvent(e: MouseEvent) {
        this[this.currentType](e)
    }
    circle(e: MouseEvent) {
        const that = this
        const ctx = this.ctx;
        ctx.beginPath()
        const startX = e.offsetX
        const startY = e.offsetY
        let flag = true
        this.canvas.onmousemove = function (e) {
            if (flag) {
                const r = Math.abs(e.offsetX - startX) / 2;
                const pointX =  startX + (e.offsetX - startX) / 2
                const pointY =  startY + (e.offsetY - startY) / 2
                ctx.arc(pointX, pointY, r, 0, Math.PI * 2); // 画一个圆心为 (150, 75)，半径为 50 的圆
                ctx.stroke()
            }
        }
        this.canvas.onmouseup = this.canvas.onmouseout = function () {
            that.addPathSegment()
            this.onmousemove = null
            this.onmouseup = null
            this.onmouseout = null
        }
    }
    square() { }
    line() { }
    pencil(e: MouseEvent) {
        const that = this
        const ctx = this.ctx
        ctx.beginPath()
        ctx.moveTo(e.offsetX, e.offsetY)
        ctx.stroke()

        this.canvas.onmousemove = function (e) {
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
        }
        this.canvas.onmouseup = this.canvas.onmouseout = function () {
            that.addPathSegment()
            this.onmousemove = null
            this.onmouseup = null
            this.onmouseout = null
        }
    }
    diamond() { }
    arrow() { }
    // 键盘事件
    keydownEvent(e: KeyboardEvent) {
        if (!e.ctrlKey) return
        switch (e.keyCode) {
            case 90:
                this.undo()
                break
            case 89:
                this.redo()
                break
        }
    }
    undo() { }
    redo() { }

}

type PointType = { x: number, y: number }

class Point {
    constructor(public x: number, public y: number) {
        this.x = x
        this.y = y
    }
    setPosition(position: PointType) {
        this.x = position.x
        this.y = position.y
    }
    getPosition() {
        return { x: this.x, y: this.y }
    }
    setX(x: number) {
        this.x = x
    }
    setY(y: number) {
        this.y = y
    }
    getX() {
        return this.x
    }
    getY() {
        return this.y
    }
}


/**多角形（三角形、矩形、多边形），由多个点组成*/
export class Poly {
    points: Point[]
    ctx: CanvasRenderingContext2D;
    constructor(points: Point[], ctx: CanvasRenderingContext2D) {
        this.points = points
        this.ctx = ctx
    }
    getSize() {
        return this.points.length
    }
    getPoints() { 
        return this.points 
    }
    setPoints(points: Point[]) {
        this.points = points
    }
    setStart(point: Point) {
        this.points = [point];
    }
    setPoint(point: Point, index: number) {
        this.points[index] = point
    }
    add(point: Point) {
        this.points.push(point)
    }
    pop() {
        return this.points.pop()
    }
    shift() {
        return this.points.shift()
    }
    draw() {
        const { ctx, points } = this;
        ctx.beginPath();
        points.forEach((point, index) => {
            if(index === 0){
                ctx.moveTo(point.getX(),point.getY());
            }else{
                ctx.lineTo(point.getX(),point.getY());
            }
        })
        
        ctx.closePath();
        ctx.stroke();
    }
}