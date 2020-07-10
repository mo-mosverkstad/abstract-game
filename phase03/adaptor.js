var myGameArea = {
    canvas : document.createElement("canvas"),
    refresh: true,
    start : function() {
        this.canvas.width = 400;// painspace definition
        this.canvas.height = 400;// painspace definition
        this.context = this.canvas.getContext("2d");
        this.fill();
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 0.1 * 1000);// painspace definition
    },
    fill : function() {
        this.context.fillStyle = "rgb(125, 125, 125)";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function getMouseMove(evt) {
    var rect = myGameArea.canvas.getBoundingClientRect();
    mouseMove(evt.clientX - rect.left, evt.clientY - rect.top);
}

function getMouseClick(evt) {
    var rect = myGameArea.canvas.getBoundingClientRect();
    mouseClick(evt.clientX - rect.left, evt.clientY - rect.top);
}

function getKeyDown(evt) {
    keyDown(evt.keyCode);
}

myGameArea.start();
myGameArea.canvas.addEventListener('mousemove', getMouseMove, false);
myGameArea.canvas.addEventListener('click', getMouseClick, false);
window.addEventListener('keydown', getKeyDown, false);

function updateGameArea() {
    if (myGameArea.refresh) {
        myGameArea.clear();
        myGameArea.fill();
    }
    update();
}

function circle(x1, y1, x2, y2, color) {
    //console.log(x, y, radius, color);
    var radius1 = (x2 - x1)/2;
    var radius2 = (y2 - y1)/2;
    var x = x1 + radius1;
    var y = y1 + radius2;
    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.ellipse(x, y, radius1, radius2, 0, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke(); 
}

function rectangle(x1, y1, x2, y2, color) {
    var x = x1;
    var y = y1;
    var width  = x2 - x1;
    var height = y2 - y1;
    var ctx = myGameArea.context;
    myGameArea.context.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function triangle(x1, y1, x2, y2, x3, y3, color) {
    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

function splitArray(a){
    var oddIndex  = [];
    var evenIndex = [];
    for (i=0; i<a.length; i++){
        if (i%2 == 0){
            evenIndex.push(a[i]);
        }
        else {
            oddIndex.push(a[i]);
        }
    }
    return [evenIndex, oddIndex];//[x, y]
}

function merge(even, odd){//(x, y)
    var a = [];
    var e = 0;
    var o = 0;
    for (var i=0; i<(even.length + odd.length); i++){
        if (i%2 == 0){
            a.push(even[e]);
            e++;
        }
        
        else{
            a.push(odd[o]);
            o++;
        }
    }
    //console.log(a);
    return a;
}


function sin(angle) {
    return Math.sin(angle);
}

function cos(angle) {
    return Math.cos(angle);
}

K_A = 65; K_B = 66; K_C = 67; K_D = 68; K_E = 69; K_F = 70; K_G = 71;
K_H = 72; K_I = 73; K_J = 74; K_K = 75; K_L = 76; K_M = 77; K_N = 78;
K_O = 79; K_P = 80; K_Q = 81; K_R = 82; K_S = 83; K_T = 84; K_U = 85;
K_V = 86; K_W = 87; K_X = 88; K_Y = 89; K_Z = 90;
K_LEFT = 37; K_RIGHT = 39; K_UP = 38;K_DOWN = 40; K_SPACE = 32;
K_ESC = 27; K_PGUP = 33; K_PGDOWN = 34; K_HOME = 36; K_END = 35;
K_0 = 48; K_1 = 49; K_2 = 50; K_3 = 51; K_4 = 52; K_5 = 53;
K_6 = 54; K_7 = 55; K_8 = 56; K_9 = 57;