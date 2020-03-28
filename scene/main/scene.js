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
        this.setupBG()
        this.setupGamElements()
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
    setupGamElements() {
        let e1 = new Enemy(this.game, 'enemy01')
        this.addElement(e1)
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
                    that.tower_gun_0.x = x
                    that.tower_gun_0.y = y
                    that.addElement(that.tower_gun_0)
                }
            } else if (status == 'move' && startDrag) {
                that.tower_gun_0.x = x
                that.tower_gun_0.y = y
            } else {
                startDrag = false
                //
                that.removeElement(that.tower_gun_0)
            }

        })

        //keyboard inputs
    }

    //在g.update中自动调用
    update() {
        super.update()
    }
}