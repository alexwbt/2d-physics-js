import Entity from "entity";
import { IShape } from "shape";
import { Vec2 } from "utils/vector";

export type CollisionFunction = (e1: Entity, e2: Entity) => CollisionResult;
export type CheckShapeFunction = (s1: IShape, s2: IShape) => boolean;
export type CollisionResult = { collide: boolean, push1: Vec2, push2: Vec2 };
