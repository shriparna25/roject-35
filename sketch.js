//Create variables here
var dog, happydog;
var database;
var foodS, foodStock;
var dog_img, Hdog_img;
var foodObj;
var lastFed;

function preload()
{
  //load images here
  dog_img = loadImage("images/dogImg.png");
  Hdog_img = loadImage("images/dogImg1.png");
  
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  foodObj = new Milk();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
dog = createSprite(800,200,5,25);
dog.addImage(dog_img);
dog.scale = 0.2;

feed=createButton("Feed the Dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("ADD THE FOOD");
addFood.position(700,95);
addFood.mousePressed(addFoods);



}


function draw() {  
background(46,139,87);

foodObj.display();

database.ref("FeedTime").on('value',function(data){
  lastFed = data.val();
})

 
  //add styles here

  textSize(15);
  fill("white");
 if(lastFed >= 12){
   text("Last Feed : " + lastFed%12 + "pm", 350, 30);
 }
 else if(lastFed === 0){
   text("Last Feed : 12 a.m.", 350, 30)
 }else {
   text("Last Feed : "+ lastFed + "a.m", 350, 30);
 }

  drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog(){

dog.addImage(Hdog_img);
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food : foodObj.getFoodStock(),
   FeedTime : hour()
  })

}


function addFoods(){

foodS ++;
database.ref('/').update({
  Food : foodS
})

}