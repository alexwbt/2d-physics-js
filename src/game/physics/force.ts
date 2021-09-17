import { Vec2 } from "utils/vector";

class Force extends Vec2 {
    public time: number = 0;
    private immortal: boolean = false;
    constructor(x: number, y: number, time: number = 0, immortal: boolean = false) {
        super(x, y);
        this.time = time;
        this.immortal = immortal;
    }
    get isImmortal(): boolean {
        return this.immortal;
    }
}

export default Force;
