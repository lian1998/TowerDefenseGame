class Tower extends TdImage {
    constructor(game, name) {
        name = name || ti
        super(game, name)
        this.setup()
    }
    setup() {
        this.y = 200
        this.speed = 1
        this.hp = 3
        this.destinationX = 500
    }
    update() {
        this.x += this.speed
        if (this.x > this.destinationX) {
            console.log('到达');
        }
    }
}