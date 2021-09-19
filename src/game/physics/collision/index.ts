import Entity from "entity";
import { Vec2 } from "utils/vector";
import { circleVsCircle, isCircleVsCircle } from "./circle";
import { CheckShapeFunction, CollisionFunction } from "./types";

const collisionFunctions: Map<CheckShapeFunction, CollisionFunction> = new Map();
collisionFunctions.set(isCircleVsCircle, circleVsCircle);

export const collide = (e1: Entity, e2: Entity): boolean => {
    for (const [isShape, collide] of collisionFunctions.entries()) {
        if (isShape(e1.shape, e2.shape))
            return collide(e1, e2);
    }
    return false;
};
