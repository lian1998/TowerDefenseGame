class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    distance(vector) {
        let dx = vector.x - this.x
        let dy = vector.y - this.y
        return Math.sqrt(dx * dx + dy * dy)
    }
    sub(vector) {
        let dx = this.x - vector.x
        let dy = this.y - vector.y
        return new Vector(dx, dy)
    }
}