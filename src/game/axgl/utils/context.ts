import Camera from "../camera";

export type UpdateContext = {
    deltaTime: number;
    gravity: number;
};

export type RenderContext = {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    camera: Camera;
    debug: boolean;
};
