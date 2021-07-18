var link,ground
var obstacle
var obstacleGroup
var bomb
var gameState
var bombGroup
var celebration,celebrationImg
var score=0
var house
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
celebrationImg=loadImage("pngtree-celebration-gold-background-png-and-vector-png-image_3630921.jpg")
trex_collided=loadAnimation("trex_collided.png")

}
function setup(){
createCanvas(1000,800)
obstacleGroup=createGroup()
bombGroup=createGroup()
link=createSprite(100,750,50,50)
ground=createSprite(500,780,1000,30)
ground.velocityX=-10
gameState=0
link.addAnimation("trexRunAnimation",trex_running)
link.addAnimation("trexCollided",trex_collided)

}


function draw(){
  background("white")
  textSize(30)
  text("Score: "+ score, 500,50);
 if(gameState===0){
  if(ground.x<0){
    ground.x=500
  }
  spawnObstacles()
  if(keyDown("space")){
    link.velocityY=-12
  }
  if(keyDown("a") && frameCount%5===0){
  bomb=createSprite(link.x,link.y,20,20)
  bombGroup.add(bomb)
  bomb.velocityX=3
  }
  link.velocityY=link.velocityY+0.8
  link.collide(ground)
   if(obstacleGroup.isTouching(link)){
     gameState=1  
     link.changeAnimation("trexCollided",trex_collided)
    } 
    if(obstacleGroup.isTouching(bombGroup)){
      score=score+10
      obstacleGroup.destroyEach()
      bombGroup.destroyEach()
    }
    if(score===50){
    spawnHouse()
    }

    if(gameState===2){
      if(keyDown(RIGHT_ARROW)){
        link.x=link.x+10
      }
      if(keyDown(LEFT_ARROW)){
        link.x=link.x-10
      }
      if(keyDown(UP_ARROW)){
        link.y=link.y-10
      }
      if(keyDown(DOWN_ARROW)){
        link.y=link.y+10
      }
    }
    /*if(link.isTouching(house)){
     textSize(20)
    text("Congratulations! You Won The Game that took very long to code!",300,300)
      gameState=3
    }*/
  }
 if(gameState===1){
  background("green")
  textSize(50)
  text("You Got Poked to death",400,500)
  link.velocityY=0
  obstacleGroup.setVelocityXEach(0)
  ground.velocityX=0

 }
   
 
drawSprites()
  
}
function spawnObstacles(){
  if(frameCount%90===0){
    obstacle=createSprite(600,165,10,40)
    obstacle.velocityX=-5
    obstacle.y=Math.round(random(650,750))
    obstacleGroup.add(obstacle)
  }
}

function spawnHouse(){
  house=createSprite(400,400,100,100)

  console.log(house.position.x)
  if(house.x===500){

  }
  ground.velocityX=0
  gameState=2

}