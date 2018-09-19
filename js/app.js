document.addEventListener('DOMContentLoaded', function(){


  //
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
      myGameArea.changeDirection = 39; // 39 is go right
      this.context = this.canvas.getContext("2d"); // allow us to do things on the canvas
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval (updateGameArea, 100/difficulty);
      window.addEventListener('keydown', function(e){
        myGameArea.changeDirection = e.keyCode;
        console.log(myGameArea.changeDirection);
      })
    },
    clear: function() {
      this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    } // above is the var myGameArea, this is an object which has functions and properties relating to the games area, whenever i need to change the games area i will call functions inside example clear the game area, which is basically removing the location or refreshing the canvas eachtime the element moves,
  }



  // // adding square on the canvas (snake head)
  // function Snake(width, height, color, x, y) {
  //   this.width = width;
  //   this.height = height;
  //   this.speedY = 0;
  //   this.speedX = 0;
  //   this.x = x;
  //   this.y = y;
  //   this.update = function(){
  //     context = myGameArea.context;
  //     context.fillStyle = color;
  //     context.fillRect(this.x, this.y, this.width, this.height);
  //   };
  //   //
  //   // this.newSnake = function() {
  //   //   this.x += this.speedX;
  //   //   this.y += this.speedY;
  //   // };
  // }

  function draw_snake(){
    context = myGameArea.context;
    snakebody.forEach(function(entry) {

    context.fillStyle = color;
    context.fillRect(entry.x, entry.y,gridsize,gridsize);
  });
};


  let startY = gridsize*16;
  let startX = gridsize*2;



  let old_direction; // i store the old direction it was traveling in
  let collision = 0
  function updateGameArea(){
    myGameArea.clear();
    // var myGameSnake = new Snake(gridsize, gridsize, "rgb(69, 205, 45)", startX, startY);
    // var myGameSnake = new Snake(gridsize+4, gridsize+4, "rgb(69, 205, 45)", startX+gridsize, startY+gridsize);
    // myGameSnake.update();
    draw_snake();

    // conditional statement determined by the latest keyCode value
    //left
    if (myGameArea.changeDirection === 37 && old_direction !== 39 && collision === 0) {
      startX = startX - gridsize;
      old_direction = 37
    }
    //right
    if (myGameArea.changeDirection === 39 && old_direction !== 37 && collision === 0) {
      startX = startX + gridsize ;
      old_direction = 39
      // console.log(startX);
    }
    if (myGameArea.changeDirection === 38 && old_direction !== 40 && collision === 0) {
      startY = startY-  gridsize ;
      old_direction = 38
    }
    if (myGameArea.changeDirection === 40 && old_direction !== 38 && collision === 0) {
      startY = startY + gridsize ;
      old_direction = 40
    }
    else {
      myGameArea.changeDirection = old_direction
    }
    if (startY < -16 || startY === (canvas_height + 16) || startX < -16 || startX === (canvas_width + 16)){
      collision = 1 // when collision occurs it stops,
      location.reload();
    }

    snakebody.unshift({x:startX, y:startY});
    if (snakebody.length > maxlength){
      snakebody.pop();
    }  // added startX and startY at the start of the array.If the length of the snake goes over the maxlength then pop anything after. making the default snake 5

  }
})
