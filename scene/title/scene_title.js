class TdLable {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    draw() {
        // draw labels
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {

    }
}

class SceneTitle extends TdScene {
    constructor(game) {
        super(game)
        var label = new TdLable(game, 'hello')
        this.addElement(label)
        game.registerAction('k', function () {
            var s = new Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)
    }
}
