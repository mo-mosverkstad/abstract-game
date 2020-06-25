var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = painspace.width;
        this.canvas.height = painspace.height;
        this.context = this.canvas.getContext("2d");
        this.fill();
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, painspace.refreshSpeed * 1000);
    },
    fill : function() {
        this.context.fillStyle = painspace.color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function startGame() {
	myGameArea.start();
    initialize()
}

function updateGameArea() {
    if (painspace.refreshOrNot) {
        myGameArea.clear();
        myGameArea.fill();
    }
    update();
}

function circle(x, y, radius, color) {
    //console.log(x, y, radius, color);
    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke(); 
}

function rectangle(x, y, width, height, color) {
    var ctx = myGameArea.context;
    myGameArea.context.fillStyle = "blue";
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
}

function sin(angle) {
    return Math.sin(angle);
}

function cos(angle) {
    return Math.cos(angle);
}