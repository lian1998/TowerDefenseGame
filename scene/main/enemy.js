class Enemy extends TdImage {
    constructor(game, name, tileSize) {
        name = name || 'enemy01'
        super(game, name)
        this.tileSize = tileSize
        this.setup()
    }
    setup() {
        this.map = null
        this.stepIndex = 0
        this.steps = []
        this.dead = false
        this.y = 200
        this.speed = 1.5
        this.maxHP = 8
        this.hp = this.maxHP
        this.destinationX = 900
        this.destination = [500, 200]
    }
    update() {
        if (this.dead) {
            return
        }
        // this.x += this.speed
        if (typeof this.stepIndex == 'undefined') {
            alert('无法放置')
            return
        } else {
            let [dx, dy] = this.steps[this.stepIndex]
            let signX = dx > this.x ? 1 : -1
            let signY = dy > this.y ? 1 : -1
            if (Math.abs(this.x - dx) <= 10) {
                signX = 0
            }
            if (Math.abs(this.y - dy) <= 10) {
                signY = 0
            }

            this.x += this.speed * signX
            this.y += this.speed * signY
            // console.log(this.speed * signX, this.speed * signY);
            if (Math.abs(this.x - dx) <= 10 && Math.abs(this.y - dy) <= 10) {
                console.log('到达');
                this.stepIndex++
            }

            //判断是否到达终点
            if (this.stepIndex == this.steps.length) {
                console.log('到达终点');
                this.die()
            }

        }
    }
    resetPath(path) {
        let steps = []
        let s = this.tileSize
        for (const p of path) {
            let c = [p.x * s, p.y * s]
            steps.push(c)
        }
        this.steps = steps
        this.stepIndex = 0
    }
    drawLifeBar () {
        let context = this.game.context
        //总血量
        context.fillStyle = 'red'
        let [x, y, w, h] = [this.x, this.y - 10, this.w, 10]
        context.fillRect(x, y, w, h)
        //当前剩余血量
        context.fillStyle = 'green'
        let w1 = w * (this.hp / this.maxHP)
        context.fillRect(x, y, w1, h)

    }
    draw() {
        super.draw()
        this.drawLifeBar()
    }
    attacked(ap) {
        //ap为攻击力
        this.hp -= ap
        if (this.hp <= 0) {
            this.die()
        }
    }
    die() {
        this.dead = true
        //从场景中移除元素        
        this.game.scene.removeElement(this)
        console.log('死亡');
    }
}