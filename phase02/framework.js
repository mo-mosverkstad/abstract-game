var deg = Math.PI/180;

class Widget {
    constructor(positions, color) {
        this.positions = positions;
        this.color     = color;
        this.shape     = positions.length;
        this.vector    = [0, 0];
    }
    
    // get and set properties
    getPositions() {
        return this.positions;
    }
    
    setPositions(positions) {
        this.positions = positions;
    }
    
    setPositionsById(id, value) {
        this.positions[id] = value;
    }
    
    getColor() {
        return this.color;
    }
    
    setColor(color) {
        this.color = color;
    }
    
    setBase(base){
        var x = base[0];
        var y = base[1];
        switch (this.shape) {
          case 3:
          case 4:
            this.positions[0] = this.positions[0] + x;
            this.positions[1] = this.positions[1] + y;
            break;
          case 6:
            this.positions[0] = this.positions[0] + x;
            this.positions[1] = this.positions[1] + y;
            this.positions[2] = this.positions[2] + x;
            this.positions[3] = this.positions[3] + y;
            this.positions[4] = this.positions[4] + x;
            this.positions[5] = this.positions[5] + y;
            break;
        }
    }
    
    isClicked(x, y) {
        switch (this.shape) {
          case 3: // circle
            return (x >= this.positions[0]-this.positions[2] &&
                    x <= this.positions[0]+this.positions[2] &&
                    y >= this.positions[1]-this.positions[2] &&
                    y <= this.positions[1]+this.positions[2]);
            break;
          case 4: // rectangle
            return (this.positions[0] <= x && x <= this.positions[2] &&
                    this.positions[1] <= y && y <= this.positions[3]);
            break;
          case 6: // triangle
            var xLeft   = Math.min(this.positions[0],
                                   this.positions[2],
                                   this.positions[4]);
            var xRight  = Math.max(this.positions[0],
                                   this.positions[2],
                                   this.positions[4]);
            var yTop    = Math.min(this.positions[1],
                                   this.positions[3],
                                   this.positions[5]);
            var yBottom = Math.max(this.positions[1],
                                   this.positions[3],
                                   this.positions[5]);
            return (xLeft <= x && x <= xRight &&
                    yTop  <= y && y <= yBottom);
            break;
        }
    }
    
    draw() {
        switch (this.shape) {
          case 3: // circle
            circle(this.positions[0], 
                  this.positions[1], 
                  this.positions[2],
                  this.color);
            break;
          case 4: // rectangle
            rectangle(this.positions[0],
                     this.positions[1],
                     this.positions[2],
                     this.positions[3],
                      this.color);
            break;
          case 6: // triangle
            triangle(this.positions[0], 
                     this.positions[1],
                     this.positions[2], 
                     this.positions[3],
                     this.positions[4], 
                     this.positions[5],
                     this.color);
        }
    }
    
    _updateXViaVector(value, vector) {
        var d = vector[0];
        var alpha = vector[1];
        return value + d * Math.cos(alpha);
    }
    
    _updateYViaVector(value, vector) {
        var d = vector[0];
        var alpha = vector[1];
        return value + d * Math.sin(alpha);
    }
    
    move(){
      switch (this.shape){
          case 3:
          case 4:
            this.positions[0] = this._updateXViaVector(this.positions[0], this.vector);
            this.positions[1] = this._updateYViaVector(this.positions[1], this.vector);
            break;
          case 6:
            this.positions[0] = this._updateXViaVector(this.positions[0], this.vector);
            this.positions[1] = this._updateYViaVector(this.positions[1], this.vector);
            this.positions[2] = this._updateXViaVector(this.positions[2], this.vector);
            this.positions[3] = this._updateYViaVector(this.positions[3], this.vector);
            this.positions[4] = this._updateXViaVector(this.positions[4], this.vector);
            this.positions[5] = this._updateYViaVector(this.positions[5], this.vector);
            break;
        }
    }
    
    setVector(vector){
        this.vector = vector;
    }
    
  }

class Widgets {
    constructor(){
        this.data = [];
    }
    
    add(widget){
        this.data.push(widget);
    }
    
    delete() {
        this.data.pop();
    }
  
    isClicked(x, y) {
        for (var d of this.data) {
            if (d.isClicked(x, y)) {
                return (true);
            }
        }
        return (false);
    }
    
    draw() {
        for (var d of this.data){
            d.draw();
        }
    }
    
    /*
    move(vector){
        for (var d of this.data){
            d.move(vector);
        }
    }
    */
}

class Paintspace {
    constructor(width, height, color){
        this.width  = width  <= 0 ? window.innerWidth : width;
        this.height = height <= 0 ? window.innerHeight: height;
        //this.data   = {};
        this.base   = [0, 0];
        this.scalar = 1;
        this.color  = color.length==0? "rgba(0,0,0,0.5)" : color;
        this.refreshSpeed = 0.1;
        this.refreshOrNot = true;
        this.dataKeys   = [];
        this.widgetData = {};
    }
    
    add(id, positions, color){
        this.widgetData[id] = new Widget(positions, color);
        this.get(id).setBase(this.base);
    }
    
    remove(id){
        this.widgetData.remove(id);
    }
    
    setPositions(id, positions){
        this.get(id).setPositions(positions);
    }
    
    getPositions(id){
        return (this.get(id).getPositions());
    }
    
    get(id){
        return (this.widgetData[id]);
    }
    
    draw(){
        for (var key in this.widgetData) {
            if (this.widgetData.hasOwnProperty(key)) {
                this.widgetData[key].draw();
            }
        }
    }
    
    isClicked(id, x, y){
        return(this.get(id).isClicked(x, y));
    }
    
    setBase(x, y){
        this.base = [x, y];
    }
    
    getBase(){
        return(this.base);
    }
    
    resetBase(){
        this.base = [0, 0];
    }
    
    setVector(id, vector){
        this.get(id).setVector(vector);
    }
    
    move(id){
        this.get(id).move();
    }
    
    touchBorder(id){
        var widgetShape = this.get(id).shape;
        var width  = this.width;
        var height = this.height;
        var x = this.get(id).positions[0];
        var y = this.get(id).positions[1];
        var x1, y1, x2, y2;
        // formatting to rectangle
        switch (widgetShape){
          case 3:
            var r = this.get(id).positions[2];
            x1 = x-r;
            y1 = y-r;
            x2 = x+r;
            y2 = y+r;
            break;
          case 4:
            var w   = this.get(id).positions[2];
            var h   = this.get(id).positions[3];
            x1 = x;
            y1 = y;
            x2 = x+w;
            y2 = y+h;
            break;
          case 6:
            var x1t = this.get(id).positions[0];
            var y1t = this.get(id).positions[1];
            var x2t = this.get(id).positions[2];
            var y2t = this.get(id).positions[3];
            var x3t = this.get(id).positions[4];
            var y3t = this.get(id).positions[5];
            x1 = Math.min(x1t, x2t, x3t);
            y1 = Math.min(y1t, y2t, y3t);
            x2 = Math.max(x1t, x2t, x3t);
            y2 = Math.max(y1t, y2t, y3t);
            break;
        }
        
        if (x1 <= 0 || x2 >= width || y1 <= 0 || y2 >= height){
            return (true);
        }
        else {
            return (false);
        }
        
    }
    
    borderEffect(id){
        var widget = this.get(id);
        if (this.touchBorder(id)){
            this.get(id).setVector([0, 0]);
        }
    }
}