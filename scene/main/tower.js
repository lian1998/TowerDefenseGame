class Tower extends TdImage {
    constructor(game, name) {
        name = name || 'tower_gun_0'
        super(game, name)
        this.setup()
    }
    setup() {
        this.rotation = 0
        this.attack = 1
        this.range = 100
        this.target = null
        this._cooldown = 5
        this._fireCount = 0
    }
    draw() {
        //画攻击范围
        let context = this.game.context
        let v = this.center()
        context.fillStyle = 'rgba(200, 200, 200, 0.5)'
        context.beginPath()
        context.arc(v.x, v.y, this.range, 0, Math.PI * 2)
        context.fill()
        super.draw()

    }
    fire(target) {
        //检查是否冷却
        if (this._fireCount != 0) {
            this._fireCount--
        } else {
            this._fireCount = this._cooldown
            this.target.attacked(this.attack)
        }

    }
    update() {
        //敌人走出范围，要设置target为null
        this.updateRotation(this.target)
        if (this.canAttack(this.target)) {
            this.fire(this.target)
        }
    }
    updateRotation(target) {
        if (target !== null) {
            let v = target.center().sub(this.center())
            let r = atan(v.x, -v.y)
            this.rotation = r
        } else {
            this.rotation = 0
        }
    }
    canAttack(enemy) {
        //检查enemy是否为空
        if (enemy == null) {
            return
        }

        let inRange = this.center().distance(enemy.center()) < this.range
        //检查敌人是否死亡，如果是，取消目标
        let enemyExist = enemy !== null && !enemy.dead
        let can = enemyExist && inRange
        if (!can) {
            this.target = null
        }
        return can
    }
    findTarget(enemies) {
        for (const e of enemies) {
            if (this.canAttack(e)) {
                this.target = e
                break
            }
        }
    }
}