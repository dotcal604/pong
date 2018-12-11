import { SVG_NS } from '../settings';

export class Score {

    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    render(svg, score) {
        let text = document.createElementNS(SVG_NS, 'text');
        
        text.setAttribute(null, 'x', this.x);
        text.setAttribute(null, 'y', this.y);
        text.setAttribute(null, 'fill', 'white');
        text.setAttribute(null, 'font-size', this.size);
        text.setAttribute(null, 'font-family', '"Silkscreen Web", monotype');
        text.textContent = score;
        svg.appendChild(text);

    }
}