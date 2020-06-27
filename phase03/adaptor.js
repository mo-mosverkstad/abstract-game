var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;// painspace definition
        this.canvas.height = 400;// painspace definition
        this.context = this.canvas.getContext("2d");
        this.fill();
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 0.2 * 1000);// painspace definition
    },
    fill : function() {
        this.context.fillStyle = "rgb(125, 125, 125)";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function startGame() {
	myGameArea.start();
    initialize();
}

function updateGameArea() {
    if (true) {
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