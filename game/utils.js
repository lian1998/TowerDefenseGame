var e = sel => document.querySelector(sel)

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function (a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}

function randomBetween(start, end) {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
