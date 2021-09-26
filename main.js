import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x99c1ff );
scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(8);
camera.position.setX(16);
camera.position.setY(4);

renderer.render(scene, camera);

// scene

// const roughnessMipmapper = new RoughnessMipmapper(renderer);

const loader = new GLTFLoader();
loader.load('models/final.glb', function (glb) {

    const root = glb.scene;
    root.scale.set(1.8,1.8,1.8)
    scene.add(root);
    root.traverse( function ( node ) {

        if ( node.isMesh || node.isLight ) node.castShadow = true;
        if ( node.isMesh || node.isLight ) node.receiveShadow = true;

    } );

}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100)+"% Loaded")
}, function(error){
    console.log('An error occured')
});



// Lights

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(12, 12, 12);
pointLight.castShadow = true;
pointLight.shadow.bias = -0.001

const pointLightTwo = new THREE.PointLight(0xffffff, 1);
pointLightTwo.position.set(12, 12 , -12);
pointLightTwo.castShadow = true;
pointLightTwo.shadow.bias = -0.001

const ambientLight = new THREE.AmbientLight(0xfeff9e, 1);

scene.add(pointLight,pointLightTwo,ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const lightHelperTwo = new THREE.PointLightHelper(pointLightTwo)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)
// scene.add(lightHelper, lightHelperTwo)

const controls = new OrbitControls(camera, renderer.domElement);




// Animation Loop

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();

