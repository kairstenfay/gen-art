////////////////////////////////////////////////////////////////////////////////
// Draw a Square Exercise                                                     //
// Your task is to complete the function square (at line 28).                 //
// The function takes 4 arguments - coordinates x1, y1, x2, y2                //
// for the square and returns a geometry object (THREE.Geometry())            //
// that defines a square at the provided coordinates.                         //
////////////////////////////////////////////////////////////////////////////////

var camera, scene, renderer;
var windowScale;

function exampleTriangle() {
	var triangle = new THREE.Geometry();
	triangle.vertices.push( new THREE.Vector3( 1, 1, 0 ) );
	triangle.vertices.push( new THREE.Vector3( 3, 1, 0 ) );
	triangle.vertices.push( new THREE.Vector3( 3, 3, 0 ) );

	triangle.faces.push( new THREE.Face3( 0, 1, 2 ) );

	return triangle;
}

function drawSquare(x1, y1, x2, y2) {

	var square = new THREE.Geometry();
	square.vertices.push( new THREE.Vector3( x1, y1, 0 ) );
	square.vertices.push( new THREE.Vector3( x2, y1, 0 ) );
	square.vertices.push( new THREE.Vector3( x2, y2, 0 ) );
	square.vertices.push( new THREE.Vector3( x1, y2, 0 ) );

	square.faces.push( new THREE.Face3( 0, 1, 2 ) );
	square.faces.push( new THREE.Face3( 0, 3, 2 ) );
	return square;
}

function someObject (material) {
	var geometry = new THREE.Geometry();

	geometry.vertices.push( new THREE.Vector3( 3, 3, 0 ) );
	geometry.vertices.push( new THREE.Vector3( 7, 3, 0 ) );
	geometry.vertices.push( new THREE.Vector3( 7, 7, 0 ) );
	geometry.vertices.push( new THREE.Vector3( 3, 7, 0 ) );

	geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
	geometry.faces.push( new THREE.Face3( 0, 2, 3 ) );

	var mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );
}

function init() {
	//  Set up some parameters
	var canvasWidth = 846;
	var canvasHeight = 494;
	var canvasRatio = canvasWidth / canvasHeight;
	// scene
	scene = new THREE.Scene();

	// Camera: Y up, X right, Z up
	windowScale = 12;
	var windowWidth = windowScale * canvasRatio;
	var windowHeight = windowScale;

	camera = new THREE.OrthographicCamera(windowWidth/-2, windowWidth/2, windowHeight/2, windowHeight/-2, 0, 40);

	var focus = new THREE.Vector3( 5,5,0 );
	camera.position.x = focus.x;
	camera.position.y = focus.y;
	camera.position.z = 20;
	camera.lookAt(focus);

	renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true});
	renderer.setSize( canvasWidth, canvasHeight );
	renderer.setClearColor(new THREE.Color('lightgrey'), 1)
}
function addToDOM() {
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );
}
function render() {
	renderer.render( scene, camera );
}

init();

var triangleMaterial = new THREE.MeshBasicMaterial( { color: 0x2685AA, side: THREE.DoubleSide } );
var triangleGeometry = exampleTriangle();
var triangleMesh = new THREE.Mesh( triangleGeometry, triangleMaterial );
scene.add(triangleMesh);

var square_material = new THREE.MeshBasicMaterial( { color: 0xF6831E, side: THREE.DoubleSide } );
var square_geometry = drawSquare(3,5,7,9);
var square_mesh = new THREE.Mesh(square_geometry, square_material);
scene.add(square_mesh);

var material = new THREE.MeshBasicMaterial( { color: 'yellow', side: THREE.FrontSide } );
someObject(material);

addToDOM();
render();
