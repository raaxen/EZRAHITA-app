import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('canvas');
const iw = window.innerWidth;
const ih = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, iw / ih);
camera.position.set(0, 0, 7);
camera.lookAt(0, 0, 0);

const light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(0, 0, 7);
scene.add(light);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff88 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(iw, ih);                          
renderer.setPixelRatio(window.devicePixelRatio);   

function loop() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

loop();