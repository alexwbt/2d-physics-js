import { IVec2, Rect } from "utils/vector";

class Camera extends Rect {
    public scale = 1;

    public screen = (pos: IVec2): IVec2 => {
        return {
            x: pos.x * this.scale + this.width / 2,
            y: pos.y * this.scale + this.height / 2
        };
    };
}

export default Camera;
