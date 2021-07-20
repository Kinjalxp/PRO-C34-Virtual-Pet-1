var dog, happyDogImg, dogImg, happyDog; 
var database;
var foodS, foodStock;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var myEngine, myWorld;
var foodCount = 20;


function preload()
{
	happyDogImg = loadImage("images/happydog.png");
  dogImg = loadImage("images/dogImage.png");

}

function setup() {
	createCanvas(500,500);
  
	myEngine = Engine.create();
	myWorld = myEngine.world;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

    dog = createSprite(250,250,10,10);
    dog.addImage(dogImg);
    dog.scale = 0.3;
    
}

function draw() {  
  
  background(46,139,87);

  fill(255,255,255);
  text("Press up arrow key to feed the dog",150,20);
  text("Food remaining: " + foodCount, 200,125);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    happyDog = createSprite(250,250,10,10);
    happyDog.addImage(happyDogImg);
    happyDog.scale = 0.3;
    dog.scale = 0;

    foodCount = foodCount - 1;
  }
  drawSprites();
  
}

function readStock(data){
    foodS = data.val();
}

function writeStock(x){
  
  if(x<=0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}