import Camera from "../camera";
import { IVec2 } from "./Vector";

export type RenderContext = {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    camera: Camera;
};
