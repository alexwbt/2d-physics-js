import Entity from "entity";
import { Circle, IShape } from "shape";
import { distanceSquare, square } from "utils/Math";
import { mulVec, Vec2 } from "utils/vector";
import { CollisionResult } from "./types";

export const isCircleVsCircle = (s1: IShape, s2: IShape): boolean =>
    s1 instanceof Circle && s2 instanceof Circle;

export const circleVsCircle = (e1: Entity, e2: Entity): CollisionResult => {
    const s1 = e1.shape as Circle;
    const s2 = e2.shape as Circle;

    const collide = distanceSquare(e1, e2) < square(s1.radius + s2.radius);

    const v1 = e1.physics.getVelocity();
    const v2 = e2.physics.getVelocity();
    const v1mag = v1.mag();
    const v2mag = v2.mag();
    const m1 = e1.physics.getMass();
    const m2 = e2.physics.getMass();

    const collisionR = Math.atan2(e1.x - e2.x, e1.y - e2.y);
    const v1r = Math.atan2(v1.x, v1.y) + collisionR;
    const v2r = Math.atan2(v2.x, v2.y) + collisionR;

    const v1rx = Math.sin(v1r) * v1mag;
    const v1ry = Math.cos(v1r) * v1mag;

    const v2rx = Math.sin(v2r) * v2mag;
    const v2ry = Math.cos(v2r) * v2mag;

    const push2 = new Vec2(((m1 - m2) * v1rx + (m2 + m2) * v2rx) / (m1 + m2), v1ry);
    const push1 = new Vec2(((m1 + m1) * v1rx + (m2 - m1) * v2rx) / (m1 + m2), v2ry);

    return { collide, push1, push2 };
};
