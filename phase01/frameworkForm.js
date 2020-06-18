class FormBase {
  constructor(positions, color) {
    this.color  = color;
    this.vector = [0, 0];
    
    // 0 for stop out screen;
    // 1 for stop in screen;
    // 2 for anti-direction;
    // 3 for bound;
    // 4 for cross screen.
    this.borderEffect = 0;
    this.borders      = [-1, -1, -1, -1];
    this.deltaX       = 0;
    this.deltaY       = 0;
    
    this.newPosition(positions);
  }
  
  _getXDelta() {
      return this.vector[0] * Math.cos(this.vector[1])
  }
  
  _getYDelta() {
      return this.vector[0] * Math.sin(this.vector[1])
  }
  
  _checkBorderValid() {
      for (var b of this.borders) { if (b < 0) return false; }
      return true;
  }
  
  _checkToHitBoarder() {
      var stop = false;
      if (this.deltaX > 0 && (this.x2 + this.deltaX >= this.borders[2])) { this.deltaX = this.borders[2] - this.x2; stop = true; }
      if (this.deltaX < 0 && (this.x1 + this.deltaX <= this.borders[0])) { this.deltaX = this.borders[0] - this.x1; stop = true; }
      if (this.deltaY > 0 && (this.y2 + this.deltaY >= this.borders[3])) { this.deltaY = this.borders[3] - this.y2; stop = true; }
      if (this.deltaY < 0 && (this.y1 + this.deltaY <= this.borders[1])) { this.deltaY = this.borders[1] - this.y1; stop = true; }
      return stop;
  }
  
  _checkToPassBoarder() {
      var stop = false;
      if (this.deltaX > 0 && (this.x1 + this.deltaX >= this.borders[2])) { stop = true; }
      if (this.deltaX < 0 && (this.x2 + this.deltaX <= this.borders[0])) { stop = true; }
      if (this.deltaY > 0 && (this.y1 + this.deltaY >= this.borders[3])) { stop = true; }
      if (this.deltaY < 0 && (this.y2 + this.deltaY <= this.borders[1])) { stop = true; }
      return stop;
  }
  
  _crossBoarder() {
      if (this.deltaX > 0 && (this.x1 + this.deltaX >= this.borders[2])) { this.deltaX = this.borders[0] - this.borders[2]; }
      if (this.deltaX < 0 && (this.x2 + this.deltaX <= this.borders[0])) { this.deltaX = this.borders[2] - this.borders[0]; }
      if (this.deltaY > 0 && (this.y1 + this.deltaY >= this.borders[3])) { this.deltaY = this.borders[1] - this.borders[3]; }
      if (this.deltaY < 0 && (this.y2 + this.deltaY <= this.borders[1])) { this.deltaY = this.borders[3] - this.borders[1]; }
  }

  _stopVector() {
      this.vector[0] = 0;
  }
  
  _reverseVector() {
      this.vector[1] = (this.vector[1] + Math.PI) % (Math.PI * 2);
  }
  
  _boundVector() {
      this.vector[1] = (this.vector[1] + (Math.PI/4 - (this.vector[1] % (Math.PI/4))) * 2) % (Math.PI * 2);
  }
  
  _updateViaVector() {
      this.deltaX = this._getXDelta(); this.deltaY = this._getYDelta();
      if (this.deltaX == 0 && this.deltaY == 0) { return; }
      if (!this._checkBorderValid()) { return; }
      
      switch (this.borderEffect) {
        case 0:
          if (this._checkToHitBoarder())  { this._stopVector(); }
          break;
        case 1:
          if (this._checkToPassBoarder()) { this._stopVector(); }
          break;
        case 2:
          if (this._checkToHitBoarder())  { this._reverseVector(); }
          break;
        case 3:
          if (this._checkToHitBoarder())  { this._boundVector(); }
          break;
        case 4:
          this._crossBoarder();
          break;
      }
  }
  
  _updateXViaVector(value) {
      return value + this.deltaX;
  }
  
  _updateYViaVector(value) {
      return value + this.deltaY;
  }
  
  newPosition(positions) {
    this.positions = positions;
    this.scope     = this.setScope(positions);
    this.x1 = this.scope[0]; this.y1 = this.scope[1];
    this.x2 = this.scope[2]; this.y2 = this.scope[3];
  }
  
  isOverlapped(otherScope) {
      var x1 = otherScope[0]; var y1 = otherScope[1];
      var x2 = otherScope[2]; var y2 = otherScope[3];
      return !((this.y2 < y1) || (this.y1 > y2) || (this.x2 < x1) || (this.x1 > x2));
  }
  
  isClicked(x, y) {
      return (x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2);
  }
  
  setScope(positions) {
  }
  
  refresh() {
  }
  
  draw() {
  }
  
  move(){
      this._updateViaVector();
      this.newPosition(this.refresh());
  }
}

class Circle extends FormBase {
  setScope(positions) {
      this.cx = positions[0]; this.cy = positions[1]; this.r = positions[2];
      return [this.cx - this.r, this.cy - this.r, this.cx + this.r, this.cy + this.r];
  }
  
  draw() {
      circle(this.cx, this.cy, this.r, this.color);
  }
  
  refresh(){
      return [this._updateXViaVector(this.cx), this._updateYViaVector(this.cy), this.r];
  }
}

class Rectangle extends FormBase {
  setScope(positions) {
      this.px = positions[0]; this.py = positions[1];
      this.w  = positions[2]; this.h  = positions[3];
      return [this.px, this.py, this.px + this.w, this.py + this.h];
  }
  
  draw() {
      rectangle(this.px, this.py, this.w, this.h, this.color);
  }
  
  refresh(){
      return [this._updateXViaVector(this.px), this._updateYViaVector(this.py), this.w, this.h];
  }
}

class Triangle extends FormBase {
  setScope(positions) {
      this.px1 = positions[0]; this.py1 = positions[1];
      this.px2 = positions[2]; this.py2 = positions[3];
      this.px3 = positions[4]; this.py3 = positions[5];
      return [Math.min(this.px1, this.px2, this.px3), Math.min(this.py1, this.py2, this.py3),
              Math.max(this.px1, this.px2, this.px3), Math.max(this.py1, this.py2, this.py3)];
  }
  
  draw() {
      triangle(this.px1, this.py1, this.px2, this.py2, this.px3, this.py3, this.color);
  }
  
  refresh(){
      return [this._updateXViaVector(this.px1), this._updateYViaVector(this.py1),
              this._updateXViaVector(this.px2), this._updateYViaVector(this.py2),
              this._updateXViaVector(this.px3), this._updateYViaVector(this.py3)];
  }

}