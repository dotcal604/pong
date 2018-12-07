import { SVG_NS } from '../settings';

export class Ball {

    constructor(radius, boardWidth, boardHeight, ) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.reset();

        
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

        const hitTop = (this.y - this.radius <= 0);
        const hitBottom = (this.y + this.radius >= this.boardHeight);
        if (hitTop || hitBottom) {
            this.vy *= -1;
            
        }
    }
 
    paddleCollision(player1, player2) {

        if (this.vx > 0) {
            const [left, right, top, bottom] = player2.coordinates();
            const hit = (this.x + this.radius >= left)
                && (this.y <= bottom)
                && (this.y >= top);
            if (hit) {
                this.vx *= -1;
            }
        } else {
            const [left, right, top, bottom] = player1.coordinates();
            const hit = (this.x - this.radius <= right)
                && (this.y <= bottom)
                && (this.y >= top);
            if (hit) {
                this.vx *= -1;
            }
        }

    }
    
    checkScore(paddle1, paddle2) {
        const hitLeft = (this.x - this.radius <= 0);
        const hitRight = (this.x + this.radius >= this.boardWidth);

        if (hitLeft) {
            paddle2.increaseScore();
            this.reset();
            this.direction *= -1;
        } else if (hitRight) {
            paddle1.increaseScore();
            this.reset();
            this.direction *= -1;
        }
    }

    render(svg, paddle1, paddle2) {
        let circle = document.createElementNS(SVG_NS, 'circle');
        
		circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x);
        circle.setAttributeNS(null, 'cy', this.y);
        circle.setAttributeNS(null, 'fill', 'white');
        
        svg.appendChild(circle);
        this.paddleCollision(paddle1, paddle2);
        this.wallCollision();
        this.checkScore(paddle1, paddle2);
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }
}