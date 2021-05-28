var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var bikes, bike1, bike2, bike3, bike4, track;

function preload() {
  ground = loadImage("images/ground.png");
  track_image = loadImage("images/track.jpg");
  //car1_image = loadImage("images/car1.png");
  //car2_image = loadImage("images/car2.png");
  //car3_image = loadImage("images/car3.png");
  //car4_image = loadImage("images/car4.png");
  bike1_image = loadImage("images/bike1.jpg");
  bike2_image = loadImage("images/bike2.jpg");
  bike3_image = loadImage("images/bike3.jpg");
  bike4_image = loadImage("images/bike4.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  bike1_image.scale = 0.1;
  bike2_image.scale = 0.1;
  bike3_image.scale = 0.1;
  bike4_image.scale = 0.1;

}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
