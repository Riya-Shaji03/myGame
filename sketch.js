var ground, groundImg, space, spaceImg, invisibleGround, skyImage
var boy,boyImages
var gameState = 0
var score = 0
var obstacle, obstacleGroup, obstacleL, obstacleL1, obstacleS, obstacleS1
var rocket, rocketImg, space, spaceImg
var stone, stoneGroup

function preload(){

  groundImg = loadImage("groundImg.png")
  spaceImg = loadImage("space1.jpg")
  boyImages = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png","boy7.png","boy8.png")
  rocketImg = loadImage("rocket.png")
  skyImage = loadImage("sky.jpg")
  obstacleL = loadImage("snake.png")
  obstacleL1 = loadImage("mushroom.png")
  obstacleS = loadImage("stone.png")
  obstacleS1 = loadImage("stone1.png")

}

function setup() {
  createCanvas(800,400);
  ground = createSprite(400, 360, 800, 50);
  ground.scale = 3
  ground.addImage(groundImg)
  

  space = createSprite(400, 208, 800, 50);
  space.scale = 1.6
  space.addImage(spaceImg)

  boy = createSprite(50,270,20,50)
  boy.scale = 2
  boy.addAnimation("boyRunning",boyImages)

  invisibleGround = createSprite(400,365,800,50)
  invisibleGround.visible = false

  obstacleGroup = new Group()

  rocket = createSprite(100,270,20,20)
  rocket.addImage("rocketFlying",rocketImg)

  stoneGroup = new Group()


  

}

function draw() {
  background(0,0,0); 
  if(gameState === 0){
    textSize(20)
    text("Press Space To Start",300,200)
    boy.visible = false
    ground.visible = false
    rocket.visible = false
    space.visible = false
    if(keyDown("space")){
      gameState = 1
    }
  }
  if(gameState === 1){
    background(skyImage); 
    text("Score:" + score, 50, 50)
    ground.velocityX = -5 
    ground.visible = true
    boy.visible = true
    rocket.visible = false
    space.visible = false
    if(ground.x < 0){
      ground.x = 400
    } 
    if(keyDown("up")){
      boy.velocityY = -10
    }
    boy.velocityY = boy.velocityY + 0.8
  
    boy.collide(invisibleGround)
    score = score + Math.round(getFrameRate()/60)
    //console.log(score)
  
    spawnObstacles()
    if(score === 50){
      gameState = 2
    }

    if(obstacleGroup.isTouching(boy)){
      gameState = 4
    }
    
  }
  if(gameState === 2 ){
    ground.velocityX = 0
    ground.visible = false
    boy.visible = false
    rocket.visible = false
    space.visible = false
    obstacleGroup.destroyEach()
    obstacle.visible = false
    fill("white")
    textSize(20)
    text("Welcome to Space", 310,150)
    text("Press Enter to continue", 293, 200)
    text("Click W to move up and S to move down", 233, 250)
    
    if(keyDown("enter")){
      gameState = 3
    }
    drawSprites()

  }

  if(gameState === 3){
    //background(spaceImg)
    rocket.visible = true
    space.visible = true
    space.velocityX = -2

    if(space.x <= 300){
      space.x = 400
    }
    spawnStones()
    if(stoneGroup.isTouching(rocket)){
      gameState = 4
    }
    if(keyDown("w")){
      rocket.y = rocket.y - 4
    }
    if(keyDown("s")){
      rocket.y = rocket.y + 4
    }
  }
  if(gameState === 4){
    fill("red")
    textSize(30)
    text("Game Over!", 350,200)
    space.velocityX = 0
    space.visible = false
    ground.visible = false
    boy.visible = false
    obstacleGroup.destroyEach()
    obstacle.visible = false

    stoneGroup.destroyEach()
    rocket.visible = false
    drawSprites()
  }
  
  drawSprites();
}

function spawnObstacles(){
  if(frameCount % 50 === 0){
    obstacle = createSprite(800,290,30,30)
    obstacle.scale = 0.2
    obstacle.velocityX = -5
    obstacleGroup.add(obstacle)

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacleL);
              break;
      case 2: obstacle.addImage(obstacleL1);
              break;
      default: break;
    }        

  }

}

function spawnStones(){
  if(frameCount % 30 === 0){
    stone = createSprite(800,200,30,30)
    stone.scale = 0.3
    stone.velocityX = -7
    stone.y = Math.round(random(50,380))
    stoneGroup.add(stone)
    
    var ran = Math.round(random(1,2));
    switch(ran) {
      case 1: stone.addImage(obstacleS);
              break;
      case 2: stone.addImage(obstacleS1);
              break;
      default: break;
    }

  }

}