//Variables for movement
let moveSpeed = 15;
let rotSpeed = 3;
let camX = 0;
let camY = 0;
let camZ = 0;
let angleX = 0;
let angleY = 0;

//Variables for box
let boxSpeed = 20;
let boxSize = 50;

let boxStartOffset = 500; //How far away the box spawns
let offsetZ = 200-boxSize/2;
let offsetY = 200-boxSize/2;
let randomValZ = 0;
let randomValY = 0;
let xPosBoxFall = 0;

let maxXPos = 400; //Afstand to beginning (red-plane)

//Gameplay variables
let time = 0;
let deathCount = 0;
let boxCurrentXpos = [0,0,0];   //Change this for each square :(
let saveThisValue = [[],[],[]];  //Change this for each square :(

function setup() 
{
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
}

function draw() 
{
  background(220);

  boxSpeed += 0.02; //Increase speed of box
  time+= 1/30; //Going to use later on!


  //Caculating distance from cam to box
  for (let i = 0; i < boxCurrentXpos.length; i++)
  {
    let camPosXDiff = abs(camX - (boxStartOffset - boxCurrentXpos[i]));
    let camPosYDiff = abs(abs(camY) - abs(saveThisValue[i][1]));
    let camPosZDiff = abs(abs(camZ) - abs(saveThisValue[i][2]));
  
    if (camPosXDiff < boxSize/2 && camPosYDiff < boxSize/2 && camPosZDiff < boxSize/2)
    {
      print("DIED " + (deathCount+1));
      deathCount++;
    }
  }
  

  //Drawing all planes
  /*Red*/       createPlane(transX = 400, transY = 0,    transZ= 0,    rotX = 0,   rotY = 90,  rotZ = 0, planeSize = 400,  fillR = 255,  fillG = 0,    fillB = 0);
  /*Green*/     createPlane(transX = 200, transY = 0,    transZ= 200,  rotX = 0,   rotY = 0,   rotZ = 0, planeSize = 2000, fillR = 0,    fillG = 255,  fillB = 0);
  /*Dark Blue*/ createPlane(transX = 200, transY = 0,    transZ= -200, rotX = 0,   rotY = 0,   rotZ = 0, planeSize = 2000, fillR = 0,    fillG = 0,    fillB = 255);
  /*Yellow*/    createPlane(transX = 200, transY = 200,  transZ= 0,    rotX = 90,  rotY = 0,   rotZ = 0, planeSize = 2000, fillR = 255,  fillG = 255,  fillB = 0);
  /*LightBlue*/ createPlane(transX = 200, transY = -200, transZ= 0,    rotX = 90,  rotY = 0,   rotZ = 0, planeSize = 2000, fillR = 0,    fillG = 255,  fillB = 255);


  //Handling  movement
  StayInside(maxXPos,150,150); //Can't move outside the planes
  WASD(); //Move with WASD
  Rotate(); //Rotate with arrow
  UpDown(); //Go up and down with shift and space
  

  //camera pos/view/rot
  camera(camX, camY, camZ, 
         camX + cos(angleY) * cos(angleX), camY + sin(angleX), camZ + sin(angleY) * cos(angleX), 
         0, 1, 0);

  //Create boxes | arrayVal1 has to be different for each box
  CreateBox(boxTranslateY = 200, boxTranslateZ = 200, boxRandomValY = offsetY,boxRandomValZ = offsetZ, arrayVal1 =0);
  CreateBox(boxTranslateY = 200, boxTranslateZ = 200, boxRandomValY = offsetY,boxRandomValZ = offsetZ, arrayVal1 =1);
  CreateBox(boxTranslateY = 200, boxTranslateZ = 200, boxRandomValY = offsetY,boxRandomValZ = offsetZ, arrayVal1 =2);
}
function CreateBox(boxTranslateY,boxTranslateZ, boxRandomValY, boxRandomValZ, arrayVal1)
{
  if(boxCurrentXpos[arrayVal1] > (maxXPos + boxStartOffset))
  {
    boxCurrentXpos[arrayVal1] = 0;

    boxTranslateY = random(-boxRandomValY,boxRandomValY);
    boxTranslateZ = random(-boxRandomValZ,boxRandomValZ);

    saveThisValue[arrayVal1][1] = boxTranslateY;
    saveThisValue[arrayVal1][2] = boxTranslateZ;
  } 
  else 
  {

    boxCurrentXpos[arrayVal1]+=boxSpeed;
  }
  
  TranslateBox(boxStartOffset-boxCurrentXpos[arrayVal1],saveThisValue[arrayVal1][1],saveThisValue[arrayVal1][2]);
}

function TranslateBox(TranslateX,TranslateY,TranslateZ)
{
  push();
  translate(TranslateX,TranslateY,TranslateZ);
  box(boxSize);
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