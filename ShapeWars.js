/* global requestAnimationFrame */
import { Vec } from './Vec.js'
import { Shape } from './Shape.js'

const active = 0
const shapes = [
  new Shape(new Vec(100, 500), ...[new Vec(-50, -20), new Vec(50, -20), new Vec(0, 50)]),
  new Shape(new Vec(200, 200), ...[new Vec(100, 100), new Vec(-100, 100), new Vec(100, -100)])
]
document.addEventListener('keypress', keyHandle)
document.addEventListener('click', onClick)
requestAnimationFrame(animateIt)
drawScreen()

function update (dt) {
  shapes.forEach((s) => s.update(dt))

  drawScreen()
}

function drawScreen () {
  var canvas = document.body.querySelector('#screen')
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 5000, 5000)
  // console.log(ctx)
  ctx.lineWidth = 5
  shapes.forEach(s => drawShape(s, ctx))
}

function drawShape (shape, ctx) {
  const [start, ...rest] = shape.getPoints()
  ctx.lineWidth = 3
  ctx.strokeStyle = 'black'
  if (shape.colliding) ctx.strokeStyle = 'red'
  ctx.beginPath()
  ctx.moveTo(...start)
  rest.forEach((next) => ctx.lineTo(...next))
  ctx.closePath()
  ctx.stroke()
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(...shape.location)
  ctx.lineTo(...shape.location.add(shape.velocity.scale(2)))
  ctx.closePath()
  ctx.stroke()
}

function keyHandle (e) {
  console.log(e)
  const activeShape = shapes[active]
  console.log(activeShape)
  if (e.key === 'a') { activeShape.thrust(Vec.unitX) }
  if (e.key === 'd') { activeShape.thrust(Vec.unitX.scale(-1)) }
  if (e.key === 'w') { activeShape.thrust(Vec.unitY) }
  if (e.key === 's') { activeShape.thrust(Vec.unitY.scale(-1)) }
  if (e.key === 'q') { activeShape.rotate(0.02) }
  if (e.key === 'e') { activeShape.rotate(-0.02) }
  if (e.key === ' ') { activeShape.isPointInside(Vec.zero.addXY(100, 100)) }
  activeShape.update()
  console.log(activeShape)
  update()
  drawScreen()
}

function onClick(e) {
  console.log(e, e.offsetX, e.offsetY)
  console.log(  shapes[active].isPointInside(Vec.zero.addXY(e.offsetX, e.offsetY)))
}

function animateIt (time, lastTime) {
  if (lastTime != null) {
    update(time - lastTime)
  }
  requestAnimationFrame(newTime => animateIt(newTime, time))
}
