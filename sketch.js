var river, riverImg;
var restBackground;
var restBackImg;

var player;
var playerImg;

var fish;
var fishImg;
var fishGroup;

var gameState = 1;

var messageImg, message;
var messageFish, messageFishImg;

var apple, appleImg;

var bottle, bottleImg;

var rock, rockImg;
var rockGroup;


function preload(){
riverImg = loadAnimation("river2.png");
restBackImg = loadAnimation("rest background.png");
playerImg = loadImage("boat.png");
fishImg = loadImage("fish.png");
messageImg = loadImage("message.png");
messageFishImg = loadImage("messageFish.png");
appleImg = loadImage("apple.png");
bottleImg = loadImage("bottle.png");
rockImg = loadImage("rock.png");

}


function setup() {
  createCanvas(700,300);

  
  
  river = createSprite(180,400,400,800);
  river.addAnimation("river", riverImg);
  river.scale = 2;

 
  player = createSprite(175, 550, 50,70);
  player.addImage("boat", playerImg);
  player.scale = 0.35;
  player.debug = true;
  player.setCollider("circle", 0,-15,100);



  restBackground = createSprite(300,300,700,350);
  restBackground.addAnimation("background", restBackImg);
  
  message = createSprite(350,60,40,100);
  message.addImage("message", messageImg);
  message.scale = 0.4;
 

  

  fishGroup = new Group();
  appleGroup = new Group();
  bottleGroup = new Group();
  rockGroup = new Group();
}

function draw() {
  background("black"); 

  // GAMESTATE 0
  
 if(gameState === 0){

  message.visible = false;

  if(keyDown("space") && gameState === 0){
  restBackground.velocityY = -1.5;
  }
 
  console.log(restBackground.y);

  if(restBackground.y < 20){
    restBackground.velocityY = 0;

   message.visible = true;
  
    messageFish = createSprite(620, 150, 40,40);
    messageFish.addImage("fishImg", messageFishImg);
    messageFish.scale = 0.2;

  }

  if(keyDown("space") && restBackground.y <= 20){
    gameState = 1;
  

  }

}
  // GAMESTATE 1
  if(gameState === 1){
  
    message.visible = false;
    
    restBackground.visible = false;
    restBackground.velocityY = 0;

    createCanvas(350,600);
  
    fishGroup.visible = true;
    appleGroup.visible = true;
    bottleGroup.visible = true;

  river.velocityY = +5;

  
  if(keyDown("UP_ARROW")){
    player.y = player.y -3;
  }
  
  if(keyDown("DOWN_ARROW")){
    player.y = player.y +3.5;
  }
  
  if(keyDown("LEFT_ARROW")){
    player.x = player.x - 3.5;
  }
  
  if(keyDown("RIGHT_ARROW")){
    player.x = player.x + 3.5;
  }

  if(river.y > 300){
    river.y = 120;
  }

  spawnFish();
  spawnApple();
  spawnBottle();
  spawnRock();
  

  if(player.isTouching(fishGroup)){
    fish.visible = false;
  }

  
  if(player.isTouching(rockGroup)){
   gameState = 2;
  }

  if(player.isTouching(appleGroup)){
    apple.visible = false;
  }

  if(player.isTouching(bottleGroup)){
    bottle.visible = false;
  }

 
}
  drawSprites();
}

function spawnFish(){
  if (frameCount % 120 === 0){
    fish = createSprite(300,10,20,50);
    fish.x = Math.round(random(0,300));
    fish.addImage("fish", fishImg);
    fish.scale = 0.4;
    fish.setCollider("rectangle",-140,40,100,160);
    

    fish.velocityY = +5;

    fish.lifetime = 400;

    //fish.debug = true;
    fishGroup.add(fish);
  }
}

function spawnApple(){
  if (frameCount % 100 === 0){
    apple = createSprite(300,5,50,50);
    apple.x = Math.round(random(0,300));
    apple.addImage("apple", appleImg);
    apple.scale = 0.4;
    apple.setCollider("rectangle",120,-90,120,170);

    apple.velocityY = +5;

    apple.lifetime = 500;

  // apple.debug = true;
   appleGroup.add(apple);
  }
}

function spawnBottle(){
  if (frameCount % 60 === 0){
    bottle = createSprite(300,10,50,50);
    bottle.x = Math.round(random(0,300));
    bottle.addImage("bottle", bottleImg);
    bottle.scale = 0.4;
    bottle.setCollider("rectangle",-140,-70,100,160);

    bottle.velocityY = +5;

    bottle.lifetime = 500;

   bottle.debug = true;
   bottleGroup.add(bottle);
}
}

function spawnRock(){
  if (frameCount % 80 === 0){
    rock = createSprite(300,10,50,50);
    rock.x = Math.round(random(0,300));
    rock.addImage("rock", rockImg);
    rock.scale = 0.5;

    rock.velocityY = +5;

    rock.lifetime = 400;

  // rock.debug = true;
   rockGroup.add(rock);
}
}
