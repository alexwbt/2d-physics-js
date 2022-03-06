import Particle from "axgl/physics-2d/Particle";
import { RenderContext, UpdateContext } from "axgl/utils/context";

export default abstract class Body extends Particle {

    private rotation: number = 0; // radians
    private momentOfInertia: number = 0;
    private angularVelocity: number = 0;

    constructor(x: number, y: number, mass: number = 1) {
        super(x, y, mass);
        this.momentOfInertia = mass;
    }

    public override update(context: UpdateContext): void {
        super.update(context);

        const { deltaTime } = context;
        const torque = this.forces_.torque();

        // angular acceleration = torque / moment of inertia
        // (analogous to acceleration = force / mass)
        const angularAcceleration = torque / this.momentOfInertia;
        // update angular velocity
        this.angularVelocity += angularAcceleration * deltaTime;

        // update rotation
        this.rotation += this.angularVelocity * deltaTime;
    }

    public override render(context: RenderContext): void {
        const { ctx, camera: { screen } } = context;

        const origin = screen(this);
        const rotation = this.rotation;

        ctx.translate(origin.x, origin.y);
        ctx.rotate(rotation);

        this.renderBody(context);

        ctx.rotate(-rotation);
        ctx.translate(-origin.x, -origin.y);

        super.render(context);
    }

    protected abstract renderBody(context: RenderContext): void;

}
