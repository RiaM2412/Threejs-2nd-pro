import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Loader, Material } from 'three'

// Texture loader
const loader= new THREE.TextureLoader()
const texture= new loader.load('/texture.jpg')
const Height= new loader.load('/Height.png')
const alpha= new loader.load('/alpha.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry= new THREE.PlaneBufferGeometry(5,5,64,64)

// Materials

const material= new THREE.MeshStandardMaterial({
    color:'#3c00ff',
    map: texture,
    displacementMap: Height,
    displacementScale: .6,
    alphaMap: alpha,
    transparent: true,
    depthTest: false
})
const plane= new THREE.Mesh(geometry,material)
scene.add(plane)

plane.rotation.x=181
gui.add(plane.rotation, 'x').min(0).max(360)
// Mesh


// Lights

const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)



gui.add(pointLight.position, 'x')
gui.add(pointLight.position, 'y')
gui.add(pointLight.position, 'z')

//Light2
const pointLight2 = new THREE.PointLight(0xff0000, 0.1)
pointLight2.position.set(-1.86,1,-1.65)
pointLight2.intensity=10


scene.add(pointLight2)

const Light1= gui.addFolder('Light 1')

Light1.add(pointLight2.position,'y').min(-3).max(3).step(0.01)
Light1.add(pointLight2.position,'x').min(-6).max(6).step(0.01)
Light1.add(pointLight2.position,'z').min(-3).max(3).step(0.01)
Light1.add(pointLight2,'intensity').min(0).max(10).step(0.01)


//pointlight1 color
const light1Color ={
    color: 0xff0000
}

Light1.addColor(light1Color, 'color')
   .onChange(() =>{
       pointLight2.color.set(light1Color.color)
   })


const col = {color: '#3c00ff'}
gui.addColor(col,'color').onChange(() =>{
    pointLight.color.set(col.color)
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth ,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth 
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove',animateTerrain)

let mouseY=0
function animateTerrain(event){
    mouseY=event.clientY
    console.log(mouseY)
}

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime
    plane.rotation.z = .2*elapsedTime
    plane.material.displacementScale = 0.3+ mouseY*0.0005
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()