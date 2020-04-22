class TDMap {
    constructor(game, w, h) {
        this.w = w
        this.h = h
        this.grid = []
        this.tileSize = 100
        this.setup()
    }
    addTower(i, j) {
        // 10 表示tower
        this.grid[i][j] = 10
    }
    removeTower(i, j) {
        this.grid[i][j] = 1
    }
    setup() {

        // let w = this.w
        // let h = this.h
        // for (let  = 0;  < array.length; ++) {
        //     const element = array[];
            
        // }
        // 0 不能走
        // 1 可以走
        let grid = [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
        ]
        this.grid = grid
    }
    normalGrid() {
        let grid = []
        for (const column of this.grid) {
            let  newClolumn = []
            for (const flag of column) {
                if (flag != 1) {
                    newClolumn.push(0)
                } else {
                    newClolumn.push(1)
                }
            }
            grid.push(newClolumn)
        }
        return grid
    }
    showGrid() {
    }
    pathfinding(i, j) {
        if (i < 0) {
            i = 0
        }
        let map = this.normalGrid()
        let graph = new Graph(map)
        let start = graph.grid[i][j]
        //end 是不会改变的 是目的地
        let end = graph.grid[8][2]
        let result = astar.search(graph, start, end)
        // console.log(result);
        return result
    }
}