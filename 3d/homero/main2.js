import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

var scene, camera, renderer;
var elementsConfig;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('canvas').appendChild(renderer.domElement);

  // Cargar la configuración de elementos desde el archivo JSON
  loadElementsConfig();

  // Agregar las imágenes a la escena
  addImages();

  // Agregar los modelos a la escena
  addModels();

  // Agregar las geometrías a la escena
  addGeometries();
}

function loadElementsConfig() {
  // Cargar el archivo JSON de configuración de elementos
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', 'scene-config.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      elementsConfig = JSON.parse(xhr.responseText);
    }
  };
  xhr.send(null);
}

function addImages() {
  var textureLoader = new THREE.TextureLoader();

  for (var i = 0; i < elementsConfig.images.length; i++) {
    var imageConfig = elementsConfig.images[i];
    var texture = textureLoader.load(imageConfig.url);

    var planeGeometry = new THREE.PlaneGeometry(1, 1);
    var planeMaterial = new THREE.MeshBasicMaterial({ map: texture });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.position.fromArray(imageConfig.position);

    scene.add(plane);
  }
}

function addModels() {
  var gltfLoader = new THREE.GLTFLoader();

  for (var i = 0; i < elementsConfig.models.length; i++) {
    var modelConfig = elementsConfig.models[i];
    gltfLoader.load(modelConfig.url, function (gltf) {
      var model = gltf.scene;
      model.position.fromArray(modelConfig.position);

      scene.add(model);
    });
  }
}

function addGeometries() {
  for (var i = 0; i < elementsConfig.geometries.length; i++) {
    var geometryConfig = elementsConfig.geometries[i];
    var position = new THREE.Vector3().fromArray(geometryConfig.position);

    var geometry;
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    if (geometryConfig.type === "box") {
      geometry = new THREE.BoxGeometry(...geometryConfig.size);
    } else if (geometryConfig.type === "sphere") {
      geometry = new THREE.SphereGeometry(geometryConfig.radius);
    }

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);

    scene.add(mesh);
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Agrega aquí tu código de animación si lo deseas

  renderer.render(scene, camera);
}

init();
animate();