const config = {
    player_speed: 10,
    cloud_speed: 5,
    enemy_speed: 5,
    bullet_speed: 5,
}

class Scene extends TdScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.debugPath = []
        //初始化地图
        this.map = new TDMap(this.game, 9, 5)
        this.enemies = []
        this.towers = []
        this.setupBG()
        this.setupGameElements()
        // this.setupTower()
        //tower ui
        this.setupHUD()

        //
        this.setupInputs()
    }
    setupBG() {
        let bg = new TdImage(this.game, 'bg')
        bg.w = 900
        bg.h = 600
        this.addElement(bg)
    }
    setupGameElements() {
        // let e1 = new Enemy(this.game, 'enemy01')
        // this.addElement(e1)
        // this.enemies.push(e1)
        // let e2 = new Enemy(this.game, 'enemy01')
        // e2.x -= 100
        // this.addElement(e2)
        // this.enemies.push(e2)

        let offset = [0, 30]
        for (let i = 0; i < 23; i++) {
            const e1 = new Enemy(this.game, 'enemy01', this.map.tileSize)
            e1.x -= i * 50
            e1.y += offset[i % 2]
            this.addElement(e1)
            this.enemies.push(e1)
            e1.map = this.map
        }
        this.findPathForEnemies()
    }
    addTower(x, y) {
        if(x == null || y == null) {
            return
        }
        let i = Math.round(x / 100)
        let j = Math.round(y / 100)
        //设置地图属性
        this.map.addTower(i, j)
        // x = Math.round(x / 100) * 100
        // y = Math.round(y / 100) * 100
        x = i * 100
        y = j * 100
        
        // if (y > 400) {
        //     y = 400
        // }
        let t1 = new Tower(this.game)
        t1.x = x
        t1.y = y
        this.addElement(t1)

        this.towers.push(t1)
        //
        this.findPathForEnemies()

    }
    findPathForEnemies() {
        for (const e of this.enemies) {
            let x = e.x
            let y = e.y
            let i = Math.round(x / 100)
            let j = Math.round(y / 100)
            let path = this.map.pathfinding(i, j)
            //设置敌人steps
            e.resetPath(path)
            //
            this.debugPath = path
            if (path.length == 0) {
                alert('无法在这里放置!')
                let length = this.towers.length
                let t = this.towers[length - 1]
                let x = t.x / 100
                let y = t.y / 100
                this.map.removeTower(x, y)
                this.removeElement(t)
                this.towers.pop()
                path = this.map.pathfinding(i, j)
                e.resetPath(path)
            }
        }
    }
    // setupTower() {
    //     this.addTower(100, 400)
    //     this.addTower(200, 400)
    // }
    setupHUD() {
        let gun = new TdImage(this.game, 'gun')
        gun.x = 800
        gun.y = 520
        this.gun = gun
        this.addElement(gun)
    }
    draw() {
        super.draw()
        let s = this.map.tileSize
        for (const p of this.debugPath) {
            let context = this.game.context
            context.fillStyle = 'rgba(200, 200, 200, 0.5)'
            let x = p.x * s
            let y = p.y * s
            context.fillRect(x, y, s, s)
        }
    }
    //输入指令
    setupInputs() {
        //mouse inputs
        let startDrag = false
        let that = this
        this.game.registerMouse(function(event, status) {
            let x = event.offsetX
            let y = event.offsetY
            if (status == 'down') {
                let clickIn = that.gun.pointInFrame(x, y)
                if (clickIn) {
                    startDrag = true
                    // that.tower = that.gun.crateTower()
                    that.tower_gun_0 = new TdImage(that.game, 'tower_gun_0')
                    that.tower_gun_0.x = that.gun.x
                    that.tower_gun_0.y = that.gun.y
                    that.addElement(that.tower_gun_0)         
                }
            } else if (status == 'move' && startDrag) {
                //设置偏移的 x 和 y
                that.tower_gun_0.x = x - that.tower_gun_0.w / 2
                that.tower_gun_0.y = y - that.tower_gun_0.h / 2
            } else {
                let tx = null
                let ty = null
                if (startDrag == true) {
                    tx = that.tower_gun_0.x
                    ty = that.tower_gun_0.y           
                }
                startDrag = false
                //

                that.removeElement(that.tower_gun_0)
                that.addTower(tx, ty)     
            }

        })

        //keyboard inputs
    }

    //在g.update中自动调用
    update() {
        super.update()
        //为没有target的tower寻找目标
        for (const t of this.towers) {
            if (t.target === null) {
                t.findTarget(this.enemies)
            }
        }
    }

}