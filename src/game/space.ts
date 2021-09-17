import Entity from "./entity";
import Force from "./physics/force";
import { Circle } from "./shape";
import { RenderContext } from "./utils/context";

class Space {

    private gravity: number = 9.81; // ms^-2
    // private gravity: number = 0;

    private entities: Entity[] = [];

    constructor() {
        const obj1 = new Entity(0, 0, new Circle(1));
        obj1.physics.push(new Force(0, -9.81, 0.02));
        this.entities.push(obj1);

        const obj2 = new Entity(0, 3, new Circle(1));
        obj2.physics.push(new Force(0, -9.81, 0, true));
        this.entities.push(obj2);
    }

    public update(deltaTime: number): void {
        for (const entity of this.entities) {
            entity.update({ deltaTime, gravity: this.gravity });
        }
    }

    public render(context: RenderContext): void {
        const { canvas, ctx } = context;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const entity of this.entities)
            entity.render(context);
    }

}

export default Space;
