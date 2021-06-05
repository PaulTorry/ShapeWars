import Vec from '..HexGame/Vec.js'

var canvas = document.body.querySelector('#screen')
const ctx = canvas.getContext('2d')
console.log(ctx)
ctx.lineWidth = 10
ctx.strokeRect(75, 140, 150, 110)
const v = new Vec(0, 2)
ctx.beginPath()
ctx.moveTo(50, 140)
ctx.lineTo(150, 60)
ctx.lineTo(250, 140)
ctx.closePath()

ctx.stroke()

console.log('hi', v)
