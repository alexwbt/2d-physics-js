import Physics from "physics";
import { IShape } from "shape";
import { RenderContext, UpdateContext } from "utils/context";
import { toRadians } from "utils/Math";
import { Vec2 } from "utils/vector";

class Entity extends Vec2 {

    public shape: IShape;
    public physics: Physics = new Physics();

    // unit in meters
    constructor(x: number, y: number, shape: IShape) {
        super(x, y);
        this.shape = shape;
    }

    public update(context: UpdateContext): void {
        this.physics.update(context);
        this.addVec(this.physics.getVelocity());
    }

    public render(context: RenderContext): void {
        const { ctx, camera: { screen } } = context;

        const origin = screen(this);
        const rotation = toRadians(this.physics.getRotation());
        ctx.translate(origin.x, origin.y);
        ctx.rotate(rotation);

        this.shape.render(context);

        ctx.translate(-origin.x, -origin.y);
        ctx.rotate(-rotation);
    }

}

export default Entity;
