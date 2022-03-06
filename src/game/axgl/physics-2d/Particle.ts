import { RenderContext, UpdateContext } from "axgl/utils/context";
import { addVec, devVec, mulVec, Vec2 } from "axgl/utils/vector";
import Force, { ForceManager } from "axgl/utils/force";

export default class Particle extends Vec2 {

    private mass_: number; // kg
    private velocity_: Vec2 = new Vec2(0, 0); // m/s
    protected forces_: ForceManager = new ForceManager();

    constructor(x: number, y: number, mass: number = 1) {
        super(x, y);
        this.mass_ = mass;
    }

    public mass() {
        return this.mass_;
    }

    public velocity() {
        return this.velocity_;
    }

    public push(force: Force): void {
        this.forces_.push(force);
    }

    public update({ deltaTime, gravity }: UpdateContext): void {
        // update forces
        this.forces_.update(deltaTime);
        // get net force in one second
        const netForce = this.forces_.netForce();

        // acceleration = force / mass
        const acceleration = addVec(devVec(netForce, this.mass_), new Vec2(0, gravity));
        // update velocity
        // new velocity = current velocity + (net force / mass) * delta time
        this.velocity_.addVec(mulVec(acceleration, deltaTime));

        // update position
        // new position = current position + new velocity * delta time
        this.addVec(mulVec(this.velocity_, deltaTime));
    }

    public render(context: RenderContext): void {
        const { ctx, camera: { scale, screen }, debug } = context;

        const origin = screen(this);
        // const rotation = toRadians(this.getRotation());
        ctx.translate(origin.x, origin.y);
        // ctx.rotate(rotation);

        // this.shape.render(context);

        // ctx.rotate(-rotation);

        if (debug) {
            // render velocity (m/s)
            const v = mulVec(this.velocity_, scale);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(v.x, v.y);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.stroke();

            // render net forces
            // const nf = mulVec(this.forces_.netForceOf(new Vec2(0, 0)), scale);
            // ctx.beginPath();
            // ctx.moveTo(0, 0);
            // ctx.lineTo(nf.x, nf.y);
            // ctx.strokeStyle = 'rgba(150, 150, 255, 0.5)';
            // ctx.lineWidth = 3;
            // ctx.stroke();

            this.forces_.forOffset(offset => {
                const nf = mulVec(this.forces_.netForceOf(offset), scale);
                if (nf.x === 0 && nf.y === 0) return;
                const o = mulVec(offset, scale);
                ctx.beginPath();
                ctx.moveTo(o.x, o.y);
                ctx.lineTo(o.x + nf.x, o.y + nf.y);
                ctx.strokeStyle = 'rgba(150, 150, 255, 0.5)';
                ctx.lineWidth = 3;
                ctx.stroke();
            });
        }
        ctx.translate(-origin.x, -origin.y);
    }

}
