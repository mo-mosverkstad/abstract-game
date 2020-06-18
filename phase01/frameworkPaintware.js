class Paintware {
  constructor(){
      this.spaces = [];
      this.active = 0;
  }
  
  add(space) {
      this.spaces.push(space);
  }
  
  activeSpace() {
      return this.spaces[this.active];
  }
}