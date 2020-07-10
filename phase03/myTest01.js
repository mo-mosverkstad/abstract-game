//myGameArea.refresh = false;

c = new Widget([100, 100, 300, 200], ShapeCircle, "green");
c.vector = [10, Math.PI/4];
//console.log(c.toRect());
var a = merge([1, 3, 5, 7], [2, 4, 6, 8])
console.log(a);
c.draw();

function update() {
    c.draw();
    c.move();
    c.borderEffect(effectBounce);
}

function mouseMove(x, y) {
    console.log(x, y);
}

function mouseClick(x, y) {
    console.log(x, y);
}

function keyDown(keyCode) {
    console.log(keyCode);
}