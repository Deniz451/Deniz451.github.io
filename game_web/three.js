// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Load 3D model
const loader = new THREE.GLTFLoader();
loader.load('untitled.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});

camera.position.z = 5;

// Initialize CSS3DRenderer
const cssRenderer = new THREE.CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
cssRenderer.domElement.style.pointerEvents = 'none'; // Let CSS3D objects pass events to WebGL renderer
document.body.appendChild(cssRenderer.domElement);

// Create CSS3DObject for interactive screen
const interactiveScreen = document.getElementById('interactive-screen');
const cssObject = new THREE.CSS3DObject(interactiveScreen);
cssObject.position.set(0, 1, 0); // Adjust position to match the screen on the model
cssObject.scale.set(0.01, 0.01, 0.01); // Adjust scale to match the model's scale
scene.add(cssObject);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera);
}
animate();