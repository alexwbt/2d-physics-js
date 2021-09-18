import Entity from "entity";
import { collide } from "physics/collision";
import Force from "physics/force";
import { forEachUniquePair } from "utils/array";
import { RenderContext } from "utils/context";
import { Circle } from "./shape";

class Space {

    // private gravity: number = 9.81; // ms^-2
    private gravity: number = 0;

    private entities: Entity[] = [];

    constructor() {
        const obj1 = new Entity(-5, 0, new Circle(1));
        // obj1.physics.push(new Force(0, -9.81, 0.02));
        obj1.physics.push(new Force(0.1, 0, 0.5));
        this.entities.push(obj1);

        const obj2 = new Entity(5, 0, new Circle(1));
        // obj2.physics.push(new Force(0, -9.81, 0, true));
        this.entities.push(obj2);
    }

    public update(deltaTime: number, timeScale: number): void {
        for (const entity of this.entities)
            entity.update({ deltaTime, timeScale, gravity: this.gravity });

        forEachUniquePair(this.entities, (e1, e2) => {
            const { collide: c, push1: p1, push2: p2 } = collide(e1, e2);
            if (c) {
                e1.physics.push(new Force(p1.x, p1.y));
                e2.physics.push(new Force(p2.x, p2.y));
            }
        });
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
