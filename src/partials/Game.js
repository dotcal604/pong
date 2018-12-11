import { SVG_NS, KEYS } from '../settings';
import { Board } from './Board';
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { Score } from './Score';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.gameElement = document.getElementById(this.element);

		this.pause = false;
		
		this.board = new Board(this.width, this.height);

		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.ballRadius = 8;
		this.speed = 10;
		this.ballDirection = 1;

		this.scoreFontSize = 38;

		this.ball1 = new Ball(this.ballRadius, this.width, this.height);
		this.ball2 = new Ball(this.ballRadius, this.width, this.height);

		this.paddle1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.p1up,
			KEYS.p1down
		);

		this.paddle2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.paddleWidth - this.boardGap),
			((this.height - this.paddleHeight) / 2),
			KEYS.p2up,
			KEYS.p2down
		);

		this.score1 = new Score((this.width / 4), 30, 10);
		this.score2 = new Score((3*(this.width / 4)), 30, 10);

		document.addEventListener('keydown', event => {
			switch(event.key) {
				case KEYS.spaceBar:
				this.pause = !this.pause;
				break;
			}
		});
		


	}

	render() {

		if(this.pause) {
			return;
		}
		
		this.gameElement.innerHTML = '';
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.paddle1.render(svg);
		this.paddle2.render(svg);

		this.ball1.render(svg, this.paddle1, this.paddle2);
		this.ball2.render(svg, this.paddle1, this.paddle2);

		this.score1.render(svg, this.paddle1.score);
		this.score2.render(svg, this.paddle2.score);
	}
}