import { SVG_NS } from '../settings';

export default class Ball {

    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.reset();
        document.addEventListener('keydown', event => {
            console.log(event);
            if(event.key == ' ') {
                this.reset();
            }
        })
        }
    
    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
        this.vy = 0;
        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 - 5);
        }
        this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    wallCollision() {
        const hitLeft = (this.x - this.radius <= 0);
        const hitRight = (this.x + this.radius >= this.boardWidth);
        const hitTop = (this.y - this.radius <= 0);
        const hitBottom = (this.y + this.radius >= this.boardHeight);
        if (hitTop || hitBottom) {
            this.vy *= -1;
            this.vx *= -1;
        } else if (hitLeft || hitRight) {
            this.vy *= -1;
            this.vx *= -1;
        }
    }
    

    render(svg) {
        this.x += this.vx;
        this.y += this.vy;
        let circle = document.createElementNS(SVG_NS, 'circle');
        
		circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x);
        circle.setAttributeNS(null, 'cy', this.y);
        circle.setAttributeNS(null, 'fill', 'white');
        
        svg.appendChild(circle);
        this.wallCollision();
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }
}