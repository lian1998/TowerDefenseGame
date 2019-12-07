class TdScene {
  constructor(game) {
    this.game = game
    this.elements = []
  }
  // static new(game) {
  //     var i = new this(game)
  //     return i
  // }
  addElement(e) {
    this.elements.push(e)
  }
  draw() {
    for (let i = 0; i < this.elements.length; i++) {
      const e = this.elements[i]
      this.game.drawImage(e)
    }
  }
  update() {
    for (let i = 0; i < this.elements.length; i++) {
      const e = this.elements[i]
      e.update()
    }
  }
}
