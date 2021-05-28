class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    bike1 = createSprite(100,200);
    bike1.addImage("bike1",bike1_image);
    bike2 = createSprite(300,200);
    bike2.addImage("bike2",bike2_image);
    bike3 = createSprite(500,200);
    bike3.addImage("bike3",bike3_image);
    bike4 = createSprite(700,200);
    bike4.addImage("bike4",bike4_image);
    bikes = [bike1, bike2, bike3, bike4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getBikesAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track_image,0, - displayHeight*4,displayWidth,displayHeight*5);

      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        bikes[index-1].x = x;
        bikes[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,75,75);
          bikes[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = bikes[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance > 500) {
      gameState = 2;
      player.rank+= 1;
      Player.updateBikesAtEnd(player.rank);
    }

    drawSprites();
  }
  end() {
    console.log("gameEnded");
    console.log(player.rank);
  }
}
