import * as THREE from 'https://cdn.skypack.dev/three'

let camera, scene, renderer;
let geometry, material, mesh;

let multiplier = 1000;

let speedCycle = true;

init();

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.DodecahedronGeometry(0.3, getRandomArbitrary(0, 5));
    material = new THREE.MeshNormalMaterial({flatShading: true});

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);
}

function animation(time) {
    if (speedCycle) {
        multiplier = multiplier - 0.2;
    } else {
        multiplier = multiplier + 0.2;
    }
    if (multiplier == 500) {
        speedCycle = false;
    }
    if (multiplier == 1000) {
        speedCycle = true;
    }
   
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / multiplier;

    renderer.render(scene, camera);
}
