import { Rect, IVec2 } from "./utils/Vector";

class Camera extends Rect {
    public scale = 5;

    public screen = (pos: IVec2): IVec2 => {
        return {
            x: pos.x * this.scale + this.width / 2,
            y: pos.y * this.scale + this.height / 2
        };
    };
}

export default Camera;
