import Entity from "../entity";
import { Circle, IShape } from "../shape";
import { distanceSquare, square } from "../utils/Math";
import { Vec2 } from "../utils/vector";

export type CollisionFunction = (e1: Entity, e2: Entity) => CollisionResult;
export type CheckShapeFunction = (s1: IShape, s2: IShape) => boolean;
export type CollisionResult = { collide: boolean, push1: Vec2, push2: Vec2 };

const collisionFunctions: Map<CheckShapeFunction, CollisionFunction> = new Map();

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

/* circle vs circle */

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
collisionFunctions.set(isCircleVsCircle, circleVsCircle);
