import Camera from "./camera";
import Object from "./object";
import { circle } from "./object/shape";
import { RenderContext } from "./utils/RenderContext";

class Space {

    private objects: Object[] = [];

    constructor() {
        this.objects.push(new Object(0, 0, circle(10, 8)));
    }

    public update(deltaTime: number): void {
        
    }

    public render({ canvas, ctx, camera }: RenderContext): void {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const object of this.objects)
            object.render({ canvas, ctx, camera });
    }

}

export default Space;
