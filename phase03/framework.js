// shapes
var ShapeCircle = 0;
var ShapeRectangle = 1;
var ShapeTriangle = 2;

// bordereffects
var effectNone = -1;
var effectStop = 0;
var effectBounce = 1;

// drawings
var drawingFunction = [circle, rectangle, triangle];
var argumentsNumber = [4, 4, 6];

// need to make a format and is touched function
class Move {
    constructor(xPositions, yPositions, vector, space, borderEffect){
        this.xPositions = xPositions;
        this.yPositions = yPositions;
        this.vector = vector;
        this.vectorOld = vector;
        this.spaceWidth = space[0];
        this.spaceHeight = space[1];
        this.borderEffect = borderEffect;
    }
    
    toRect(){
        var x1 = Math.min.apply(null, this.xPositions);
        var y1 = Math.min.apply(null, this.yPositions);
        var x2 = Math.max.apply(null, this.xPositions);
        var y2 = Math.max.apply(null, this.yPositions);
        return [x1, y1, x2, y2];
    }
    
    
    move_x(modulus, arc){return modulus*cos(arc);}
    
    move_y(modulus, arc){return modulus*sin(arc);}
    
    move(){
        var modulus = this.vector[0];
        var arc = this.vector[1];// arc in radians
        for (i=0; i<this.xPositions.length; i++){
            this.xPositions[i] = this.xPositions[i] + this.move_x(modulus, arc);
        }
        for (i=0; i<this.yPositions.length; i++){
            this.yPositions[i] = this.yPositions[i] + this.move_y(modulus, arc);
        }
    }
    
    isTouchedAtBorder(){
        var rect = this.toRect();
        var modulus = this.vector[0];
        var arc = this.vector[1];// arc in radians
        var x1 = rect[0] + this.move_x(modulus, arc);
        var y1 = rect[1] + this.move_y(modulus, arc);
        var x2 = rect[2] + this.move_x(modulus, arc);
        var y2 = rect[3] + this.move_y(modulus, arc);
        //console.log("x1:" + x1 + ", y1:" + y1 + ", x2:" + x2 + ", y2:" + y2 + "//");
        if (x1 <= 0 || y1 <= 0 || x2 >= this.spaceWidth || y2 >= this.spaceHeight){
            return true;
        }
        else{
            return false;
        }
    }
    
    borderHandle(){
        switch (this.borderEffect){
            case effectStop:
                this.vector = [0, 0];
                break;
            case effectBounce:
                this.vector[1] = (this.vector[1] + (Math.PI/2 - (this.vector[1] % (Math.PI/2))) * 2) % (Math.PI * 2);
                break;
        }
    }
    
    stop() {
        this.vectorOld = this.vector;
        this.vector = [0, 0];
    }
}

class Widget{
    constructor(positions, shape, color){
        this.positions = positions;
        this.xPositions = splitArray(positions)[0];
        this.yPositions = splitArray(positions)[1];
        this.shape  = shape;
        this.color  = color;
        this.base   = [0, 0];
        this.scalar = 1;
        this.moving = null;
    }
    
    setMove(vector, space, borderEffect) {
        this.moving = new Move(this.xPositions, this.yPositions, vector, space, borderEffect);
    }
    
    toRect(){
        var x1 = Math.min.apply(null, this.xPositions);
        var y1 = Math.min.apply(null, this.yPositions);
        var x2 = Math.max.apply(null, this.xPositions);
        var y2 = Math.max.apply(null, this.yPositions);
        return [x1, y1, x2, y2];
    }
    
    draw(){
        drawingFunction[this.shape].apply(null, merge(this.xPositions, this.yPositions).concat([this.color]));
    }
    
    move(){
        if (this.moving != null) {
            if (this.moving.isTouchedAtBorder()) {
                this.moving.borderHandle();
            }
            this.moving.move();
        }
    }
        
    isClicked(x, y){
        var rect = this.toRect();
        var x1 = rect[0];
        var y1 = rect[1];
        var x2 = rect[2];
        var y2 = rect[3];
        if (x1 < x && x < x2 && y1 < y && y < y2){
            return true;
        }
        else {
            return false;
        }
    }
    
    getPositions(){
        return merge(this.xPositions, this.yPositions);
    }    

}



class Widgets{
    constructor(){
        this.data = {};
        this.rect = [-1, -1, -1, -1];
        this.xPositions = null;
        this.yPositions = null;
        this.moving = null;
    }
    
    add(id, widget){
        this.data[id] = widget;
        var wrect = widget.toRect();
        
        if(this.rect[0] < 0) {
            this.rect[0] = wrect[0];
            this.rect[1] = wrect[1];
            this.rect[2] = wrect[2];
            this.rect[3] = wrect[3];
        } else {
            this.rect[0] = Math.min(this.rect[0], wrect[0]);
            this.rect[1] = Math.min(this.rect[1], wrect[1]);
            this.rect[2] = Math.max(this.rect[2], wrect[2]);
            this.rect[3] = Math.max(this.rect[3], wrect[3]);
        }
        
        this.xPositions = splitArray(this.rect)[0];
        this.yPositions = splitArray(this.rect)[1];
    }
    
    setMove(vector, space, borderEffect){
        for (var widget of Object.values(this.data)){
            widget.setMove(vector, space, borderEffect);
        }
        this.moving = new Move(this.xPositions, this.yPositions, vector, space, borderEffect);
    }
    
    setVector(modulus, angle){
        for (var widget of Object.values(this.data)){
            widget.moving.vector = [modulus, angle];
        }
        this.moving.vector = [modulus, angle];
    }
    
    draw(){
        for (var widget of Object.values(this.data)){
            widget.draw();
        }
    }

    move(){
        if (this.moving != null) {
            if (this.moving.isTouchedAtBorder()) {
                for (var widget of Object.values(this.data)){
                    widget.moving.borderHandle();
                }
                this.moving.borderHandle();
            }
            for (var widget of Object.values(this.data)){
                widget.moving.move();
            }
            this.moving.move();
        }
    }
    
    isClicked(){
        var touched = false;
        var widget = null;
        for (widget of Object.values(this.data)){
            touched = touched || widget.isClicked();
        }
        return (touched);
    }
    
}