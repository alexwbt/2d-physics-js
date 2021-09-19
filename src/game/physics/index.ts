import { UpdateContext } from "utils/context";
import { addVec, devVec, mulVec, Vec2 } from "utils/vector";
import Force from "./force";

class Physics {

    private mass: number = 1;
    private forces: Force[] = [];
    private rotation: number = 0;
    private velocity: Vec2 = new Vec2(0, 0); // m/s

    private netForce: Vec2 = new Vec2(0, 0);

    public push(force: Force): void {
        this.forces.push(force);
    }

    public getRotation(): number {
        return this.rotation;
    }

    public getVelocity(): Vec2 {
        return this.velocity.clone();
    }

    public getMass(): number {
        return this.mass;
    }

    public update({ deltaTime, gravity }: UpdateContext): void {
        // update net force
        this.netForce = new Vec2(0, 0);
        if (this.forces.length > 0) {
            let count = 0;
            for (const force of this.forces) {
                this.netForce.addVec(mulVec(force, deltaTime));
                count++;
            }
            this.netForce.devVec(count);

            this.forces = this.forces.filter(force => {
                force.time -= deltaTime;
                return force.isImmortal || force.time > 0;
            });
        }

        // update velocity in m/s
        const acceleration = mulVec(addVec(this.netForce, new Vec2(0, gravity)), this.mass);
        this.velocity.addVec(acceleration);
    }

}

export default Physics;
