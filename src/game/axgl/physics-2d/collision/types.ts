import Body from "axgl/physics-2d/bodies/Body";

export type CollisionFunction = (b1: Body, b2: Body) => boolean;
export type CheckShapeFunction = (b1: Body, b2: Body) => boolean;
