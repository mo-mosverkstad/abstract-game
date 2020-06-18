class paintSpaceTouch extends Paintspace {
    constructor(width, height, color){
        super(width, height, color);
        
        this.add('c', new Circle([100, 100, 10], "white"));
        this.get('c').vector = [10, Math.PI/4*2];
        this.get('c').borderEffect = 4;
        
        this.add('r', new Rectangle([10, 10, 20, 20], "blue"));
        this.get('r').vector = [10, Math.PI*0.2];
        this.get('r').borderEffect = 3;
        
        this.add('t', new Triangle([10, 10, 20, 5, 25, 20], "red"));
        
    }
    
    mouseMove(x, y) {
        this.get('t').newPosition([x, y, x, y-10, x+10, y-20]);
    }
    
    mouseClick(x, y) {
        this.get('t').newPosition([x, y, x-100, y-10, x-20, y-20]);
    }
    
    keyDown(keyCode) {
        console.log(keyCode);
    }

    update() {
        if (!this.get('t').isOverlapped(this.get('c').scope)) {
            this.moveAll();
        }
        this.drawAll();
    }
}

myPaintware.add(new paintSpaceTouch(200, 200, ''));

