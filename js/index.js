var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var materialRed = new THREE.MeshLambertMaterial({ color: 0xcccc00 });
var materialGreen = new THREE.MeshLambertMaterial({ color: 0x202020 });
var materialBlue = new THREE.MeshLambertMaterial({ color: 0xffffff });

len = 15;
arrCoords = [];

for (let i = 0; i < len; i = i + 2) {
  arrCoords.push(i);
  arrCoords.push(-i);
}

cubes = [];

arrCoords.forEach(x => {
  arrCoords.forEach(y => {
    var r = new THREE.Mesh(geometry, materialRed);
    var g = new THREE.Mesh(geometry, materialGreen);
    var b = new THREE.Mesh(geometry, materialBlue);

    scene.add(r);
    scene.add(g);
    //scene.add(b);

    r.position.y = y;
    g.position.y = y+1;
    b.position.y = y+1;
    r.position.x = x;
    g.position.x = x+1;
    b.position.x = x;

    cubes.push({ r, g, b });
  });
});

camera.position.z = 8;
mul = 1;
rotation = 0.01;

var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
scene.add(directionalLight);
directionalLight.position.x = 25;
directionalLight.position.y = 5;
directionalLight.position.z = 15;

var update = _ => {
  cubes.forEach(cube => {
    cube.r.rotation.x += rotation;
    cube.g.rotation.y += rotation;
    cube.b.rotation.z += rotation;
  });
//   camera.position.z += 0.1 * mul;
//   camera.rotation.z += 0.01;
//   if (camera.position.z > 20 || camera.position.z < 0) {
//     mul = mul * -1;
//   }

};

var render = _ => {
  renderer.render(scene, camera);
};

var GameLoop = _ => {
  requestAnimationFrame(GameLoop);

  update();
  render();
};

GameLoop();
