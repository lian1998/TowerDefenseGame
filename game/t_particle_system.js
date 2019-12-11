class TdParticle extends TdImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {

    }
    init(x, y, vx, vy) {

    }
}

class TdParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.x = 150
        this.y = 200
        this.numberOfParticles = 20
        this.particles = []
    }
    update() {
        //添加火花
        //更新所有火花
        for (const p of this.particles) {
            p.update()
        }
    }
    draw() {
        for (const p of this.particles) {
            p.draw()
        }
    }
} 


