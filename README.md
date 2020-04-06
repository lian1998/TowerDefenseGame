?
new this(game, name)

//t_scene
class TdScene {
  addElement(e) {
    e.scene = this
    this.elements.push(e)
  }
}




所有Tdimage实例的update都在t_scene中自动调用



1. 配置文件中生成div 

game.html canvas 3:2   900:600

main.js 入口文件
图片路径


1. 寻路算法
2. 游戏框架
# 1
下面有一排按钮，当把按钮拖动到画面中时，会显示类似地图编辑器的格子，松开鼠标时生成一个塔，有一个半径，当敌人走入塔的攻击半径之后，塔会进行攻击，并且范围内出现新的敌人也不会换目标，除非当前敌人死亡或离开攻击范围

## 图片载入
Scene类中new TdImage类，设定位置再调用父类方法addElement添加到elements数组中。在draw方法中遍历elements数组调用TdGame类的drawImage方法
```
    //TdGame
    drawImage(img) {
        this.context.drawImage(img.texture, img.x, img.y, img.w, img.h)
    }
    //TdImage
    draw() {
        this.game.drawImage(this)
    }
    //设置背景图片
    setupBG() {
        let bg = new TdImage(this.game, 'bg')
        bg.w = 900
        bg.h = 600
        this.addElement(bg)
    }
```
## 点击图标拖动的功能（鼠标事件）：
假设有多个元素都想注册鼠标事件，把所有的事件都放到数组mouseActions中，每注册一个鼠标事件，就把它加入数组中，由game来托管鼠标事件
在TdGame类里增加一个函数regsterMouse()
```
    registerMouse(callback) {
        this.mouseActions.push(callback)
    }
```
```        
    //mouse events
    var moving = false
    window.addEventListener('mousedown', function (event) {
        moving = true
        for (const a of that.mouseActions) {
            a(event, 'down')
        }
    })
    window.addEventListener('mousemove', function (event) {
        if (moving) {
            for (const a of that.mouseActions) {
                a(event, 'move')
            }
        }
    })
    window.addEventListener('mouseup', function (event) {
        moving = false
        for (const a of that.mouseActions) {
            a(event, 'up')
        }
    })
```
if(moving)使得只有点下鼠标才会调用数组中的函数


在scene类的setupInputs方法中调用this.game.registerMouse()传入一个函数，这个函数有两个参数第一个是event,第二个是status

需要取得点击的目标，判断点击位置是否在图片内,当点击位置在图片内时，生成一个新的图片并根据鼠标移动位置改变其位置，当松开鼠标时删除该图片
```
scene.js
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
```
## 敌人 
scene/main/enemy.js
找到距离最近的敌人并攻击他
场景中的元素是存在一个数组中的，遍历这个数组判断其是否在攻击范围内，在场景中给塔指定target

### 生命条


game.html 画布大小 canvas 3:2   900:600

功能函数的使用定义放在setup()中

把敌人看做点，判断点到圆心的距离是否小于半径

在子弹上加一个属性target以保证子弹不会切换目标

### 寻路


## 塔
tower.js
旋转 冷却 攻击

拖动放置,只能放在指定格子，需要对x,y进行修正
scene.js 
    addTower()




???
enemy.js
        console.log(this.scene === this.game.scene);




//TODO 放置塔的bug
//TODO 攻击范围优化 p21 17:48
//TODO 小人动画 



另一种寻路方式 p22 36:34