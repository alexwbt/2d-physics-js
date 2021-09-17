import { Vec2 } from "./vector";

export const toRadians = (angle: number): number => angle * Math.PI / 180;

export const square = (value: number): number => Math.pow(value, 2);

export const distanceSquare = (v1: Vec2, v2: Vec2): number =>
    square(v1.x - v2.x) + square(v1.y + v2.y);
