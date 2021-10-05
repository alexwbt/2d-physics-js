import Circle from "particle/circle";
import Rectangle from "particle/rectangle";
import "styles/index.scss";
import Force from "utils/force";
import { Vec2 } from "utils/vector";
import Camera from "./camera";
import Space from "./space";

const debug = true;

const camera = new Camera(0, 0, 0, 0);
camera.scale = 40;

window.addEventListener('wheel', e => {
    const dir = e.deltaY / Math.abs(e.deltaY);
    camera.scale = Math.max(camera.scale - dir, 1);
});

const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const instance = new Space();

const p1 = new Circle(5, 0);
// p1.push(new Force(0, 9.81, 0, true));
instance.spawn(p1);

const p2 = new Rectangle(0, 0, 2, 2);
p2.push(new Force(2, 2, 0.5));
p2.push(new Force(4, 0, 0.5, false, new Vec2(0, 1)));
instance.spawn(p2);

let startTime = Date.now();
const render = () => {
    const now = Date.now();
    const deltaTime = (now - startTime) / 1000; // delta time in seconds

    camera.width = canvas.width = window.innerWidth;
    camera.height = canvas.height = window.innerHeight;

    const timeScale = 1;
    instance.update(deltaTime * timeScale);
    instance.render({ canvas, ctx, camera, debug });

    startTime = now;
    window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
