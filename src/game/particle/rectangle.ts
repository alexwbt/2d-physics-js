import { RenderContext } from "utils/context";
import Body from "./body";

class Rectangle extends Body {

    private width: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number, mass: number = 0) {
        super(x, y, mass <= 0 ? width * height : mass);
        this.width = width;
        this.height = height;
    }

    protected override renderBody(context: RenderContext): void {
        const { ctx, camera: { scale } } = context;

        const width = this.width * scale;
        const height = this.height * scale;
        ctx.beginPath();
        ctx.rect(-width / 2, -height / 2, width, height);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

}

export default Rectangle;
