var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = myPaintware.activeSpace().width;
        this.canvas.height = myPaintware.activeSpace().height;
        this.context = this.canvas.getContext("2d");
        this.fill();
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, myPaintware.activeSpace().refreshSpeed * 1000);
    },
    fill : function() {
        this.context.fillStyle = myPaintware.activeSpace().color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function getMouseMove(evt) {
    var rect = myGameArea.canvas.getBoundingClientRect();
    myPaintware.activeSpace().mouseMove(evt.clientX - rect.left, evt.clientY - rect.top);
}

function getMouseClick(evt) {
    var rect = myGameArea.canvas.getBoundingClientRect();
    myPaintware.activeSpace().mouseClick(evt.clientX - rect.left, evt.clientY - rect.top);
}

function getKeyDown(evt) {
    myPaintware.activeSpace().keyDown(evt.keyCode);
}

function startGame() {
	myGameArea.start();
    
    myGameArea.canvas.addEventListener('mousemove', getMouseMove, false);
    myGameArea.canvas.addEventListener('click', getMouseClick, false);
    window.addEventListener('keydown', getKeyDown, false);

    myPaintware.activeSpace().initialize();
}

function updateGameArea() {
    if (myPaintware.activeSpace().refreshOrNot) {
        myGameArea.clear();
        myGameArea.fill();
    }
    
    myPaintware.activeSpace().update();
}

function circle(x, y, radius, color) {
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke(); 
}

function rectangle(x, y, width, height, color) {
    ctx = myGameArea.context;
    myGameArea.context.fillStyle = "blue";
    ctx.fillRect(x, y, width, height);
}

function triangle(x1, y1, x2, y2, x3, y3, color) {
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fillStyle = color;
    ctx.fill();
}

K_A = 65; K_B = 66; K_C = 67; K_D = 68; K_E = 69; K_F = 70; K_G = 71;
K_H = 72; K_I = 73; K_J = 74; K_K = 75; K_L = 76; K_M = 77; K_N = 78;
K_O = 79; K_P = 80; K_Q = 81; K_R = 82; K_S = 83; K_T = 84; K_U = 85;
K_V = 86; K_W = 87; K_X = 88; K_Y = 89; K_Z = 90;
K_LEFT = 37; K_RIGHT = 39; K_UP = 38;K_DOWN = 40; K_SPACE = 32;
K_ESC = 27; K_PGUP = 33; K_PGDOWN = 34; K_HOME = 36; K_END = 35;
K_0 = 48; K_1 = 49; K_2 = 50; K_3 = 51; K_4 = 52; K_5 = 53;
K_6 = 54; K_7 = 55; K_8 = 56; K_9 = 57;
