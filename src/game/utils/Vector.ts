
export interface IVec2 {
    x: number;
    y: number;
}

export class Vec2 implements IVec2 {
    public x: number = 0;
    public y: number = 0;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public addVec(vec: IVec2): void {
        this.x += vec.x;
        this.y += vec.y;
    }
    public mulVec(val: number): void {
        this.x *= val;
        this.y *= val;
    }
    public devVec(val: number): void {
        this.x /= val;
        this.y /= val;
    }
}

export const addVec = (v1: IVec2, v2: IVec2): Vec2 =>
    new Vec2(v1.x + v2.x, v1.y + v2.y);

export const mulVec = (v1: IVec2, value: number): Vec2 =>
    new Vec2(v1.x * value, v1.y * value);

export const devVec = (v1: IVec2, value: number): Vec2 =>
    new Vec2(v1.x / value, v1.y / value);

export interface IRect extends IVec2 {
    width: number;
    height: number;
}

export class Rect extends Vec2 {
    public width: number = 0;
    public height: number = 0;
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y);
        this.width = width;
        this.height = height;
    }
}
