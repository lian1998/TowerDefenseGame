class TdScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
    }
    // static new(game) {
    //     var i = new this(game)
    //     return i
    // }
    addElement(e) {
        e.scene = this
        this.elements.push(e)
    }
    removeElement(node) {
        this.elements = this.elements.filter(e => e != node)
    }
    draw() {
        for (const e of this.elements) {
            e.draw()
        }   
    }
    update() {
        if (this.debugModeEnabled) {
            for (let i = 0; i < this.elements.length; i++) {
                const e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i]
            e.update()
        }
    }

}
