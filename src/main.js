//General app imports
import * as THREE from "three"
const canvas = document.getElementById('three-canvas');

console.log(window.clientHeight);

//App parameters
const cameraFov = 75;
const aspectRatio = innerWidth/innerHeight;
const nearClip = 0.1;
const farClip = 1000;
const viewSizeVec = new THREE.Vector2();
const backgroundColor = new THREE.Color().setHex(0x2b2641);
const animations = [];
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

//add all the animations
animations.push({
    start: -1,
    end: 33,
    func: () => {
        boxMesh.rotation.x =  0.5 * Math.PI * (scrollPercent/100)*3;
        camera.position.z = 0.6 + 4 * (scrollPercent/100)*3;
        //boxMesh.position.y = 0;
        //boxMesh.position.x = 2.7*newScrollY
        const viewSize = camera.getViewSize(camera.position.z, viewSizeVec);
        boxMesh.position.x = (viewSizeVec.x / 4)*(scrollPercent/100)*3;
        boxMesh.position.y = - (viewSizeVec.y / 4)*(scrollPercent/100)*3;
    }
})

function evaluateAnimation(){
    animations.forEach(el => {
        if( scrollPercent > el.start && scrollPercent < el.end) {
            el.func();
        }
    })
}

function updateBoxPosition() {
    // Calculate the distance from the camera to the box's plane (assuming box.z = 0)
    const d = camera.position.z;
    
    // Convert the camera's FOV from degrees to radians
    const vFOV = THREE.MathUtils.degToRad(camera.fov);
    
    // Compute the view height and width at distance 'd'
    const viewHeight = 2 * d * Math.tan(vFOV / 2);
    const viewWidth = viewHeight * camera.aspect;
    
    // Position the box in the center of the bottom-right quadrant
    boxMesh.position.x = viewWidth / 4;
    boxMesh.position.y = -viewHeight / 4;
  }

//Animation function
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    evaluateAnimation();
}

animate();

//EVENT: user is sctolling
window.addEventListener("scroll", () => {
    newScrollY = 
    (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight));
    scrollPercent = newScrollY * 100;
    console.log(scrollPercent);
})

//Resize the threejs canvas if the window size changes
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render();
}