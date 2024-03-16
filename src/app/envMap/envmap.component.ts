import { Component , AfterViewInit,ElementRef , Input , OnInit ,ViewChild } from '@angular/core';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

@Component({
  selector: 'app-landing',
  templateUrl: './envmap.component.html',
  styleUrls: ['../../styles.scss'],
})
export class EnvmapComponent implements OnInit {
  constructor() {}


  ngOnInit(): void {
    this.createThreeJsBox();
  }


  createThreeJsBox(): void {

    const canvas = document.getElementById('canvas');

    const scene = new THREE.Scene();
    const updateAllMaterials = () =>
    {
        scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.envMapIntensity = 1
                child.material.needsUpdate = true
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }



/**
 * Loaders
*/
const textureLoader = new THREE.TextureLoader()
    const gltfLoader = new GLTFLoader()
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    let environmentMap = cubeTextureLoader.load([
      'assets/px1.png',
      'assets/nx1.png',
      'assets/py1.png',
      'assets/ny1.png',
      'assets/pz1.png',
      'assets/nz1.png'
    ])
    let environmentMap2 = cubeTextureLoader.load([
      'assets/px.jpg',
      'assets/nx.jpg',
      'assets/py.jpg',
      'assets/ny.jpg',
      'assets/pz.jpg',
      'assets/nz.jpg'
    ])
    environmentMap2.encoding = THREE.sRGBEncoding
    environmentMap.encoding = THREE.sRGBEncoding
    scene.background = environmentMap
    scene.environment = environmentMap
    // Textures
    const mapTexture = textureLoader.load('assets/color.jpg')
    mapTexture.encoding = THREE.sRGBEncoding
    const normalTexture = textureLoader.load('assets/normal.jpg')
    // Material
    const material = new THREE.MeshStandardMaterial( {
    map: mapTexture,
    normalMap: normalTexture
})
    const customUniforms = {
    uTime:{ value: 0}
}
    const depthMaterial = new THREE.MeshDepthMaterial({
      depthPacking: THREE.RGBADepthPacking
    })
    material.onBeforeCompile = (shader) =>
{
    shader.uniforms['uTime'] = customUniforms.uTime
    shader.vertexShader = shader.vertexShader.replace('#include <common>',
    `
    #include <common>
    uniform float uTime ;
    mat2 get2dRotateMatrix(float _angle)
    {
        return mat2(cos(_angle), - sin(_angle),sin(_angle), cos (_angle));
    }`)
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>',
    `
    #include <begin_vertex>
    float angle = (position.y + uTime) * 0.2;
    mat2 rotateMatrix = get2dRotateMatrix(angle);
    transformed.xz = rotateMatrix * transformed.xz;
    `
    )
}
depthMaterial.onBeforeCompile = (shader) =>
{
    shader.uniforms['uTime'] = customUniforms.uTime
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
    `
        #include <common>
        uniform float uTime ;
        mat2 get2dRotateMatrix(float _angle)
    {
        return mat2(cos(_angle), - sin(_angle),sin(_angle), cos (_angle));
    }`)
    shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
    `
        #include <beginnormal_vertex>
        float angle = (sin(position.y + uTime)) * 0.5;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        objectNormal.xz = rotateMatrix * objectNormal.xz;
    `
    )
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
    `
        #include <begin_vertex>
        float angle = (sin(position.y + uTime)) * 0.5;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        transformed.xz = rotateMatrix * transformed.xz;
    `
    )

}

  /**
 * Models
 */
gltfLoader.load(
    'assets/arrow2.glb',
    (forward) =>
    {   forward.scene.position.set(1.2,0,0)
        forward.scene.scale.set(0.15, 0.15, 0.15)
        forward.scene.rotation.y = Math.PI * 0.5
        forward.scene.name = 'forward';
        scene.add(forward.scene)
    }
)
gltfLoader.load(
  'assets/arrow2.glb',
  (left) =>
  {   left.scene.position.set(3,0,-1.5)
      left.scene.scale.set(0.15, 0.15, 0.15)
      left.scene.rotation.y = Math.PI *0
      scene.add(left.scene)
  }
)
gltfLoader.load(
  'assets/arrow2.glb',
  (gltf) =>
  {   gltf.scene.position.set(3,0,1.5)
      gltf.scene.scale.set(0.15, 0.15, 0.15)
      gltf.scene.rotation.y = Math.PI *-1
      scene.add(gltf.scene)
  }
)
    const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.set(1024, 1024)
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.normalBias = 0.05
    directionalLight.position.set(0.25, 2, - 2.25)
    scene.add(directionalLight)

    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(75, canvasSizes.width / canvasSizes.height, 0.1, 100)
    camera.position.set(4, 1, - 4)
    scene.add(camera)

    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    });
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    renderer.setSize(canvasSizes.width, canvasSizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const controls = new OrbitControls(camera,renderer.domElement);
    controls.enableDamping = true
    renderer.setClearColor(0xe232222, 1);
    renderer.setSize(canvasSizes.width, canvasSizes.height);

    // Variables to track mouse interaction
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Function to handle mouse down event
const onMouseDown = (event: MouseEvent) => {
  isDragging = true;
  previousMousePosition = { x: event.clientX, y: event.clientY };
};

// Function to handle mouse up event
const onMouseUp = () => {
  isDragging = false;
};

// Function to handle mouse move event
const onMouseMove = (event: MouseEvent) => {
  if (!isDragging) return;

  const deltaX = event.clientX - previousMousePosition.x;
  const deltaY = event.clientY - previousMousePosition.y;

  // Adjust the camera's position based on mouse movement
  camera.position.x += deltaX * 0.01;
  camera.position.y -= deltaY * 0.01;
  console.log(`Camera Position - X: ${camera.position.x.toFixed(2)}, Y: ${camera.position.y.toFixed(2)}`);

  // Update the previous mouse position
  previousMousePosition = { x: event.clientX, y: event.clientY };
};
// Add event listeners for mouse interactions
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('mousemove', onMouseMove);
    //Making Model Clickable

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    renderer.domElement.addEventListener('pointerup', (event) => {
    mouse.x = (event.clientX / renderer.domElement.clientWidth - renderer.domElement.getBoundingClientRect().x) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight + renderer.domElement.getBoundingClientRect().y) * 2 + 1;
    console.log(mouse.x, mouse.y);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if(intersects[ 0 ].object.parent){
      console.log(intersects[ 0 ].object.parent )
      if(intersects[ 0 ].object.parent.name == 'forward' ) {
      console.log("Model clicked.")
      scene.background = environmentMap2
      scene.environment = environmentMap2
    }}
});

    window.addEventListener('resize', () => {
      canvasSizes.width = window.innerWidth;
      canvasSizes.height = window.innerHeight ;
      camera.aspect = canvasSizes.width / canvasSizes.height;
      camera.updateProjectionMatrix();
      console.log(`Camera Position - X: ${camera.position.x}, Y: ${camera.position.y}`);
      renderer.setSize(canvasSizes.width, canvasSizes.height);
      renderer.render(scene, camera);
    });

      const clock = new THREE.Clock();

      const animateGeometry = () => {
        const elapsedTime = clock.getElapsedTime();
            //Update controls
        customUniforms.uTime.value = elapsedTime
    // Update controls
        controls.update()
        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(animateGeometry);
      };

      animateGeometry();
    }
  }
