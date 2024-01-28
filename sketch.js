// GLOBAL VARIABLES.

var girlImg,girl;
var nightImg,night;
var zombieImg,zombiesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var barriersImg,barriersGroup;
var invisibleGround;
var blast,blastImg,blastsound;;
var gameOver;
var you_lose;
var horrorMusic;
var deadGirl;
var restartImg,reset;


// LOAD THE IMAGE.

function preload(){
girlImg = loadImage("girl.png");
nightImg = loadImage("night.png");
zombieImg = loadImage("zombie.png");
barriersImg = loadImage("barriers.png");
blastImg = loadImage("blast.png");
you_lose = loadImage("gameover.png");
restartImg = loadImage("reset.png");
horrorMusic = loadSound("wind.mp3");
deadGirl = loadSound("girlDead.wav");
blastsound = loadSound("blastSound.mp3");
}


// MAKE THE IMAGE VISIBLE. 

function setup() {
createCanvas(windowWidth,windowHeight);
night = createSprite(600,200);
night.addImage("nightBackground",nightImg);

girl = createSprite(100,690);
girl.addImage("girlRunning",girlImg);
girl.scale = 0.4;

zombiesGroup = createGroup();
barriersGroup = createGroup();

invisibleGround = createSprite(700,770,1400,10);
invisibleGround.visible = false;

blast = createSprite(550,500);
blast.addImage("booom!",blastImg);
blast.scale = 2;

reset = createSprite(600,380);
reset.addImage("click to restart",restartImg)

gameOver = createSprite(600,600);
gameOver.addImage(you_lose);



}

// GAMESTATES AND IF CONDITIONS. 

function draw() {
background(225);


// GAMESTATE PLAY.

if (gameState === PLAY) {
    reset.visible = false;
    gameOver.visible = false;
    blast.visible = false;  

if (keyDown("Space")&& girl.y >= 410) {
    girl.velocityY = -30;      
  }

night.velocityX = -5;
girl.velocityY = girl.velocityY + 2;

if (night.x < 450){
    night.x = night.width/2;
  }


spawnZombies();
spawnBarriers();
   
if (zombiesGroup.isTouching(girl)) {
    deadGirl.play(); 
    gameState = END;
  }

if (barriersGroup.isTouching(girl)) {
    blast.visible = true;
    blastsound.play();
    gameState = END;
      
  }
horrorMusic.play();
   
   }  

girl.collide(invisibleGround);
 
// GAMESTATE END. 

if (gameState === END) {
    reset.visible = true;
    gameOver.visible = true;
    girl.destroy();
    barriersGroup.destroyEach();
    zombiesGroup.destroyEach();
    night.velocityX = 0;
      
if (mousePressedOver(reset)) {
    restart();
    }
      
zombiesGroup.setLifetimeEach(-1);
barriersGroup.setLifetimeEach(-1);

    } 

drawSprites();
    }

// CODE TO CREATE INFINITE ZOMBIES.

function spawnZombies() {
 
if (frameCount % 160 === 0) {
    var zombie = createSprite(1150,650,40,10);
    zombie.x = Math.round(random(600,1200));
    zombie.addImage(zombieImg);
    zombie.scale = 0.35;
    zombie.velocityX = -15;
    zombiesGroup.add(zombie);
    }
    } 

// CODE TO CREATE INFINITE BARRIERS.

function spawnBarriers() {

if (frameCount % 260 === 0){
    var barrier = createSprite(1150,650,40,10);
    barrier.x = Math.round(random(1000,1600));
    barrier.addImage("obstacleImg",barriersImg);
    barrier.scale = 0.3;
    barrier.velocityX = -15;
    barriersGroup.add(barrier);
    }
    }

// CODE TO RESTART THE WHOLE GAME ON CLICKING THE RESET BUTTON.

function restart() {
gameState = PLAY;
girl = createSprite(100,690);
girl.addImage("girlRunning",girlImg);
girl.scale = 0.4;
zombiesGroup.destroyEach();
barriersGroup.destroyEach();
}