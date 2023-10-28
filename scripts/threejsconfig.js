// Scene setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha (transparency)

// Ensure the renderer's background is transparent for proper display
renderer.setClearColor( 0x000000, 0 ); // the default is black

// Get the container in the HTML
var container = document.getElementById('threejs-container');
renderer.setSize(container.offsetWidth, container.offsetHeight); // set renderer size
container.appendChild(renderer.domElement);

// Create a cube
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // basic green color
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Camera position
camera.position.z = 5;

// Render loop
var animate = function () {
    requestAnimationFrame(animate);

    // Rotating the cube for some basic animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();
