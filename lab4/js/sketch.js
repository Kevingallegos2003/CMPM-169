// Click and drag the mouse to view the scene from different angles.
//Inspired by the p5js tutorial https://p5js.org/reference/p5/loadModel/
//Loading shaders by the p5js tutorial https://p5js.org/tutorials/intro-to-shaders/
let shape;
let myshader;
let posX = 0, posY = 0, posZ = 0;  
let speedX = 2, speedY = 3, speedZ = 1;
let vert = `
precision highp float;
attribute vec3 aPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float time;
void main() {
  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);
  viewModelPosition.x += 10.0*sin(time * 0.01 + viewModelPosition.y*0.1);
  gl_Position = uProjectionMatrix * viewModelPosition;
}
`;
let frag = `precision highp float;

void main() {
  vec4 myColor = vec4(1.0, 0.0, 0.0, 1.0);
  gl_FragColor = myColor;
}
`;
let options = {
  normalize: true,
  successCallback: handleModel,
  failureCallback: handleError,
  fileType: '.obj'
};

// Load the file and create a p5.Geometry object.
function preload() {
  shape = loadModel('./catz.obj', options);
  //shape.scale(10);
}

function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
  myShader = createShader(vert, frag);
  normalMaterial();
}

function draw() {
  background(200);
  shader(myShader);
  myShader.setUniform('time', millis());
  posX += speedX;
  posY += speedY;
  posZ += speedZ;
  if (posX > width / 2 - 30 || posX < -width / 2 + 30) {
    speedX *= -1;
  }
  
  if (posY > height / 2 - 30 || posY < -height / 2 + 30) {
    speedY *= -1;
  }
  if (posZ > height / 2 - 30 || posZ < -height / 2 + 30) {
    speedZ *= -1;
  }
  push();
  translate(posX, posY, posZ);
  rotateWithFrameCount();
  //box(70, 70, 70);
  model(shape);
  pop();
}
function rotateWithFrameCount() {
  rotateZ(frameCount);
  rotateX(frameCount);
  rotateY(frameCount);
}
// Set the shape variable and print the geometry's
// ID to the console.
function handleModel(data) {
  shape = data;
  console.log(shape.gid);
}

// Print an error message if the file doesn't load.
function handleError(error) {
  console.error('Oops!', error);
}