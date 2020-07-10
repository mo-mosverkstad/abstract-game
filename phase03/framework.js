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

class Widget{
    constructor(positions, shape, color){
        this.positions = positions;
        this.xPositions = splitArray(positions)[0];
        this.yPositions = splitArray(positions)[1];
        this.shape  = shape;
        this.color  = color;
        this.base   = [0, 0];
        this.scalar = 1;
        this.vector = [0, 0];
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
    
    isTouchedAtBorder(width, height){
        var rect = this.toRect();
        var modulus = this.vector[0];
        var arc = this.vector[1];// arc in radians
        var x1 = rect[0] + this.move_x(modulus, arc);
        var y1 = rect[1] + this.move_y(modulus, arc);
        var x2 = rect[2] + this.move_x(modulus, arc);
        var y2 = rect[3] + this.move_y(modulus, arc);
        //console.log("x1:" + x1 + ", y1:" + y1 + ", x2:" + x2 + ", y2:" + y2 + "//");
        if (x1 <= 0 || y1 <= 0 || x2 >= width || y2 >= height){
            return true;
        }
        else{
            return false;
        }
    }
    
    borderEffect(effect){
        if (this.isTouchedAtBorder(400, 400)){
            switch (effect){
                case effectStop:
                this.vector = [0, 0];
                break;
                case effectBounce:
                this.vector[1] = (this.vector[1] + (Math.PI/4 - (this.vector[1] % (Math.PI/4))) * 2) % (Math.PI * 2);
                break;
            }
        }
    }
    
    getPositions(){
        return merge(this.xPositions, this.yPositions);
    }
    
    isTouched(x, y){
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
    
}