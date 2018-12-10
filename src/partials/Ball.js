import { SVG_NS } from '../settings';

export class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-01.wav');

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

  wallCollision(paddle1, paddle2) {
    const hitLeft = this.x - this.r <= 0;
    const hitRight = this.x + this.r >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft) {
      this.direction = -1;
      this.goal(paddle2);
    } else if (hitRight) {
      this.direction = -1;
      this.goal(paddle1);
    } else if (hitTop || hitBottom) {
      this.vy *= -1;
    }
  }

  paddleCollision(paddle1, paddle2) {
    if (this.vx > 0) {
      const [left, right, top, bottom] = paddle2.coordinates();
      const hit =
        this.x + this.radius >= left && this.y <= bottom && this.y >= top;
      if (hit) {
        this.vx *= -1;
      }
    } else {
      const [left, right, top, bottom] = paddle1.coordinates();
      const hit =
        this.x - this.radius <= right && this.y <= bottom && this.y >= top;
      if (hit) {
        this.vx *= -1;
      }
    }
  }

  goal(paddle) {
    paddle.score++;
    this.reset();
  }

  checkScore(paddle1, paddle2) {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;

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
    this.wallCollision(paddle1, paddle2);
    this.checkScore(paddle1, paddle2);
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }
}
