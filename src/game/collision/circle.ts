// import Entity from "entity";
// import { Circle, IShape } from "shape";
// import { distanceSquare, square } from "utils/Math";
// import { mulVec, Vec2 } from "utils/vector";

// export const isCircleVsCircle = (s1: IShape, s2: IShape): boolean =>
//     s1 instanceof Circle && s2 instanceof Circle;

// export const circleVsCircle = (e1: Entity, e2: Entity): boolean => {
//     const s1 = e1.shape as Circle;
//     const s2 = e2.shape as Circle;

//     const collide = distanceSquare(e1, e2) < square(s1.radius + s2.radius);
//     if (!collide) return false;

//     const v1 = e1.physics.getVelocity();
//     const v2 = e2.physics.getVelocity();
//     const m1 = e1.physics.mass;
//     const m2 = e2.physics.mass;

//     const v1mag = v1.mag();
//     const v2mag = v2.mag();

//     const collisionDir = Math.atan2(e1.y - e2.y, e1.x - e2.x);

//     const v1r = Math.atan2(v1.y, v1.x) - collisionDir;
//     const v1rx = Math.cos(v1r) * v1mag;
//     const v1ry = Math.sin(v1r) * v1mag;

//     const v2r = Math.atan2(v2.y, v2.x) - collisionDir;
//     const v2rx = Math.cos(v2r) * v2mag;
//     const v2ry = Math.sin(v2r) * v2mag;

//     const v1frx = ((m1 - m2) * v1rx + (m2 + m2) * v2rx) / (m1 + m2);
//     const v1fry = v1ry;
//     const v2frx = ((m1 + m1) * v1rx + (m2 - m1) * v2rx) / (m1 + m2);
//     const v2fry = v2ry;

//     const v1fx = Math.cos(collisionDir) * v1frx + Math.cos(collisionDir + Math.PI / 2) * v1fry;
//     const v1fy = Math.sin(collisionDir) * v1frx + Math.sin(collisionDir + Math.PI / 2) * v1fry;
//     const v2fx = Math.cos(collisionDir) * v2frx + Math.cos(collisionDir + Math.PI / 2) * v2fry;
//     const v2fy = Math.sin(collisionDir) * v2frx + Math.sin(collisionDir + Math.PI / 2) * v2fry;

//     e1.physics.velocity = new Vec2(v1fx, v1fy);
//     e2.physics.velocity = new Vec2(v2fx, v2fy);

//     return true;
// };
