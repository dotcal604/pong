import { SVG_NS } from '../settings';

export class Ball {
  constructor(ballRadius, boardWidth, boardHeight) {
    this.ballRadius = ballRadius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.ballDirection = 1;
    this.ping = new Audio('public/sounds/pong-01.wav');
    this.pong = new Audio('public/sounds/pong-03.wav');
    this.wall = new Audio('public/sounds/pong-02.wav');

    this.reset();
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.ballDirection * (6 - Math.abs(this.vy));
  }

  wallCollision(paddle1, paddle2) {
    const hitLeft = this.x - this.ballRadius<= 0;
    const hitRight = this.x + this.ballRadius>= this.boardWidth;
    const hitTop = this.y - this.ballRadius <= 0;
    const hitBottom = this.y + this.ballRadius >= this.boardHeight;

    if (hitLeft) {

      this.ballDirection = - 1;
      this.goal(paddle2);
      this.wall.play()
    } else if (hitRight) {

      this.ballDirection = 1;
      this.goal(paddle1);
      this.wall.play()
    } else if (hitTop || hitBottom) {
      this.vy *= -1;
      this.pong.play();
    }
  }

  paddleCollision(paddle1, paddle2) {
    if (this.vx > 0) {
      const [left, right, top, bottom] = paddle2.coordinates();
      const hit =
        this.x + this.ballRadius >= left && this.y <= bottom && this.y >= top;
      if (hit) {
        this.vx *= -1;
        this.ping.play()
      }
    } else {
      const [left, right, top, bottom] = paddle1.coordinates();
      const hit =
        this.x - this.ballRadius <= right && this.y <= bottom && this.y >= top;
      if (hit) {
        this.vx *= -1;
        this.ping.play()
      }
    }
  }

  goal(paddle) {
    paddle.score++;
    this.reset();
  }


  render(svg, paddle1, paddle2) {
    
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    
    this.paddleCollision(paddle1, paddle2);
    this.wallCollision(paddle1, paddle2);

    let circle = document.createElementNS(SVG_NS, 'circle');

    circle.setAttributeNS(null, 'r', this.ballRadius);
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'fill', 'white');

    svg.appendChild(circle);
  

  }
}
