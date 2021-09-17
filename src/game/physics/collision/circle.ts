import Entity from "entity";
import { Circle, IShape } from "shape";
import { distanceSquare, square } from "utils/Math";
import { Vec2 } from "utils/vector";
import { CollisionResult } from "./types";

export const isCircleVsCircle = (s1: IShape, s2: IShape): boolean =>
    s1 instanceof Circle && s2 instanceof Circle;

export const circleVsCircle = (e1: Entity, e2: Entity): CollisionResult => {
    const s1 = e1.shape as Circle;
    const s2 = e2.shape as Circle;
    return {
        collide: distanceSquare(e1, e2) < square(s1.radius + s2.radius),
        push1: new Vec2(0, 0),
        push2: new Vec2(0, 0)
    };
};
