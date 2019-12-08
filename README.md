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