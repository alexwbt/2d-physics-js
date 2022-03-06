import { RenderContext } from "axgl/utils/context";
import Body from "./Body";

export default class Rectangle extends Body {

    private width: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number, mass: number = NaN) {
        super(x, y, isNaN(mass) ? width * height : mass);
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
