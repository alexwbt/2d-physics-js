import Body from "axgl/physics-2d/bodies/Body";
import Circle from "axgl/physics-2d/bodies/Circle";
import { distanceSquare, square } from "axgl/utils/math";

export const isCircleVsCircle = (b1: Body, b2: Body): boolean =>
    b1 instanceof Circle && b2 instanceof Circle;

export const circleVsCircle = (b1: Body, b2: Body): boolean => {
    const s1 = b1 as Circle;
    const s2 = b2 as Circle;

    const collide = distanceSquare(s1, s2) < square(s1.radius() + s2.radius());
    if (!collide) return false;

    const v1 = s1.velocity();
    const v2 = s2.velocity();
    const m1 = s1.mass();
    const m2 = s2.mass();

    const v1mag = v1.mag();
    const v2mag = v2.mag();

    const collisionDir = Math.atan2(s1.y - s2.y, s1.x - s2.x);

    const v1r = Math.atan2(v1.y, v1.x) - collisionDir;
    const v1rx = Math.cos(v1r) * v1mag;
    const v1ry = Math.sin(v1r) * v1mag;

    const v2r = Math.atan2(v2.y, v2.x) - collisionDir;
    const v2rx = Math.cos(v2r) * v2mag;
    const v2ry = Math.sin(v2r) * v2mag;

    const v1frx = ((m1 - m2) * v1rx + (m2 + m2) * v2rx) / (m1 + m2);
    const v1fry = v1ry;
    const v2frx = ((m1 + m1) * v1rx + (m2 - m1) * v2rx) / (m1 + m2);
    const v2fry = v2ry;

    const v1fx = Math.cos(collisionDir) * v1frx + Math.cos(collisionDir + Math.PI / 2) * v1fry;
    const v1fy = Math.sin(collisionDir) * v1frx + Math.sin(collisionDir + Math.PI / 2) * v1fry;
    const v2fx = Math.cos(collisionDir) * v2frx + Math.cos(collisionDir + Math.PI / 2) * v2fry;
    const v2fy = Math.sin(collisionDir) * v2frx + Math.sin(collisionDir + Math.PI / 2) * v2fry;

    // e1.physics.velocity = new Vec2(v1fx, v1fy);
    // e2.physics.velocity = new Vec2(v2fx, v2fy);

    

    return true;
};
