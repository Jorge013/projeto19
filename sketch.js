var trex, trexRunning, trexColide;
var edges;
var chao, chaoImage;
var chaoInvisivel;
var cloud, cloudImage
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6
var score = 0
var PLAY = 1
var END = 0
var gameState = PLAY
var gameOver, GameOverImage
var Restart, RestartImage
var dieSound
var checkPointSound
var jumpSound




function preload() {
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexColide = loadAnimation("trex_collided.png");
  chaoImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
  GameOverImage = loadImage("gameOver.png");
  RestartImage = loadImage ("restart.png");
  dieSound = loadSound ("die.mp3");
  jumpSound = loadSound ("jump.mp3");
  checkPointSound = loadSound ("checkPoint.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
 
  chaoInvisivel = createSprite(width/2,height-10,width,10);
  chaoInvisivel.visible = false;

  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trexRunning);
  trex.addAnimation("collided", trexColide)
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,50);
 // trex.debug = true;

  edges = createEdgeSprites();
  
  chao = createSprite(width/2,height-20,width,20);
  chao.x = chao.width/2;
  chao.addImage("solo",chaoImage);
  
  cactos = new Group ();
  nuvens = new Group ();

  gameOver = createSprite(width/2,height/2)
  gameOver.addImage(GameOverImage)
  gameOver.scale = 0.5
  gameOver.visible = false;

  Restart = createSprite(width/2,height/2+40)
  Restart.addImage(RestartImage)
  Restart.scale = 0.5
  Restart.visible = false;
}


function draw() {
  background("darkblue");

  text ("score: " + score,width-100,50)
  if (gameState===PLAY) {
    chao.velocityX = -4
    score = score + Math.round(getFrameRate()/60)
    if(score>0&&score%1000===0){
    checkPointSound.play();

    }
    if(chao.x < 0){
      chao.x = chao.width/2;
    }
    if (touches.length > 0 || keyDown("space") ) {
      if (  trex.y >= height-40) {
      trex.velocityY = -10;
      jumpSound.play();
      touches = [];
      }
    }
    //gravidade
    trex.velocityY = trex.velocityY + 0.5;

    criarNuvem()
    criarcactos()
    if (cactos.isTouching(trex)) {
     
     gameState = END 
     dieSound.play();
    }

  }
  else if (gameState===END) {
    gameOver.visible = true;
    Restart.visible = true;
    chao.velocityX = 0 
    nuvens.setVelocityXEach(0)
    cactos.setVelocityXEach(0)
    nuvens.setLifetimeEach(-1)
    cactos.setLifetimeEach(-1)
    trex.changeAnimation("collided", trexColide)
    trex.velocityY = 0 
    if (mousePressedOver(Restart)|| touches.length > 0 ){
    touches = [];
   reset ();
    }
  }

  trex.collide(chaoInvisivel);
  drawSprites();


}

function reset(){
gameState = PLAY;
gameOver.visible = false;
Restart.visible = false;
cactos.destroyEach();
nuvens.destroyEach();
trex.changeAnimation("running", trexRunning);
score = 0
}

function criarcactos () {
  if (frameCount%60===0){
var cacto = createSprite (width+10,height-35,10,40)
cacto.velocityX = -(6+score/100)
var rand = Math.round(random(1,6))
switch (rand) {
case 1: cacto.addImage(cacto1)
break;
case 2: cacto.addImage(cacto2)
break;
case 3: cacto.addImage(cacto3)
break;
case 4: cacto.addImage(cacto4)
break;
case 5: cacto.addImage(cacto5)
break;
case 6: cacto.addImage(cacto6)
break;
default: break;
}
cacto.scale = 0.5
cacto.lifetime = width+10;

cactos.add(cacto)
  }

}


function criarNuvem () {
  if (frameCount%60===0){
cloud = createSprite(width+10,height-100,10,10)
cloud.y =  Math.round(random(height-150,height-100));
cloud.velocityX = -4 
cloud.addImage("nuvem", cloudImage)
cloud.scale = 0.5
cloud.depth = trex.depth ; 
trex.depth = trex.depth +1 
cloud.lifetime = width+10;

nuvens.add(cloud)
  }

}

