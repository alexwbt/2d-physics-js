import Physics from "physics";
import { IShape } from "shape";
import { RenderContext, UpdateContext } from "utils/context";
import { toRadians } from "utils/Math";
import { mulVec, Vec2 } from "utils/vector";

class Entity extends Vec2 {

    public shape: IShape;
    public physics: Physics = new Physics();

    // unit in meters
    constructor(x: number, y: number, shape: IShape) {
        super(x, y);
        this.shape = shape;
    }

    public update(context: UpdateContext): void {
        const { deltaTime } = context;
        this.physics.update(context);
        this.addVec(mulVec(this.physics.getVelocity(), deltaTime));
    }

    public render(context: RenderContext): void {
        const { ctx, camera: { scale, screen }, debug } = context;

        const origin = screen(this);
        const rotation = toRadians(this.physics.getRotation());
        ctx.translate(origin.x, origin.y);
        ctx.rotate(rotation);

        this.shape.render(context);

        ctx.rotate(-rotation);

        if (debug) {
            // render velocity (m/s)
            const v = mulVec(this.physics.getVelocity(), scale);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(v.x, v.y);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // render net force (newton) (kg*ms^-2)
            const nf = mulVec(this.physics.getNetForce(), scale);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(nf.x, nf.y);
            ctx.strokeStyle = 'rgba(150, 150, 255, 0.5)';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        ctx.translate(-origin.x, -origin.y);
    }

}

export default Entity;
