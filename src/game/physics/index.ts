import { UpdateContext } from "utils/context";
import { addVec, devVec, mulVec, Vec2 } from "utils/vector";
import Force from "./force";

class Physics {

    public mass: number = 1; // kg
    public velocity: Vec2 = new Vec2(0, 0); // m/s
    private forces: Force[] = [];
    private rotation: number = 0;
    private netForce: Vec2 = new Vec2(0, 0); // newton (kg/ms^2)

    public push(force: Force): void {
        this.forces.push(force);
    }

    public getRotation(): number {
        return this.rotation;
    }

    public getVelocity(): Vec2 {
        return this.velocity.clone();
    }

    public getNetForce(): Vec2 {
         return this.netForce;
    }

    public update({ deltaTime, gravity }: UpdateContext): void {
        // update net force
        const netForceInDeltaTime = new Vec2(0, 0);
        this.netForce = new Vec2(0, 0);
        if (this.forces.length > 0) {
            let count = 0;
            for (const force of this.forces) {
                netForceInDeltaTime.addVec(mulVec(force, deltaTime));
                this.netForce.addVec(force);
                count++;
            }
            netForceInDeltaTime.devVec(count);
            this.netForce.devVec(count);

            this.forces = this.forces.filter(force => {
                force.time -= deltaTime;
                return force.isImmortal || force.time > 0;
            });
        }

        // update velocity in m/s
        const acceleration = addVec(devVec(netForceInDeltaTime, this.mass), new Vec2(0, gravity));
        this.velocity.addVec(acceleration);
    }

}

export default Physics;
