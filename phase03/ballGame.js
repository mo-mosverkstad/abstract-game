//myGameArea.refresh = false;

/* data section */
var space = [400, 400];

var avatar_data = {x: space[0]/2, y: space[1], width: 30, height: 10, type: ShapeCircle, color: "yellow"};

var balls_data = [
    {position: [  0, 100,  50, 150], type: ShapeCircle, color: "green", vector: [15, Math.PI/3], effect: effectBounce},
    {position: [100,   0, 150,  50], type: ShapeCircle, color: "red",   vector: [15, Math.PI/5], effect: effectBounce},
    {position: [100, 100, 150, 150], type: ShapeCircle, color: "blue",   vector: [15, Math.PI/7], effect: effectBounce},
];

/* coding section */
var pass = true;

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
                        avatar_data.color);



function update() {
    if (pass) {
        var rect = [avatar.xPositions[0], avatar.yPositions[0], avatar.xPositions[1], avatar.yPositions[1]];
        for (var i of balls){
            if (i.isClicked(rect[0], rect[1])|| i.isClicked(rect[2], rect[3]) || i.isClicked(rect[0], rect[3]) || i.isClicked(rect[2], rect[1])){
                pass = false;
            }
        }
        if (!pass) {
            for (var i of balls){
                i.moving.stop();
            }
        }
    }

    for (var b of balls) {
        b.move();
        b.draw();
    }
    avatar.draw();

}

// sensor
function mouseMove(x, y) {
    if (!pass) { return; }
    var rect = getAvatarRect(x, y);
    avatar.xPositions = [rect[0], rect[2]];
    avatar.yPositions = [rect[1], rect[3]];
}

function mouseClick(x, y) {

}

function keyDown(keyCode) {

    
}