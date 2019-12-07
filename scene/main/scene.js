class Player extends TdImage{
  constructor(game) {
    super(game, 'player')
    this.setup()
  }
  setup() {
    this.speed = 10
  }
  update() {

  }
  moveLeft() {
    this.x -= this.speed
  }
  moveRight() {
    this.x += this.speed
  }
  moveUp() {
    this.y -= this.speed
  }
  moveDown() {
    this.y += this.speed
  }
}

function randomBetween (start, end) {
  let n = Math.random() * (end - start + 1)
  return Math.floor(n + start)
}

class Enemy extends TdImage{
  constructor(game) {
    let type = randomBetween(0, 4)
    let name = 'enemy' + type
    super(game, name)
    this.setup()
  }
  setup() {
    this.speed = randomBetween(2, 5)
    this.x = randomBetween(0, 350)
    this.y = -randomBetween(0, 200)
  }
  update() {
    this.y += this.speed
    if (this.y > 600) {
      this.setup()
    }
  }
}

class Scene extends TdScene {
  constructor(game) {
    super(game)
    this.setup()
    this.setupInputs()
  }
  setup() {
    this.numberOfElemies = 10
    this.bg = new TdImage(this.game, 'sky')
    this.cloud = new TdImage(this.game, 'cloud')
    // this.player = new TdImage(this.game, 'player')
    this.player = new Player(this.game)
    this.player.x = 100
    this.player.y = 150
    // this.game.registerAction('f', function () {
    //   ball.fire()
    // })

    // game.registerAction('k', function () {
    //   var s = Scene(game)
    //   game.replaceScene(s)
    // })
    this.addElement(this.bg)
    this.addElement(this.player)
    this.addElement(this.cloud)
    this.addElemies()
  }
  addElemies() {
    let es = []
    for (let i = 0; i < this.numberOfElemies; i++) {
      const e = new Enemy(this.game)
      es.push(e)
      this.addElement(e)
    }
    this.elemies = es
  }
  //输入指令
  setupInputs() {
    // let g = this.game
    let that = this
    that.game.registerAction('a', function () {
      that.player.moveLeft()
    })
    that.game.registerAction('d', function () {
      that.player.moveRight()
    })
    that.game.registerAction('w', function () {
      that.player.moveUp()
    })
    that.game.registerAction('s', function () {
      that.player.moveDown()
    })
  }
  update() {
    super.update()
    this.cloud.y += 1
  }
}



// var Scene = function (game) {
//   var s = {
//     game: game,
//   }
//   // 初始化
//   var paddle = Paddle(game)
//   var ball = Ball(game)

//   var score = 0

//   var blocks = loadLevel(game, 1)

//   game.registerAction('a', function () {
//     paddle.moveLeft()
//   })
//   game.registerAction('d', function () {
//     paddle.moveRight()
//   })
//   game.registerAction('f', function () {
//     ball.fire()
//   })

//   s.draw = function () {
//     // draw 背景
//     game.context.fillStyle = "#554"
//     game.context.fillRect(0, 0, 400, 300)
//     // draw
//     game.drawImage(paddle)
//     game.drawImage(ball)
//     // draw blocks
//     for (var i = 0; i < blocks.length; i++) {
//       var block = blocks[i]
//       if (block.alive) {
//         game.drawImage(block)
//       }
//     }
//     // draw labels
//     game.context.fillText('分数: ' + score, 10, 290)
//   }
//   s.update = function () {
//     if (window.paused) {
//       return
//     }

//     ball.move()
//     // 判断游戏结束
//     if (ball.y > paddle.y) {
//       // 跳转到 游戏结束 的场景
//       var end = new SceneEnd(game)
//       game.replaceScene(end)
//     }
//     // 判断相撞
//     if (paddle.collide(ball)) {
//       // 这里应该调用一个 ball.反弹() 来实现
//       ball.反弹()
//     }
//     // 判断 ball 和 blocks 相撞
//     for (var i = 0; i < blocks.length; i++) {
//       var block = blocks[i]
//       if (block.collide(ball)) {
//         // log('block 相撞')
//         block.kill()
//         ball.反弹()
//         // 更新分数
//         score += 100
//       }
//     }
//   }

//   // mouse event
//   var enableDrag = false
//   game.canvas.addEventListener('mousedown', function (event) {
//     var x = event.offsetX
//     var y = event.offsetY
//     log(x, y, event)
//     // 检查是否点中了 ball
//     if (ball.hasPoint(x, y)) {
//       // 设置拖拽状态
//       enableDrag = true
//     }
//   })
//   game.canvas.addEventListener('mousemove', function (event) {
//     var x = event.offsetX
//     var y = event.offsetY
//     // log(x, y, 'move')
//     if (enableDrag) {
//       log(x, y, 'drag')
//       ball.x = x
//       ball.y = y
//     }
//   })
//   game.canvas.addEventListener('mouseup', function (event) {
//     var x = event.offsetX
//     var y = event.offsetY
//     log(x, y, 'up')
//     enableDrag = false
//   })

//   return s
// }