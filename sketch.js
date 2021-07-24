//Create variables here
var database;
var dog, sadDog,happyDog
var foodObj
var foodS,foodStock

var fedTime, lastFed, feed,addFood



function preload()
{ sadDog= loadImage("images/dogImg.png");
happyDog= loadImage("images/dogImg1.png");

	//load images here
}

function setup() {

 database = firebase.database();
   createCanvas(1000,400);

   foodObj= new Food();
   foodStock= database.ref('Food');
   foodStock.on('value',readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale= 0.15;
  //foodObj= new Food(200,300);
  feed= createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog);
  

  /*foodstock= database.ref("Food");
  foodstock.on("value",readStock)
  //fill('black')*/

 addFood = createButton("Add food ");
 addFood.position(800,95);
 addFood.mousePressed(addFoods)
//!!!!
}


function draw() { 
  background(46, 139, 87);
  foodObj.display();
  fedTime= database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed= data.val();
  });
  fill(255,255,254);
 textSize(15);
 if(lastFed >= 12){
   text("LAST FEED: "+ lastFed%12 + "PM",350,30)
}
else if(lastFed == 0){
  text("LAST FEED: 12AM ",350,30);
}
else{
  text("LAST FEED: " + lastFed +"AM" , 350 , 30)
}
drawSprites();
  //!!!
}
//read stock function 

function readStock(data){
  foodS= data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
 //function to feed dog
   dog.addImage(happyDog);
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update( {
   Food:foodObj.getFoodStock(),
    Feedtime:hour()
 
  })
 }

 function addFoods(){
  foodS++;
  database.ref('/').update({
  Food: foodS  
  })//!!!!
 }










