class Enemy extends TdImage {
    constructor(game, name) {
        name = name || 'enemy01'
        super(game, name)
        this.setup()
    }
    setup() {
        // this.stepIndex = 0
        // this.steps = [
        //     [0, 170]
        //     [0, 0]
        //     [300, 0]
        //     [300, 170]
        //     [600, 170]
        // ]
        this.dead = false
        this.y = 300
        this.speed = 3
        this.maxHP = 8
        this.hp = this.maxHP
        this.destinationX = 900
        this.destination = [500, 200]
    }
    update() {
        if (this.dead) {
            return
        }
        this.x += this.speed
        if (this.x > this.destinationX) {
            console.log('到达');
        }
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