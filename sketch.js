var obstacleGroup;

var gameState = "start"

var shoot;
var shootGroup;

var score = 0;
var mScore = 0;
var bScore = 0;

var mSound;
var rSound;
var GameOver;
var Start;

var music;

function preload(){

jetIMG = loadImage("files/jet.png")
spaceIMG = loadImage("files/space.jpg")
meteorIMG = loadImage("files/Meteors.png")
gameOverIMG = loadImage("files/gameOver.png")
bulletIMG = loadImage("files/bullet.png")
meteorbreakingIMG = loadImage("files/meteor breaking.png")

mSound = loadSound("files/rockSound.mp3")
rSound = loadSound("files/rocketSound.mp3")
music = loadSound("files/music.mp3")
GameOver = loadSound("files/gameOver.mp3")
Start = loadSound("files/Start.mp3")

}

function setup() {

  createCanvas(displayWidth-20,displayHeight-20);
  music.setVolume(0.2);
  music.play();
  
  

  ground = createSprite(600, 600, 900, 25);
  jet = createSprite(200, 200, 50, 50);
  gameOver = createSprite(displayWidth/2, displayHeight/2, 200, 200);

  jet.scale = 0.5
  ground.scale = 2
  gameOver.scale = 3

  gameOver.addImage(gameOverIMG)
  jet.addImage(jetIMG)
  ground.addImage(spaceIMG)
  
  obstacleGroup = new Group() 
  shootGroup = new Group() 

gameOver.visible = false;
jet.debug = false;

jet.setCollider("circle",0,0,150)
}

function draw() {
  background(255,255,255);  
 
 if (gameState === "play"){
  
  obstacle()
  



if (keyDown(RIGHT_ARROW)){
rSound.play();
rSound.setVolume(0.2);
  shooting();
  }

for (var i = 0; i < obstacleGroup.length; i++) {
if (obstacleGroup.get(i).isTouching(shootGroup)){
 
 
 obstacleGroup.get(i).addImage(meteorbreakingIMG)
 obstacleGroup.get(i).velocityY = 50;
 mScore = mScore+1
 mSound.play();
}
}

score = score+1


  if (keyDown(UP_ARROW)){
jet.y = jet.y-20
  }
  if (keyDown(DOWN_ARROW)){
    jet.y = jet.y+20
      }
      if (keyDown(87)){
        jet.y = jet.y-20
          }
          if (keyDown(68)){
            jet.y = jet.y+20
              }






ground.velocityX = -6

if (ground.x<0){
  ground.x = ground.width/2
}

if (obstacleGroup.isTouching(jet)){
  gameState = "end"
  GameOver.play();
}

 }
if (gameState === "end"){
 
  jet.destroy()
  obstacleGroup.destroyEach()
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1)
  ground.velocityX = 0;
  gameOver.visible = true;
  shootGroup.destroyEach()
 
  
}


  drawSprites();
  if (gameState === "start"){
    
    textSize(60)
    fill ("lime")
    textFont("Stencil")
text("Press Space To Start The Game",displayWidth/2-350,displayHeight/2)
if(keyDown("space")){
  gameState = "play"
}
  }

  textFont("Bold")
  textSize(30)
  fill("yellow")
  text("SCORE: "+score,displayWidth-500,100)

  textFont("Akura Popo Regular")
  textSize(30)
  fill("white")
  text("METEOR DESTROYED: "+mScore,displayWidth-550,50)


}



function obstacle (){
if (frameCount%50 === 0){
  
  obstacle1 = createSprite(displayWidth+200, random(50,displayHeight-100), 50, 50);
obstacle1.debug = false;
obstacle1.setCollider("circle",0,0,85)
obstacle1.velocityX = -(8+score/50)
obstacle1.addImage (meteorIMG)
obstacleGroup.add(obstacle1)
obstacle1.lifetime = 300;

}




}

function shooting (){

shoot = createSprite(200,200,20,20)
shoot.addImage(bulletIMG);
shoot.scale = 0.2
shoot.x = jet.x
shoot.y = jet.y
shoot.velocityX = 15
shootGroup.add(shoot)

}



