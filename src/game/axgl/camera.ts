import { IVec2, Rect } from "axgl/utils/vector";

export default class Camera extends Rect {
    public scale = 1;

    public screen = (pos: IVec2): IVec2 => {
        return {
            x: (pos.x - this.x) * this.scale + this.width / 2,
            y: (pos.y - this.y) * this.scale + this.height / 2
        };
    };
}
