import { time } from 'console'

interface ballInfo {
    x?: number
    y?: number
    radius?: number
    canvas: any
}
/**
 *
 * @param min number
 * @param max number
 * @returns  获取 min 到 max 之间的整数
 */

export function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}

class Ball {
    private x: number //横坐标
    private y: number // 纵坐标
    private size: number // 半径
    private canvas: HTMLCanvasElement // canvas 元素
    private ctx: any
    private timer: any
    constructor(options: ballInfo) {
        const { canvas } = options
        const r = Math.min(canvas.width - 10, canvas.height - 10) / 2
        const cx = canvas.width / 2
        const cy = canvas.height / 2
        const rad = (getRandom(0, 360) * Math.PI) / 180
        this.x = cx + r * Math.cos(rad)
        this.y = cy + r * Math.sin(rad)
        this.size = getRandom(2, 5)
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
    }
    draw() {
        const color = document.documentElement.style.getPropertyValue('--theme-color') || '#fb923c'
        const { ctx, x, y, size } = this
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.arc(x, y, size, 0, 2 * Math.PI)
        ctx.fill()
    }
    moveTo(x: number, y: number) {
        const duration = 1000
        const cx = x - this.x
        const cy = y - this.y
        const xSpeed = cx / duration
        const ySpeed = cy / duration
        const currentDate = new Date().getTime()
        const _move = () => {
            const cutTime = new Date().getTime() - currentDate
            if (cutTime >= 500) {
                this.x = x
                this.y = y
                return
            }
            this.x += cutTime * xSpeed
            this.y += cutTime * ySpeed
            this.timer = requestAnimationFrame(_move)
        }
        _move()
    }
    clear() {
        this.timer && cancelAnimationFrame(this.timer)
    }
}

export default Ball
