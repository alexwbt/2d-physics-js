import Body from "axgl/physics-2d/bodies/Body";
import { circleVsCircle, isCircleVsCircle } from "./circle";
import { CheckShapeFunction, CollisionFunction } from "./types";

const collisionFunctions: Map<CheckShapeFunction, CollisionFunction> = new Map();
collisionFunctions.set(isCircleVsCircle, circleVsCircle);

export const collide = (b1: Body, b2: Body): boolean => {
    for (const [isShape, collide] of collisionFunctions.entries())
        if (isShape(b1, b2))
            return collide(b1, b2);
    return false;
};
