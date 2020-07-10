//myGameArea.refresh = false;

c = new Widget([100, 100, 200, 200], ShapeRectangle, "green");
//c.vector = [10, Math.PI/4];
//console.log(c.toRect());
var a = merge([1, 3, 5, 7], [2, 4, 6, 8])
console.log(a);
c.draw();
console.log(c.isTouched(100, 100));

function update() {
    c.draw();
    //c.move();
    //c.borderEffect(effectBounce);
    //console.log(c.getPositions());
    place = c.getPositions();
    if (JSON.stringify(place) === JSON.stringify([200, 100, 300, 200])){
        console.log("reach point");
        c.xPositions[0] = 82;
    }
}

// sensor
function mouseMove(x, y) {
    //console.log(x, y);
}

function mouseClick(x, y) {
    console.log(x, y);
    if (c.isTouched(x, y)){
        c.xPositions = [200, 400];
        c.yPositions = [300, 400];
    }
}

function keyDown(keyCode) {
    console.log(keyCode);
    if (keyCode == K_LEFT){
        c.vector = [-1, 0];
        c.move();
        //console.log(c.getPositions());
    }
    else if (keyCode == K_RIGHT){
        c.vector = [1, 0];
        c.move();
        //console.log(c.getPositions());
    }
    
}