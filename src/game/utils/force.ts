import { Vec2 } from "utils/vector";

class Force extends Vec2 {

    private time: number;
    private immortal: boolean;
    private offset: Vec2;

    constructor(
        x: number,
        y: number,
        time: number = 0,
        immortal: boolean = false,
        offset: Vec2 = new Vec2(0, 0)
    ) {
        super(x, y);
        this.time = time;
        this.immortal = immortal;
        this.offset = offset;
    }

    public isDead(): boolean {
        return !this.immortal && this.time <= 0;
    }

    public getOffset(): Vec2 {
        return this.offset.clone();
    }

    public update(deltaTime: number): void {
        this.time -= deltaTime;
    }
}

export class ForceManager {
    private offsets: Vec2[] = [];
    private forces: Force[][] = [];

    private indexOf(offset: Vec2): number {
        for (let i = 0; i < this.offsets.length; i++)
            if (this.offsets[i].equals(offset)) return i;
        return -1;
    }

    public push(force: Force): void {
        const offset = force.getOffset();
        const index = this.indexOf(offset);
        if (index >= 0) {
            this.forces[index].push(force);
        } else {
            this.offsets.push(offset);
            this.forces.push([force]);
        }
    }

    public forAll(cb: (force: Force) => void): number {
        let count = 0;
        for (const forces of this.forces) {
            for (const force of forces) {
                cb(force);
                count++;
            }
        }
        return count;
    }

    public for(offset: Vec2, cb: (force: Force) => void): number {
        const index = this.indexOf(offset);
        let count = 0;
        for (const force of this.forces[index]) {
            cb(force);
            count++;
        }
        return count;
    }

    public forOffset(cb: (offset: Vec2) => void): void {
        this.offsets.forEach(cb);
    }

    public netForce(forFunc: (cb: (force: Force) => void) => number = this.forAll.bind(this)): Vec2 {
        const netForce = new Vec2(0, 0);
        let count = forFunc(force => {
            netForce.addVec(force);
        });
        if (count > 1)
            netForce.devVec(count);
        return netForce;
    }

    public netForceOf(offset: Vec2): Vec2 {
        return this.netForce((cb: (force: Force) => void) =>
            this.for(offset, cb));
    }

    public torque(): number {
        let torque = 0;
        let count = this.forAll(force => {
            const { x, y } = force.getOffset();
            if (x !== 0 || y !== 0)
                torque += x * force.y - y * force.x;
        });
        if (count > 1)
            torque /= count;
        return torque;
    }

    public update(deltaTime: number): void {
        for (let i = 0; i < this.forces.length; i++) {
            this.forces[i] = this.forces[i].filter(force => {
                force.update(deltaTime);
                return !force.isDead();
            });
        }
    }
}

export default Force;
