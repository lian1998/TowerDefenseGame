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
        this.enemies = []
        this.towers = []
        this.setupBG()
        this.setupGameElements()
        this.setupTower()
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
        // let e2 = new Enemy(this.game, 'enemy01')
        // e2.x -= 100
        // this.addElement(e2)

        // this.enemies.push(e1)
        // this.enemies.push(e2)
        for (let i = 0; i < 23; i++) {
            let offset = [0, 30]
            const e1 = new Enemy(this.game, 'enemy01')
            e1.x -= i * 50
            e1.y += offset[i % 2]
            this.addElement(e1)
            this.enemies.push(e1)
        }
    }
    addTower(x, y) {
        if(x == null || y == null) {
            return
        }
        x = Math.floor(x / 100) * 100
        y = Math.floor(y / 100) * 100
        let t1 = new Tower(this.game)
        t1.x = x
        t1.y = y
        this.addElement(t1)

        this.towers.push(t1)
    }
    setupTower() {
        this.addTower(100, 401)
        this.addTower(200, 200)
    }
    setupHUD() {
        let gun = new TdImage(this.game, 'gun')
        gun.x = 800
        gun.y = 520
        this.gun = gun
        this.addElement(gun)
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
                    that.tower_gun_0.w = 50
                    that.tower_gun_0.h = 50
                    that.tower_gun_0.x = that.gun.x
                    that.tower_gun_0.y = that.gun.y
                    that.addElement(that.tower_gun_0)         
                }
            } else if (status == 'move' && startDrag) {
                //设置偏移的 x 和 y
                that.tower_gun_0.x = x - that.tower_gun_0.w 
                that.tower_gun_0.y = y - that.tower_gun_0.h 
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