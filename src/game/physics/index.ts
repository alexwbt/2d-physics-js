import { UpdateContext } from "utils/context";
import { addVec, mulVec, Vec2 } from "utils/vector";
import Force from "./force";

class Physics {

    private mass: number = 1;
    private forces: Force[] = [];
    private rotation: number = 0;
    private angularVelocity: number = 0;
    private velocity: Vec2 = new Vec2(0, 0);

    public push(force: Force): void {
        this.forces.push(force);
    }

    public getRotation(): number {
        return this.rotation;
    }

    public getVelocity(): Vec2 {
        return this.velocity;
    }

    private getNetForce(): Vec2 {
        const output = new Vec2(0, 0);
        if (!this.forces.length)
            return output;
        let count = 0;
        for (const force of this.forces) {
            output.addVec(force);
            count++;
        }
        output.devVec(count);
        return output;
    }

    private getAcceleration(deltaTime: number, gravity: number = 0): Vec2 {
        return mulVec(addVec(this.getNetForce(), new Vec2(0, gravity)), deltaTime / this.mass);
    }

    public update({ deltaTime, gravity }: UpdateContext): void {
        this.velocity.addVec(this.getAcceleration(deltaTime, gravity));

        this.forces = this.forces.filter(force => {
            force.time -= deltaTime;
            return force.isImmortal || force.time > 0;
        });
    }

}

export default Physics;
