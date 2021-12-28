import { Vec } from './Vec.js'

class Shape {
  constructor (location, ...points) {
    this.points = points
    this.location = location
    this.turnSpeed = 5
    this.speed = 5
    this.velocity = Vec.zero
    this.facing = Math.PI
    this.colliding = false
  }

  toLocalFrame (a) { return this.location.add(a.rotate(this.facing)) }
  toScreenCoord (a) { return a.rotate(-this.facing).subtract(this.location) }

  applyImpulse (vec) { this.velocity = this.velocity.add(vec) }
  thrust (motion) { this.velocity = this.velocity.add(motion.rotate(this.facing).scale(this.speed)) }
  rotate (angle) { this.facing = this.facing + angle * this.turnSpeed }

  getPoints () {
    return this.points.map(a => this.toLocalFrame(a))
    // return this.points.map(a => this.location.add(a.rotate(this.facing)))
  }

  update (timestep = 0.1) {
    this.location = this.location.add(this.velocity.scale(timestep * 0.001))
  }

  isPointInside (absPt) {
    const pt = this.toLocalFrame(absPt)
    return this.points.reduce((p, v, i, a) => {
      const pt1 = a[(i + 1) % a.length]
      const pt0 = a[i]
      const line1 = pt1.subtract(pt0)
      const line2 = pt.subtract(pt0)
      const cross = line1.cross(line2)
      console.log(pt1, pt0, pt) //, line2, line1, cross)
      return p.concat(cross)
    }, [])
  }
}

export { Shape }
