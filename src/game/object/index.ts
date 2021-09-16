import { RenderContext } from "../utils/RenderContext";
import { addVec, Vec2 } from "../utils/Vector";

class Object extends Vec2 {

    private vertices: Vec2[];

    constructor(x: number, y: number, vertices: Vec2[]) {
        super(x, y);
        this.vertices = vertices;
    }

    public update(deltaTime: number): void {

    }

    public render({ ctx, camera: { screen } }: RenderContext): void {
        ctx.beginPath();

        const firstVertex = screen(addVec(this, this.vertices[0]));
        ctx.moveTo(firstVertex.x, firstVertex.y);

        for (let i = 1; i < this.vertices.length; i++) {
            const v = screen(addVec(this, this.vertices[i]));
            ctx.lineTo(v.x, v.y);
        }
        ctx.lineTo(firstVertex.x, firstVertex.y);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

}

export default Object;
