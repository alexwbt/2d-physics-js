import { collide } from "axgl/physics-2d/collision";
import Particle from "axgl/physics-2d/Particle";
import { forEachUniquePair } from "axgl/utils/array";
import { RenderContext } from "axgl/utils/context";

class Space {

    // private gravity: number = 9.81; // ms^-2
    private gravity: number = 0;

    private particles: Particle[] = [];

    public spawn(particle: Particle) {
        this.particles.push(particle);
    }

    public update(deltaTime: number): void {
        for (const particle of this.particles)
            particle.update({ deltaTime, gravity: this.gravity });

        forEachUniquePair(this.particles, collide);
    }

    public render(context: RenderContext): void {
        const { canvas, ctx } = context;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const particle of this.particles)
            particle.render(context);
    }

}

export default Space;
