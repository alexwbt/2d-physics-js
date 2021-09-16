import './styles/index.scss';
import Space from './game/space';
import Camera from './game/camera';

const instance = new Space();
const camera = new Camera(0, 0, 0, 0);

const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let startTime = Date.now();
const render = () => {
    const now = Date.now();
    const deltaTime = now - startTime;

    camera.width = canvas.width = window.innerWidth;
    camera.height = canvas.height = window.innerHeight;

    instance.update(deltaTime);
    instance.render({ canvas, ctx, camera });

    startTime = now;
    window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
