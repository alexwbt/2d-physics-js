import { RenderContext } from "axgl/utils/context";
import Body from "./Body";

export default class Circle extends Body {

    protected radius_: number;

    constructor(x: number, y: number, radius: number = 1, mass: number = NaN) {
        super(x, y, isNaN(mass) ? Math.PI * radius * radius : mass);
        this.radius_ = radius;
    }

    public radius() {
        return this.radius_;
    }

    protected override renderBody(context: RenderContext): void {
        const { ctx, camera: { scale } } = context;

        const radius = this.radius_ * scale;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

}
