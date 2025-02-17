//General app imports
import * as THREE from "three"
const canvas = document.getElementById('three-canvas');

console.log(window.clientHeight);

//App parameters
const cameraFov = 75;
const aspectRatio = innerWidth/innerHeight;
const nearClip = 0.1;
const farClip = 1000;
const backgroundColor = new THREE.Color().setHex(0x2b2641);
let newScrollY = 0;
let scrollPercent = 0;

//ThreeJS setup
const scene = new THREE.Scene();
scene.background = backgroundColor;
const camera = new THREE.PerspectiveCamera(cameraFov,aspectRatio, nearClip, farClip);

//injecting render in HTML
const renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true, canvas
});
renderer.setSize(innerWidth, innerHeight);

//Scene parameters
const cubeX = 1;
const cubeY = 1;
const cubeZ = 1;

//3D objects
const boxGeometry = new THREE.BoxGeometry(cubeX, cubeY, cubeZ);
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FFAA,
    wireframe: true
});
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);

//Scene setup
scene.add(boxMesh);
camera.position.x = 0;
camera.position.z = 0.6;

//Animation function
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    boxMesh.rotation.x = Math.PI * newScrollY;
    camera.position.z = 0.6 + newScrollY*3;
    boxMesh.position.y = -1.2*newScrollY;
    boxMesh.position.x = 0.9*newScrollY
}

animate();

//EVENT: user is sctolling
window.addEventListener("scroll", () => {
    newScrollY = 
    (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight));
    scrollPercent = newScrollY * 100;
    console.log(scrollPercent);
})