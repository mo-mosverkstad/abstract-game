//myGameArea.refresh = false;

/* data section */
var space = [400, 400];

var avatar_data = {x: space[0]/2, y: space[1]/2, width: 30, height: 10, type: ShapeCircle, effect: effectNone};

var balls_data = [
    {position: [100, 100, 150, 150], type: ShapeCircle, color: "yellow", vector: [15, Math.PI/3], effect: effectBounce},
    {position: [100, 100, 150, 150], type: ShapeCircle, color: "red",    vector: [15, Math.PI/5], effect: effectBounce},
    {position: [100, 100, 150, 150], type: ShapeCircle, color: "blue",   vector: [15, Math.PI/7], effect: effectBounce},
];

/* coding section */
var balls = [];
for (var data of balls_data) {
    var b = new Widget(data.position, data.type, data.color);
    b.setMove(data.vector, space, data.effect);
    balls.push(b);
}

function getAvatarRect(x, y) {
    return [x-avatar_data.width/2, y-avatar_data.height/2,
            x+avatar_data.width/2, y+avatar_data.height/2];
}

var avatar = new Widget(getAvatarRect(avatar_data.x, avatar_data.y),
                        avatar_data.type,
                        avatar_data.effect);



function update() {
    for (var b of balls) {
        b.move();
        b.draw();
    }
    avatar.draw();

}

// sensor
function mouseMove(x, y) {
    console.log(x, y);
    var rect = getAvatarRect(x, y);
    avatar.xPositions = [rect[0], rect[2]];
    avatar.yPositions = [rect[1], rect[3]];
}

function mouseClick(x, y) {

}

function keyDown(keyCode) {

    
}