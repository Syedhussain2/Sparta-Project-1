document.addEventListener('DOMContentLoaded', function(){
  // // Frames are needed in order to make the game ready for play, we will update the display 50times per sec, which is similar to the movies.
  // // first step is to create a new function called updateGameArea().
  // // in the myGameArea objectm add an interval which will run the updateGameArea function every 20th millisecond, which is 50times per second.  also add a function called clear() , which will clear the entire canvas.
  // // in the compoent constructor, add a function called update(), to handle the drawing of the component. the updategamearea() function calls the clear and the update method. the result is that the component is drawn and cleared 50times per sec
  //Global variables
  let gridsize = 16
  let canvas_width = gridsize*32;
  let canvas_height = gridsize*32;
  let difficulty = 1; // 1 = easy, 2 = medium, 3 = hard
  let startButton = document.getElementById('StartBtn');
  let maxlength = 5; // max length of default snake
  var snakebody = []; // new variable snake array
  let color = 'rgb(69, 205, 45)'
  let Score = 0;
  var food = {
    x:gridsize*16,
    y:gridsize*16
  };
  let startY = gridsize*16;
  let startX = gridsize*2;
  let old_direction; // i store the old direction it was traveling in
  let collision = 0;
  var score;
  var snake_dir_x = gridsize;
  var snake_dir_y = 0;
  var audio = new Audio('Super_Mario_Bros.-Mushroom_Sound_Effect-yysnM407rjE.mp3');
  // functions
  function startGame() {
    myGameArea.start();
    startButton.style.display = 'none';
  }
  startButton.addEventListener('click', startGame);
  var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
      this.canvas.width = canvas_width;
      this.canvas.height = canvas_height;
      this.context = this.canvas.getContext("2d"); // allow us to do things on the canvas
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval (updateGameArea, 100/difficulty);
      window.addEventListener('keydown', function(e){
        myGameArea.changeDirection = e.keyCode;
      })
    },
    clear: function() {
      this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    } // above is the var myGameArea, this is an object which has functions and properties relating to the games area, whenever i need to change the games area i will call functions inside example clear the game area, which is basically removing the location or refreshing the canvas eachtime the element moves,
  }
  // draw snake function , makes each snake and puts it inside the snake array.
  var count;
  function draw_snake(){
    count = 0;
    context = myGameArea.context;
    snakebody.forEach(function(entry) {
      context.fillStyle = color;
      context.fillRect(entry.x, entry.y,gridsize-1,gridsize-1);
      count ++;
      //check if head = body if so its game over
      if (startX == entry.x && startY == entry.y && count !=1){
        location.reload();
      };
    });
  };
  // gives you a random number between 0 and 1, you want a number between 5 and 15, your max -minimum
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function draw_food(){
    context = myGameArea.context;
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, gridsize-1, gridsize-1);
  }
  function drawScore() {
    context = myGameArea.context;
    context.font = "16px Arial";
    context.fillStyle = "rgb(28, 132, 227)";
    score = maxlength - 5;
    context.fillText("Score: "+ score, 8, 20);
  }
  function updateSnakePos(){
    startX = startX + snake_dir_x
    startY = startY + snake_dir_y
  }
  function updateGameArea(){
    myGameArea.clear();
    draw_snake();
    draw_food();
    drawScore();
    // conditional statement determined by the latest keyCode value
    //left
    if (myGameArea.changeDirection === 37 && snake_dir_x === 0 && collision === 0) {
      snake_dir_x = - gridsize;
      snake_dir_y = 0;
    }
    //right
    if (myGameArea.changeDirection === 39 && snake_dir_x === 0 && collision === 0) {
      snake_dir_y = 0;
      snake_dir_x = gridsize;
    }
    if (myGameArea.changeDirection === 38 && snake_dir_y === 0 && collision === 0) {
      snake_dir_y = - gridsize;
      snake_dir_x = 0;
    }
    if (myGameArea.changeDirection === 40 && snake_dir_y === 0 && collision === 0) {
      snake_dir_y = gridsize;
      snake_dir_x = 0;
    }
    updateSnakePos();
    if (startY === -gridsize || startY === (canvas_height) || startX === -gridsize || startX === (canvas_height) ){
      collision = 1 // when collision occurs it stops,
      location.reload();
    }
    snakebody.unshift({x:startX, y:startY});
    if (snakebody.length > maxlength){
      snakebody.pop();
    }
    if (startX === food.x && startY === food.y) {
      maxlength++;
      audio.play();
      food.x = getRandomInt(0, 31) * gridsize;
      food.y = getRandomInt(0, 31) * gridsize;
    }
    // added startX and startY at the start of the array.If the length of the snake goes over the maxlength then pop anything after. making the default snake 5
  }
})
