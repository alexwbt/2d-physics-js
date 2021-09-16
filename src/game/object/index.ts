import { RenderContext, UpdateContext } from "../utils/Context";
import { addVec, mulVec, Vec2 } from "../utils/Vector";

class Object extends Vec2 {

    private vertices: Vec2[];

    private mass: number = 1;
    private forces: Vec2[] = [];
    private rotation: number = 0;
    private angularVelocity: number = 0;
    private velocity: Vec2 = new Vec2(0, 0);

    constructor(x: number, y: number, vertices: Vec2[]) {
        super(x, y);
        this.vertices = vertices;
    }

    public push(force: Vec2): void {
        this.forces.push(force);
    }

    private getNetForce(): Vec2 {
        let count = 0;
        const output = new Vec2(0, 0);
        for (const force of this.forces) {
            output.addVec(force);
            count++;
        }
        output.devVec(count);
        return output;
    }

    public update({ deltaTime, gravity }: UpdateContext): void {
        const netForce = this.forces.length > 0 ? this.getNetForce() : new Vec2(0, 0);
        const acceleration = mulVec(addVec(netForce, new Vec2(0, gravity)), deltaTime / this.mass);
        this.velocity.addVec(acceleration);
        this.addVec(this.velocity);
        this.forces = [];
    }

    public render({ ctx, camera: { scale, screen } }: RenderContext): void {
        ctx.beginPath();

        const origin = screen(this);
        const rotation = this.rotation * Math.PI / 180;
        ctx.translate(origin.x, origin.y);
        ctx.rotate(rotation);

        const firstVertex = mulVec(this.vertices[0], scale);
        ctx.moveTo(firstVertex.x, firstVertex.y);

        for (let i = 1; i < this.vertices.length; i++) {
            const v = mulVec(this.vertices[i], scale);
            ctx.lineTo(v.x, v.y);
        }
        ctx.lineTo(firstVertex.x, firstVertex.y);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.translate(-origin.x, -origin.y);
        ctx.rotate(-rotation);
    }

}

export default Object;
