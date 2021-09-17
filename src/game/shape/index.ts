import { RenderContext } from "utils/context";
import { mulVec, Vec2 } from "utils/vector";

export interface IShape {
    render: (context: RenderContext) => void;
}

export class Circle implements IShape {
    public radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    public render({ ctx, camera: { scale } }: RenderContext): void {
        const radius = this.radius * scale;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

export class Polygon implements IShape {
    public vertices: Vec2[];

    constructor(vertices: Vec2[]) {
        this.vertices = vertices;
    }

    public render({ ctx, camera: { scale } }: RenderContext): void {
        ctx.beginPath();

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
    }

    static circle(radius: number, vertices: number): Vec2[] {
        const output: Vec2[] = [];
        for (let i = 0; i < vertices; i++) {
            const radians = 2 * Math.PI * (i / vertices);
            output.push(new Vec2(
                radius * Math.sin(radians),
                radius * Math.cos(radians)
            ));
        }
        return output;
    }
}
