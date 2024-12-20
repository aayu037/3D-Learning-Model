function init() {
    const container = document.getElementById('container');
  
  
    // Create a new Scene (initialize scene before anything else)
    scene = new THREE.Scene();
  
  
    // Initialize the texture loader
  const textureLoader = new THREE.TextureLoader();
  
  // Load the background texture (replace 'path_to_image.jpg' with your image path)
  const backgroundTexture = textureLoader.load('images/bhavesh.jpeg');
  
  // Set the background of the scene to the loaded texture
  scene.background = backgroundTexture;
  
  
   
  
    // Set up the Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(1, 2, 5);  // Position the camera further back
  
    // Set up the Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
  
    // Add Lights to the Scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);  // Stronger light
    scene.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
  
    // Load the Tiger 3D Model after GLTFLoader is initialized
    const loader = new THREE.GLTFLoader();  // Ensure loader is initialized before use
    loader.load('models/A_real_Horse.glb', function (gltf) {
      model = gltf.scene;
      model.scale.set(5, 5,5); // Adjust model size
      model.position.set(0,0,0);   // Center the model
      scene.add(model);
  
      // Ensure the camera is looking at the model
      camera.lookAt(model.position);
    });
  
    // Add OrbitControls to allow the user to rotate the model
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
  
    // Handle Window Resize
    window.addEventListener('resize', onWindowResize, false);
  }
  
  // Handle Window Resize
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  //use for Animatio and its button
function animate() {
  requestAnimationFrame(animate);
  if (model && isAnimating) {
    model.rotation.y += 0.01;  // Rotate the 3D model when animation is enabled
  }
  renderer.render(scene, camera);
}

// Track whether the model is animating
let isAnimating = true;

// Function to toggle the animation of the 3D model
function toggleAnimation() {
  isAnimating = !isAnimating; // Toggle the animation state
}

  
  // Play "About Tiger" voice
  function playAbout() {
    const aboutAudio = document.getElementById('aboutAudio');
    aboutAudio.play();
  }
  
  // Play "Roar" sound
  function playRoar() {
    const roarAudio = document.getElementById('roarAudio');
    roarAudio.play();
  }
  
  
  // Initialize and start the animation loop
  init();
  animate();     