import Camera from "../camera";

export type UpdateContext = {
    timeScale: number;
    deltaTime: number;
    gravity: number;
};

export type RenderContext = {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    camera: Camera;
    debug: boolean;
};
