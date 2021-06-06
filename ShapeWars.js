import { Vec } from './Vec.js'
import { Shape } from './Shape.js'

var canvas = document.body.querySelector('#screen')
const ctx = canvas.getContext('2d')
console.log(ctx)
ctx.lineWidth = 10
ctx.strokeRect(75, 140, 150, 110)
const v = new Vec(0, 2)

console.log('hi', v)

const shape1 = [new Vec(100, 100), new Vec(100, 200), new Vec(200, 100)]
console.log(shape1)
const shape1A = new Shape(...shape1)
console.log(shape1A.points)
drawShape(shape1A.points)

function drawShape (shape) {
  const [start, ...rest] = shape
  ctx.beginPath()
  ctx.moveTo(...start)
  rest.forEach((next) => ctx.lineTo(...next))
  ctx.closePath()
  ctx.stroke()
}
