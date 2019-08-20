var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var materialRed = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var materialGreen = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var materialBlue = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

arrX = [-4,-3,-2,-1,0,1,2,3,4];
arrY = [-4,-3,-2,-1,0,1,2,3,4];
cubes = [];

arrX.forEach(x => {
    arrY.forEach(y => {
        var r = new THREE.Mesh( geometry, materialRed );
        var g = new THREE.Mesh( geometry, materialGreen );
        var b = new THREE.Mesh( geometry, materialBlue );

        scene.add(r);
        scene.add(g);
        scene.add(b);

        r.position.y = y;
        g.position.y = y;
        b.position.y = y;
        r.position.x = x;
        g.position.x = x;
        b.position.x = x;

        cubes.push({r,g,b});
    })
})

camera.position.z = 5;


var update = _ => {
    var index = 0
    cubes.forEach(cube => {
        cube.r.rotation.x += 0.02;
        cube.g.rotation.y += 0.02;
        cube.b.rotation.z += 0.02;
    })

}

var render = _ => {
    renderer.render( scene, camera);
}

var GameLoop = _ => {
    requestAnimationFrame(GameLoop);

    update();
    render();
}

GameLoop();