var dog, happyDog, database, foodS, foodStock;
var dogImg,dogImg1;
var db;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250,300);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  db = firebase.database();
  console.log(db);

  foodStock = db.ref('Food');
  foodStock.on("value",readStock,showError);
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  text(mouseX +","+mouseY,mouseX,mouseY);

  textSize(20);
  stroke(255);
  fill(255);
  text("Press Up Arrow to Feed Drago Milk!!",100,50);
  if(foodS != undefined){
    
    if(keyWentDown(UP_ARROW)){
      writeStock();
      dog.addImage(dogImg1);
    }
  
    
    text("Milk Stock :  "+ foodS, 170,100);
  }
  
}

function readStock(foodData){
  foodS = foodData.val();
  console.log(foodS);
}

function showError(err){
  console.log("Error :-  "+err);
}

function writeStock()
{
  foodS = foodS <=0? 0 : foodS-1;
  db.ref('/').update({
    Food : foodS
  });
}