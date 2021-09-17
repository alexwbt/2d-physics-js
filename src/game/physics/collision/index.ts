import Entity from "entity";
import { Vec2 } from "utils/vector";
import { circleVsCircle, isCircleVsCircle } from "./circle";
import { CheckShapeFunction, CollisionFunction, CollisionResult } from "./types";

const collisionFunctions: Map<CheckShapeFunction, CollisionFunction> = new Map();
collisionFunctions.set(isCircleVsCircle, circleVsCircle);

export const collide = (e1: Entity, e2: Entity): CollisionResult => {
    for (const [isShape, collide] of collisionFunctions.entries()) {
        if (isShape(e1.shape, e2.shape))
            return collide(e1, e2);
    }
    return {
        collide: false,
        push1: new Vec2(0, 0),
        push2: new Vec2(0, 0)
    };
};
