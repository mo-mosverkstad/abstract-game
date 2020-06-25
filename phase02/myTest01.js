painspace = new Paintspace(0, 0, '');
//painspace.refreshOrNot=false;

/*
w = new Widget([20, 20, 20], "white");
w.setColor("rgb(132,111,231)");

var y = new Widget([10, 10, 20, 20], "blue");
var t = new Widget([10, 10, 20, 5, 25, 20], "green");

console.log("hello, Mo");
*/

//var ballgame = new Widget([100, 100, 50], "green");
painspace.setBase(100, 100);
painspace.add("c", [100, 100, 50], "green");
painspace.add("t", [150, 150, 300, 321, 222, 311], "black");
//console.log(painspace.getBase());
painspace.resetBase();
painspace.add("r", [200, 200, 100, 100], "blue");
//console.log(painspace.touchBorder("c", 620, 587));
//console.log(painspace.width.toString() + ", " + painspace.height.toString());
//console.log(painspace.getBase());
//painspace.setPositions("c", [200, 200, 50]);
//painspace.remove("c");
//painspace.draw();

function initialize() {
    painspace.widgetData.c.setVector([9, 1/2*Math.PI]);
    painspace.widgetData.t.setVector([9, 45*deg]);
    painspace.widgetData.r.setVector([9, 30*deg]);
}

function update() {
    /*
    w.draw();
    y.setBase(100, 100);
    y.draw();
    y.move([50, Math.PI/4]);
    y.draw();
    t.draw();
    */
    painspace.widgetData.c.move();
    painspace.widgetData.t.move();
    painspace.widgetData.r.move();
    painspace.borderEffect("c");
    painspace.borderEffect("r");
    painspace.borderEffect("t");
    painspace.draw();
}