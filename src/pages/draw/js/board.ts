
type currentType = 'circle' | 'rect' | 'line' | 'pencil' | 'diamond' | 'arrow'
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
    shapes: any[] = [];
    drawing: boolean = false;
    startPoint: Point = new Point(0, 0);
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
        this.draw()
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
    changeShape(shape: currentType) {
        this.currentType = shape
    }
    // 鼠标事件
    mousedownEvent(e: MouseEvent) {
        const that = this
        const ctx = this.ctx;
        this.canvas.style.cursor = 'pointer'
        ctx.beginPath()
        const startX = e.offsetX
        const startY = e.offsetY
        const shapeConstructorMap = {
            circle: Circle,
            rect: Rect,
            line: Line,
            pencil: Pencil,
            diamond: Diamond,
            arrow: Arrow
        }
        this.drawing = true
        this.startPoint = new Point(startX, startY)
        let shape = new shapeConstructorMap[this.currentType]([this.startPoint], ctx);
        this.shapes.push(shape)
        this[this.currentType](e);
        this.canvas.onmouseup = this.canvas.onmouseout = function () {
            that.addPathSegment();
            that.drawing = false
            this.onmousemove = null
            this.onmouseup = null
            this.onmouseout = null
            that.canvas.style.cursor = 'default'
        }
    }
    circle(e: MouseEvent) {
        const that = this
        const startX = e.offsetX
        const startY = e.offsetY
        let shape = this.shapes[this.shapes.length - 1]
        this.canvas.onmousemove = function (e) {
            if (that.drawing) {
                const startPoint = new Point(startX, startY);
                const endPoint = new Point(e.offsetX, e.offsetY);
                shape.setPoints([startPoint, endPoint])
            }
        }
    }
    rect(e: MouseEvent) {
        const that = this
        const startX = e.offsetX
        const startY = e.offsetY
        let shape = this.shapes[this.shapes.length - 1]
        this.canvas.onmousemove = function (e) {
            if (that.drawing) {
                const endX = e.offsetX;
                const endY = e.offsetY;
                const minX = Math.min(startX, endX);
                const minY = Math.min(startY, endY);
                const maxX = Math.max(startX, endX);
                const maxY = Math.max(startY, endY);
                const topLeftPoint = new Point(minX, maxY)
                const topRightPoint = new Point(maxX, maxY)
                const bottomRightPoint = new Point(maxX, minY)
                const bottomLeftPoint = new Point(minX, minY)
                shape.setPoints([topLeftPoint, topRightPoint, bottomRightPoint, bottomLeftPoint])
            }
        }
    }
    line(e: MouseEvent) {
        const that = this
        let shape = this.shapes[this.shapes.length - 1]
        this.canvas.onmousemove = function (e) {
            if (that.drawing) {
                const endX = e.offsetX;
                const endY = e.offsetY;
                const endPoint = new Point(endX, endY)
                shape.setEndPoint(endPoint)
            }
        }
    }
    pencil(e: MouseEvent) {
        const that = this
        let shape = this.shapes[this.shapes.length - 1]
        this.canvas.onmousemove = function (e) {
            if (that.drawing) {
                shape.addPoint(new Point(e.offsetX, e.offsetY))
            }
        }
    }
    diamond(e: MouseEvent) { 
        const that = this
        const startX = e.offsetX
        const startY = e.offsetY
        let shape = this.shapes[this.shapes.length - 1]
        this.canvas.onmousemove = function (e) {
            if (that.drawing) {
                const endX = e.offsetX;
                const endY = e.offsetY;
                let point1 = new Point(startX, startY + (endY - startY) / 2)
                let point2 = new Point(startX + (endX - startX) / 2, endY)
                let point3 = new Point(endX, startY + (endY - startY) / 2)
                let point4 = new Point(startX + (endX - startX) / 2, startY)
                shape.setPoints([point1, point2, point3, point4])
            }
        }
    }
    arrow(e: MouseEvent) {
        const that = this
        let shape = this.shapes[this.shapes.length - 1]
        this.canvas.onmousemove = function (e) {
            if (that.drawing) {
                const endPoint = new Point(e.offsetX, e.offsetY)
                shape.setEndPoint(endPoint)
            }
        }
    }
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
    draw() {
        requestAnimationFrame(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.shapes.forEach(shapes => {
                shapes.draw()
            })
            this.draw()
        })
    }

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

class BaseShape {
    points: Point[]
    ctx: CanvasRenderingContext2D;
    constructor(points: Point[], ctx: CanvasRenderingContext2D) {
        this.points = points
        this.ctx = ctx
    }
    setPoints(points: Point[]) {
        this.points = points
    }
    draw() {}
}

class Arrow extends BaseShape {
    constructor(points: Point[], ctx: CanvasRenderingContext2D) {
        super(points, ctx)
    }
    setEndPoint(point: Point) {
        this.points[1] = point
    }
    draw() {
        const { ctx, points: [startPoint, endPoint] } = this;
        if(!endPoint) return 
        let  x1 = startPoint.getX(), y1 = startPoint.getY(), x2 = endPoint.getX(), y2 = endPoint.getY();
        let  el = 50, al = 15;
        let vertex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //计算箭头底边两个点（开始点，结束点，两边角度，箭头角度）
        vertex[0] = x1, vertex[1] = y1, vertex[6] = x2, vertex[7] = y2;
        //计算起点坐标与X轴之间的夹角角度值
        let  angle = Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180;
        let  x = x2 - x1, y = y2 - y1, length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (length < 250) {
            el /= 2, al / 2;
        } else if (length < 500) {
            el *= length / 500, al *= length / 500;
        }
        vertex[8] = x2 - el * Math.cos(Math.PI / 180 * (angle + al));
        vertex[9] = y2 - el * Math.sin(Math.PI / 180 * (angle + al));
        vertex[4] = x2 - el * Math.cos(Math.PI / 180 * (angle - al));
        vertex[5] = y2 - el * Math.sin(Math.PI / 180 * (angle - al));
        //获取另外两个顶点坐标
        x = (vertex[4] + vertex[8]) / 2, y = (vertex[5] + vertex[9]) / 2;
        vertex[2] = (vertex[4] + x) / 2;
        vertex[3] = (vertex[5] + y) / 2;
        vertex[10] = (vertex[8] + x) / 2;
        vertex[11] = (vertex[9] + y) / 2;
        //计算完成,开始绘制
        ctx.beginPath();
        ctx.moveTo(vertex[0], vertex[1]);
        ctx.lineTo(vertex[2], vertex[3]);
        ctx.lineTo(vertex[4], vertex[5]);
        ctx.lineTo(vertex[6], vertex[7]);
        ctx.lineTo(vertex[8], vertex[9]);
        ctx.lineTo(vertex[10], vertex[11]);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

class Pencil extends BaseShape {
    constructor(points: Point[], ctx: CanvasRenderingContext2D) {
        super(points, ctx)
    }
    addPoint(point: Point) {
        this.points.push(point)
    }
    draw() {
        const { ctx, points } = this;
        ctx.beginPath();
        points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.getX(), point.getY())
            } else {
                ctx.lineTo(point.getX(), point.getY())
            }
        })
        ctx.stroke()
        ctx.closePath();
    }
}
class Line extends BaseShape {
    constructor(points: Point[], ctx: CanvasRenderingContext2D) {
        super(points, ctx)
    }
    setEndPoint(point: Point) {
        this.points[1] = point
    }
    draw() {
        const { ctx, points: [startPoint, endPoint] } = this;
        if (!endPoint) return
        ctx.beginPath();
        const startX = startPoint.getX();
        const startY = startPoint.getY();
        const endX = endPoint.getX();
        const endY = endPoint.getY();
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
        ctx.closePath();
    }
}

/**椭圆*/
class Circle extends BaseShape {
    constructor(points: Point[], ctx: CanvasRenderingContext2D) {
        super(points, ctx)
    }
    draw() {
        const { ctx, points: [startPoint, endPoint] } = this;
        if (!endPoint) return
        ctx.beginPath();
        const startX = startPoint.getX();
        const startY = startPoint.getY();
        const endX = endPoint.getX();
        const endY = endPoint.getY();
        const r1 = Math.abs(startX - endX) / 2;
        const r2 = Math.abs(startY - endY) / 2;
        const r = Math.max(r1, r2)
        const pointX = startX + (endX - startX) / 2
        const pointY = startY + (endY - startY) / 2
        ctx.ellipse(pointX, pointY, r1, r2, Math.PI, 0, 2 * Math.PI);
        // ctx.arc(pointX, pointY, r, 0, Math.PI * 2); // 画一个圆心为 (150, 75)，半径为 50 的圆
        ctx.stroke()
        ctx.closePath();
    }
}

/**矩形*/
class Rect extends BaseShape {
    constructor(points: Point[], ctx: CanvasRenderingContext2D) {
        super(points, ctx)
    }
    setStart(point: Point) {
        this.points = [point];
    }
    draw() {
        const { ctx, points } = this;
        ctx.beginPath();
        points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.getX(), point.getY());
            } else {
                ctx.lineTo(point.getX(), point.getY());
            }
        })
        ctx.closePath();
        ctx.stroke();
    }
}

/**菱形*/
class Diamond extends BaseShape {
    constructor(points: Point[], ctx: CanvasRenderingContext2D) {
        super(points, ctx)
    }
    setStart(point: Point) {
        this.points = [point];
    }
    draw() {
        const { ctx, points } = this;
        ctx.beginPath();
        points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.getX(), point.getY());
            } else {
                ctx.lineTo(point.getX(), point.getY());
            }
        })
        ctx.closePath();
        ctx.stroke();
    }
}