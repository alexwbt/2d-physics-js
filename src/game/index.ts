import '../styles/index.scss';
import Space from './space';
import Camera from './camera';

const instance = new Space();
const camera = new Camera(0, 0, 0, 0);

window.addEventListener('wheel', e => {
    const dir = e.deltaY / Math.abs(e.deltaY);
    camera.scale = Math.max(camera.scale + dir, 1);
});

const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let startTime = Date.now();
const render = () => {
    const now = Date.now();
    const deltaTime = (now - startTime) / 1000; // delta time in seconds

    camera.width = canvas.width = window.innerWidth;
    camera.height = canvas.height = window.innerHeight;

    instance.update(deltaTime);
    instance.render({ canvas, ctx, camera });

    startTime = now;
    window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
