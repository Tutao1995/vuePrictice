import { fa } from "element-plus/es/locale"

type currentType = 'circle' | 'rect' | 'line' | 'pencil' | 'diamond' | 'arrow' | 'handle'
type OptionType = {
  container: HTMLElement
  type: currentType
  mouseEventOver: Function
}

export default class Board {
  container: HTMLElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  currentType: currentType
  pathSegmentHistory: ImageData[]
  index: number
  shapes: any[] = []
  drawing: boolean = false
  startPoint: Point = new Point(0, 0)
  mouseEventOver: Function = () => { }
  draggingShape: BaseShape | null = null  // 添加新属性跟踪正在拖拽的图形
  contextMenuShape: BaseShape | null = null  // 添加属性跟踪右键点击的图形
  constructor(option: OptionType) {
    const { container, type, mouseEventOver } = option
    this.container = container
    this.canvas = this.createCanvas(container)
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.currentType = type
    this.mouseEventOver = mouseEventOver
    this.pathSegmentHistory = []
    this.index = 0
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
    this.render()
    this.bindEvent()
  }

  render() {
    this.addPathSegment()
    this.setContext2DStyle()
    this.draw()
  }
  bindEvent() {
    this.canvas.addEventListener('contextmenu', this.handleContextMenu.bind(this))
    this.canvas.addEventListener('mousedown', this.mousedownEvent.bind(this))
    this.canvas.addEventListener('mousemove', this.mousemoveEvent.bind(this))
    window.document.addEventListener('keydown', this.keydownEvent.bind(this))
    // 添加点击事件监听，用于关闭右键菜单
    window.addEventListener('click', this.handleClick.bind(this))
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
  isInShape(point: Point) {
    return this.shapes.find(shape => shape.isInside?.(point))
  }
  // 鼠标事件
  mousedownEvent(e: MouseEvent) {
    if (this.currentType === 'handle') {
      // 拖拽的图标
      this.canvas.style.cursor = 'pointer'
      this.handle(e)
      return
    }
    const that = this
    const ctx = this.ctx
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
      arrow: Arrow,
      handle: Handle,
    }
    this.drawing = true
    this.startPoint = new Point(startX, startY)
    let shape = new shapeConstructorMap[this.currentType]([this.startPoint], ctx)
    this.shapes.push(shape)
    this[this.currentType](e)
    this.canvas.onmouseup = this.canvas.onmouseout = function () {
      that.addPathSegment()
      that.drawing = false
      this.onmousemove = null
      this.onmouseup = null
      this.onmouseout = null
      that.canvas.style.cursor = 'default'
      that.mouseEventOver && that.mouseEventOver()
    }
  }
  handle(e: MouseEvent) {
    const that = this
    const startX = e.offsetX
    const startY = e.offsetY
    const mousePoint = new Point(startX, startY)
    
    // 使用与 mousemoveEvent 相同的逻辑查找图形
    let selectedShape = null
    let selectedIndex = -1
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.isInside?.(mousePoint)) {
        selectedShape = shape
        selectedIndex = i
        break
      }
    }

    if (!selectedShape) return

    // 设置当前拖拽的图形
    this.draggingShape = selectedShape
    selectedShape.isHovered = true

    // 保存图形所有点的初始位置
    const initialPoints = selectedShape.points.map(p => new Point(p.getX(), p.getY()))

    this.canvas.onmousemove = function (e) {
      // 计算鼠标移动的距离
      const deltaX = e.offsetX - startX
      const deltaY = e.offsetY - startY

      // 更新图形的所有点的位置
      selectedShape.points = initialPoints.map(p => {
        return new Point(
          p.getX() + deltaX,
          p.getY() + deltaY
        )
      })
    }

    // 清理事件监听
    this.canvas.onmouseup = this.canvas.onmouseout = function () {
      // 将拖拽的图形移动到数组末尾（最上层）
      if (selectedIndex !== -1) {
        that.shapes.splice(selectedIndex, 1)  // 从原位置删除
        that.shapes.push(selectedShape)       // 添加到末尾
      }
      
      that.draggingShape = null  // 清除拖拽状态
      that.canvas.onmousemove = null
      that.canvas.onmouseup = null
      that.canvas.onmouseout = null
    }
  }
  circle(e: MouseEvent) {
    const that = this
    const startX = e.offsetX
    const startY = e.offsetY
    let shape = this.shapes[this.shapes.length - 1]
    this.canvas.onmousemove = function (e) {
      if (that.drawing) {
        const startPoint = new Point(startX, startY)
        const endPoint = new Point(e.offsetX, e.offsetY)
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
        const endX = e.offsetX
        const endY = e.offsetY
        const minX = Math.min(startX, endX)
        const minY = Math.min(startY, endY)
        const maxX = Math.max(startX, endX)
        const maxY = Math.max(startY, endY)
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
        const endX = e.offsetX
        const endY = e.offsetY
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
        const endX = e.offsetX
        const endY = e.offsetY
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
  mousemoveEvent(e: MouseEvent) {
    if (this.currentType !== 'handle' || this.drawing) return

    const mousePoint = new Point(e.offsetX, e.offsetY)
    
    // 如果有正在拖拽的图形，只显示该图形的虚线框
    if (this.draggingShape) {
      this.shapes.forEach(shape => {
        shape.isHovered = (shape === this.draggingShape)
      })
      return
    }

    // 否则正常处理悬停状态
    let foundHoveredShape = false
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (!foundHoveredShape && shape.isInside?.(mousePoint)) {
        shape.isHovered = true
        foundHoveredShape = true
      } else {
        shape.isHovered = false
      }
    }
  }
  draw() {
    requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.shapes.forEach((shape) => {
        shape.draw()
        if (this.currentType === 'handle') {
          shape.drawHoverBorder()
        }
      })
      this.draw()
    })
  }
  // 处理右键菜单
  handleContextMenu(e: MouseEvent) {
    e.preventDefault()
    
    // 如果不是handle模式，不显示右键菜单
    // if (this.currentType !== 'handle') return

    const mousePoint = new Point(e.offsetX, e.offsetY)
    // 移除已存在的菜单
    this.removeContextMenu()
    // 查找点击的图形
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape.isInside?.(mousePoint)) {
        this.contextMenuShape = shape
        this.showContextMenu(e.clientX, e.clientY)
        break
      }
    }
  }

  // 显示右键菜单
  showContextMenu(x: number, y: number) {


    const menu = document.createElement('div')
    menu.id = 'shape-context-menu'
    menu.style.position = 'fixed'
    menu.style.left = `${x}px`
    menu.style.top = `${y}px`
    menu.style.backgroundColor = 'white'
    menu.style.border = '1px solid #ccc'
    menu.style.padding = '5px 0'
    menu.style.borderRadius = '4px'
    menu.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)'
    menu.style.zIndex = '1000'

    const deleteOption = document.createElement('div')
    deleteOption.textContent = '删除'
    deleteOption.style.padding = '5px 15px'
    deleteOption.style.cursor = 'pointer'
    deleteOption.style.backgroundColor = '#f5f5f5'
    
    deleteOption.addEventListener('click', () => {
      this.deleteShape(this.contextMenuShape)
      this.removeContextMenu()
    })

    deleteOption.addEventListener('mouseover', () => {
      deleteOption.style.backgroundColor = '#f5f5f5'
    })

    deleteOption.addEventListener('mouseout', () => {
      deleteOption.style.backgroundColor = 'white'
    })

    menu.appendChild(deleteOption)
    document.body.appendChild(menu)
  }

  // 删除图形
  deleteShape(shape: BaseShape | null) {
    debugger
    if (!shape) return
    const index = this.shapes.indexOf(shape)
    if (index > -1) {
      this.shapes.splice(index, 1)
    }
  }

  // 移除右键菜单
  removeContextMenu() {
    const existingMenu = document.getElementById('shape-context-menu')
    if (existingMenu) {
      existingMenu.remove()
    }
    this.contextMenuShape = null
  }

  // 处理点击事件，关闭右键菜单
  handleClick(e: MouseEvent) {
    const menu = document.getElementById('shape-context-menu')
    if (menu && !menu.contains(e.target as Node)) {
      this.removeContextMenu()
    }
  }
}

type PointType = { x: number; y: number }

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
  ctx: CanvasRenderingContext2D
  isHovered: boolean = false

  constructor(points: Point[], ctx: CanvasRenderingContext2D) {
    this.points = points
    this.ctx = ctx
  }
  setPoints(points: Point[]) {
    this.points = points
  }
  draw() { }
  drawHoverBorder() {
    if (this.isHovered) {
      const bounds = this.getBounds()
      const padding = 8  // 增加边距到 8 像素
      this.ctx.save()
      this.ctx.strokeStyle = '#666'
      this.ctx.setLineDash([5, 5])
      this.ctx.strokeRect(
        bounds.minX - padding,
        bounds.minY - padding,
        bounds.maxX - bounds.minX + padding * 2,
        bounds.maxY - bounds.minY + padding * 2
      )
      this.ctx.restore()
    }
  }
  getBounds() {
    const xCoords = this.points.map(p => p.getX())
    const yCoords = this.points.map(p => p.getY())
    return {
      minX: Math.min(...xCoords),
      maxX: Math.max(...xCoords),
      minY: Math.min(...yCoords),
      maxY: Math.max(...yCoords)
    }
  }
}

class Handle { }
class Arrow extends BaseShape {
  constructor(points: Point[], ctx: CanvasRenderingContext2D) {
    super(points, ctx)
  }
  setEndPoint(point: Point) {
    this.points[1] = point
  }
  isInside(point: Point) {
    const [startPoint, endPoint] = this.points
    const { x, y } = point
    const { x: startX, y: startY } = startPoint
    const { x: endX, y: endY } = endPoint

    // 如果是垂直线
    if (startX === endX) {
      const minY = Math.min(startY, endY)
      const maxY = Math.max(startY, endY)
      return x === startX && y >= minY && y <= maxY
    }

    // 如果是水平线
    if (startY === endY) {
      const minX = Math.min(startX, endX)
      const maxX = Math.max(startX, endX)
      return y === startY && x >= minX && x <= maxX
    }

    // 计算点到线段的距离
    const A = endY - startY
    const B = startX - endX
    const C = endX * startY - startX * endY

    // 点到直线的距离
    const distance = Math.abs(A * x + B * y + C) / Math.sqrt(A * A + B * B)

    // 检查点是否在线段的范围内
    const minX = Math.min(startX, endX)
    const maxX = Math.max(startX, endX)
    const minY = Math.min(startY, endY)
    const maxY = Math.max(startY, endY)

    // 如果点到线段的距离小于阈值（比如5像素）且在线段的范围内，则认为点在线段上
    return distance < 5 && x >= minX && x <= maxX && y >= minY && y <= maxY
  }
  draw() {
    const {
      ctx,
      points: [startPoint, endPoint],
    } = this
    if (!endPoint) return
    let x1 = startPoint.getX(),
      y1 = startPoint.getY(),
      x2 = endPoint.getX(),
      y2 = endPoint.getY()
    let el = 50,
      al = 15
    let vertex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      //计算箭头底边两个点（开始点，结束点，两边角度，箭头角度）
      ; (vertex[0] = x1), (vertex[1] = y1), (vertex[6] = x2), (vertex[7] = y2)
    //计算起点坐标与X轴之间的夹角角度值
    let angle = (Math.atan2(y2 - y1, x2 - x1) / Math.PI) * 180
    let x = x2 - x1,
      y = y2 - y1,
      length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    if (length < 250) {
      ; (el /= 2), al / 2
    } else if (length < 500) {
      ; (el *= length / 500), (al *= length / 500)
    }
    vertex[8] = x2 - el * Math.cos((Math.PI / 180) * (angle + al))
    vertex[9] = y2 - el * Math.sin((Math.PI / 180) * (angle + al))
    vertex[4] = x2 - el * Math.cos((Math.PI / 180) * (angle - al))
    vertex[5] = y2 - el * Math.sin((Math.PI / 180) * (angle - al))
      //获取另外两个顶点坐标
      ; (x = (vertex[4] + vertex[8]) / 2), (y = (vertex[5] + vertex[9]) / 2)
    vertex[2] = (vertex[4] + x) / 2
    vertex[3] = (vertex[5] + y) / 2
    vertex[10] = (vertex[8] + x) / 2
    vertex[11] = (vertex[9] + y) / 2
    //计算完成,开始绘制
    ctx.beginPath()
    ctx.moveTo(vertex[0], vertex[1])
    ctx.lineTo(vertex[2], vertex[3])
    ctx.lineTo(vertex[4], vertex[5])
    ctx.lineTo(vertex[6], vertex[7])
    ctx.lineTo(vertex[8], vertex[9])
    ctx.lineTo(vertex[10], vertex[11])
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }
}

class Pencil extends BaseShape {
  constructor(points: Point[], ctx: CanvasRenderingContext2D) {
    super(points, ctx)
  }
  addPoint(point: Point) {
    this.points.push(point)
  }
  isInside(point: Point) {
    const { x, y } = point
    debugger
    return this.points.some((p) => p.getX() === x && p.getY() === y)
  }
  draw() {
    const { ctx, points } = this
    ctx.beginPath()
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.getX(), point.getY())
      } else {
        ctx.lineTo(point.getX(), point.getY())
      }
    })
    ctx.stroke()
    ctx.closePath()
  }
}
class Line extends BaseShape {
  constructor(points: Point[], ctx: CanvasRenderingContext2D) {
    super(points, ctx)
  }
  setEndPoint(point: Point) {
    this.points[1] = point
  }
  isInside(point: Point) {
    const [startPoint, endPoint] = this.points
    const { x, y } = point
    const { x: startX, y: startY } = startPoint
    const { x: endX, y: endY } = endPoint
    if (x === startX && x === endX) {
      return true
    }
    if (y === startY && y === endY) {
      return true
    }
    // 判断一个点在一条直线上
    const k = (startY - endY) / (startX - endX) // 斜率
    const b = startY - k * startX // 截距
    return Math.abs(k * x + b - y) < 3
  }
  draw() {
    const {
      ctx,
      points: [startPoint, endPoint],
    } = this
    if (!endPoint) return
    ctx.beginPath()
    const startX = startPoint.getX()
    const startY = startPoint.getY()
    const endX = endPoint.getX()
    const endY = endPoint.getY()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.closePath()
  }
}

type ellipsePositionInfo = {
  centerX: number
  centerY: number
  r1: number
  r2: number
}

/**椭圆*/
class Circle extends BaseShape {
  positionInfo!: ellipsePositionInfo
  constructor(points: Point[], ctx: CanvasRenderingContext2D) {
    super(points, ctx)
  }
  isInside(point: Point) {
    if(!this.positionInfo) return false
    const { centerX, centerY, r1, r2 } = this.positionInfo
    const { x, y } = point
    return (
      Math.pow(x - centerX, 2) / Math.pow(r1, 2) +
      Math.pow(y - centerY, 2) / Math.pow(r2, 2) <=
      1
    )
  }
  setPositionInfo(info: ellipsePositionInfo) {
    this.positionInfo = info
  }
  draw() {
    const {
      ctx,
      points: [startPoint, endPoint],
    } = this
    if (!endPoint) return
    ctx.beginPath()
    const startX = startPoint.getX()
    const startY = startPoint.getY()
    const endX = endPoint.getX()
    const endY = endPoint.getY()
    const r1 = Math.abs(startX - endX) / 2
    const r2 = Math.abs(startY - endY) / 2
    const r = Math.max(r1, r2)
    const pointX = startX + (endX - startX) / 2
    const pointY = startY + (endY - startY) / 2
    ctx.ellipse(pointX, pointY, r1, r2, Math.PI, 0, 2 * Math.PI)
    this.setPositionInfo({
      centerX: pointX,
      centerY: pointY,
      r1: r1,
      r2: r2,
    })
    // ctx.arc(pointX, pointY, r, 0, Math.PI * 2); // 画一个圆心为 (150, 75)，半径为 50 的圆
    ctx.stroke()
    ctx.closePath()
  }
}

/**矩形*/
class Rect extends BaseShape {
  constructor(points: Point[], ctx: CanvasRenderingContext2D) {
    super(points, ctx)
  }
  setStart(point: Point) {
    this.points = [point]
  }
  isInside(point: Point) {
    const { x, y } = point
    const { x: leftTopX, y: leftTopY } = this.points[0]
    const { x: rightBottomX, y: rightBottomY } = this.points[2]
    return x >= leftTopX && x <= rightBottomX && y <= leftTopY && y >= rightBottomY
  }
  draw() {
    const { ctx, points } = this
    ctx.beginPath()
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.getX(), point.getY())
      } else {
        ctx.lineTo(point.getX(), point.getY())
      }
    })
    ctx.closePath()
    ctx.stroke()
  }
}

/**菱形*/
class Diamond extends BaseShape {
  constructor(points: Point[], ctx: CanvasRenderingContext2D) {
    super(points, ctx)
  }
  setStart(point: Point) {
    this.points = [point]
  }
  isInside(point: Point) {
    const { points } = this
    if (points.length !== 4) return false

    // 计算点是否在多边形内部
    let inside = false
    let j = points.length - 1

    for (let i = 0; i < points.length; i++) {
      const xi = points[i].getX()
      const yi = points[i].getY()
      const xj = points[j].getX()
      const yj = points[j].getY()

      // 射线法判断点是否在多边形内部
      const intersect = ((yi > point.y) !== (yj > point.y))
        && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi)

      if (intersect) {
        inside = !inside
      }

      // 检查点是否在边界线上（允许一定误差）
      const distance = this.pointToLineDistance(
        point,
        points[i],
        points[j]
      )
      if (distance < 5) {  // 5像素的误差范围
        return true
      }

      j = i
    }

    return inside
  }
  // 辅助方法：计算点到线段的距离
  private pointToLineDistance(point: Point, lineStart: Point, lineEnd: Point) {
    const A = lineEnd.getY() - lineStart.getY()
    const B = lineStart.getX() - lineEnd.getX()
    const C = lineEnd.getX() * lineStart.getY() - lineStart.getX() * lineEnd.getY()

    const distance = Math.abs(A * point.x + B * point.y + C) /
      Math.sqrt(A * A + B * B)

    // 确保点在线段范围内
    const minX = Math.min(lineStart.getX(), lineEnd.getX())
    const maxX = Math.max(lineStart.getX(), lineEnd.getX())
    const minY = Math.min(lineStart.getY(), lineEnd.getY())
    const maxY = Math.max(lineStart.getY(), lineEnd.getY())

    if (point.x >= minX && point.x <= maxX &&
      point.y >= minY && point.y <= maxY) {
      return distance
    }

    return Number.MAX_VALUE
  }

  draw() {
    const { ctx, points } = this
    ctx.beginPath()
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.getX(), point.getY())
      } else {
        ctx.lineTo(point.getX(), point.getY())
      }
    })
    ctx.closePath()
    ctx.stroke()
  }
}
