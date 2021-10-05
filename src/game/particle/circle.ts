import { RenderContext } from "utils/context";
import Body from "./body";

class Circle extends Body {

    protected radius: number;

    constructor(x: number, y: number, radius: number = 1, mass: number = 0) {
        super(x, y, mass <= 0 ? Math.PI * radius * radius : mass);
        this.radius = radius;
    }

    protected override renderBody(context: RenderContext): void {
        const { ctx, camera: { scale } } = context;

        const radius = this.radius * scale;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

}

export default Circle;
