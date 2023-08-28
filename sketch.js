//Variables for movement
let moveSpeed = 15;
let rotSpeed = 3;
let camX = 0;
let camY = 0;
let camZ = 0;
let angleX = 0;
let angleY = 0;

//Variables for box
let boxStartOffset = 500; //How far away the box spawns
let offsetZ = 200;
let offsetY = 200;
let randomValZ = 0;
let randomValY = 0;
let xPosBoxFall = 0;
let boxSpeed = 20;
let boxSize = 50;
let deathCount = 0;

let maxXPos = 400; //Afstand to beginning (red-plane)

//Gameplay variables
let time = 0;

function setup() 
{
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
}

function draw() 
{
  background(220);
  
  //Translate Box
  CreateBox2();

  boxSpeed += 0.02; //Increase speed of box
  time+= 1/30;
  print("BoxSpeed: " + round(boxSpeed) + "   time: " + round(time));
  
  //CreateBox(boxSize1 = 50, boxSpeed1 = 20 ,boxOffsetY = 200, boxOffsetZ = 200,boxCurrentXPos = 0,boxMaxXPos = 400,boxRandomValY = 0,boxRandomValZ = 0);


  //Caculating distance from cam to box
    // boxXpos = (boxStartOffset-xPosBoxFall) | boxYpos = randomValY | boxZpos = randomValZ
  if(abs(camX - (boxStartOffset-xPosBoxFall)) < boxSize/2)
  {
    if(abs(camY - randomValY) < boxSize/2)
    {
      if(abs(camZ - randomValZ) < boxSize/2)
      {
        print("DIED " + (deathCount+1));
        deathCount++;
      }
    }
  }
  
  //Drawing all planes
  /*Red*/       createPlane(transX = 400, transY = 0,    transZ= 0,    rotX = 0,   rotY = 90,  rotZ = 0, planeSize = 400,  fillR = 255,  fillG = 0,    fillB = 0);
  /*Green*/     createPlane(transX = 200, transY = 0,    transZ= 200,  rotX = 0,   rotY = 0,   rotZ = 0, planeSize = 2000, fillR = 0,    fillG = 255,  fillB = 0);
  /*Dark Blue*/ createPlane(transX = 200, transY = 0,    transZ= -200, rotX = 0,   rotY = 0,   rotZ = 0, planeSize = 2000, fillR = 0,    fillG = 0,    fillB = 255);
  /*Yellow*/    createPlane(transX = 200, transY = 200,  transZ= 0,    rotX = 90,  rotY = 0,   rotZ = 0, planeSize = 2000, fillR = 255,  fillG = 255,  fillB = 0);
  /*LightBlue*/ createPlane(transX = 200, transY = -200, transZ= 0,    rotX = 90,  rotY = 0,   rotZ = 0, planeSize = 2000, fillR = 0,    fillG = 255,  fillB = 255);

  StayInside(maxXPos,150,150); //Can't move outside the planes
  WASD(); //Move with WASD
  Rotate(); //Rotate with arrow
  UpDown(); //Go up and down with shift and space
  
  
  camera(camX, camY, camZ, 
         camX + cos(angleY) * cos(angleX), camY + sin(angleX), camZ + sin(angleY) * cos(angleX), 
         0, 1, 0);
}
function CreateBox2()
{
  if (xPosBoxFall>maxXPos+boxStartOffset){
    xPosBoxFall = 0;
    randomValZ = random(-offsetZ,offsetZ);
    randomValY = random(-offsetY,offsetY);
  }else xPosBoxFall +=boxSpeed;

  push();
  translate(boxStartOffset-xPosBoxFall, randomValY, randomValZ);
  fill(255,255,0);
  box(boxSize);
  pop();
}

function CreateBox(boxSize1,boxSpeed1,boxOffsetY, boxOffsetZ,boxCurrentXPos,boxMaxXPos,boxRandomValY,boxRandomValZ)
{
  if(boxCurrentXPos>boxMaxXPos){
    boxCurrentXPos = 0;
    boxRandomValY = random(-boxOffsetY,boxOffsetY);
    boxRandomValZ = random(-boxOffsetZ,boxOffsetZ);
  }else boxCurrentXPos +=boxSpeed1;

  push();
  translate(boxStartOffset-boxCurrentXPos,boxRandomValY,boxRandomValZ);
  fill(255,255,0);
  box(boxSize1);
  pop();
}

function StayInside(maxX, maxY, maxZ)
{
  if( camX>maxX){
    camX = maxX;
  }
  else if(camX<maxX){ //change this to camX<-maxX (if you want to move forward)
    camX=-maxX;
  }

  if (camY>maxY){
    camY = maxY;
  }
  else if (camY<-maxY){
    camY = -maxY;
  }

  if(camZ>maxZ){
    camZ =maxZ;
  }
  else if ( camZ<-maxZ){
    camZ=-maxZ;
  }

}
function createPlane(transX = 0,transY = 0,transZ= 0, rotX = 0, rotY = 0, rotZ = 0, planeSize = 400, fillR = 0, fillG = 0, fillB = 0)
{
  push();
  noStroke();
  fill(fillR,fillG,fillB);
  translate(transX,transY,transZ);
  rotateX(rotX);
  rotateY(rotY);
  rotateZ(rotZ);

  plane(planeSize);
  pop();
}

function WASD()
{
  if (keyIsDown(87)) // W key
  { 
    camX += moveSpeed * cos(angleY);
    camZ += moveSpeed * sin(angleY);
  }
  if (keyIsDown(83)) // S key
  { 
    camX -= moveSpeed * cos(angleY);
    camZ -= moveSpeed * sin(angleY);
  }
  if (keyIsDown(65)) // A key
  { 
    camX += moveSpeed * cos(angleY - 90);
    camZ += moveSpeed * sin(angleY - 90);
  }
  if (keyIsDown(68)) // D key
  { 
    camX += moveSpeed * cos(angleY + 90);
    camZ += moveSpeed * sin(angleY + 90);
  }
}
function Rotate()
{
  if (keyIsDown(UP_ARROW)) 
  {
    angleX -= rotSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) 
  {
    angleX += rotSpeed;
  }
  if (keyIsDown(LEFT_ARROW)) 
  {
    angleY -= rotSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) 
  {
    angleY += rotSpeed;
  }  
}
function UpDown()
{
  if (keyIsDown(32)) // Space key
  { 
    camY -= moveSpeed;
  }
  if (keyIsDown(SHIFT)) // Shift key
  { 
    camY += moveSpeed;
  }
}