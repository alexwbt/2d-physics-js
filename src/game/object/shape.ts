import { Vec2 } from "../utils/Vector";

export const circle = (radius: number, vertices: number): Vec2[] => {
    const output: Vec2[] = [];
    for (let i = 0; i < vertices; i++) {
        const radians = 2 * Math.PI * (i / vertices);
        output.push(new Vec2(
            radius * Math.sin(radians),
            radius * Math.cos(radians)
        ));
    }
    return output;
};
