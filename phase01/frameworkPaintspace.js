class Paintspace {
  constructor(width, height, color){
      this.width  = width  <= 0 ? window.innerWidth : width;
      this.height = height <= 0 ? window.innerHeight: height;
      this.data   = {};
      this.base   = [0, 0];
      this.scalar = 1;
      this.color  = color.length==0? "rgba(0,0,0,0.5)" : color;
      this.refreshSpeed = 0.1;
      this.refreshOrNot = true;
      
      this.widgetsMap = new Map();
  }
  
  add(key, widget) {
      widget.borders = [this.base[0], this.base[1], this.width, this.height];
      this.widgetsMap.put(key, widget);
  }
  
  get(key) {
      return this.widgetsMap.get(key);
  }
  
  list() {
      for(var i = 0; i++ < this.widgetsMap.size; this.widgetsMap.next())
          console.log(this.widgetsMap.key() + ' : ' + this.widgetsMap.value());
  }
  
  moveAll() {
      for(var i = 0; i++ < this.widgetsMap.size; this.widgetsMap.next())
          this.widgetsMap.value().move();
  }
  
  drawAll() {
      for(var i = 0; i++ < this.widgetsMap.size; this.widgetsMap.next())
          this.widgetsMap.value().draw();
  }

  initialize()     { }
  mouseMove(x, y)  { }
  mouseClick(x, y) { }
  keyDown(keyCode) { }
  update() {}
}