# Sparta-Project-1

## Description
### For my gaming project, I made the classic  Nokia Snake game. The aim of the game is to control the snake using the keyboard arrow keys to move the snake around the playground. Random food will appear on the playground for the snake to eat and grow in size. You have to avoid collision with the walls around the playground and avoid eating your body.

## Languages used

###  Javascript, HTML5, CSS.

### How to download
1. Search for Syedhussain2 in [GitHub]
(https://github.com/Syedhussain2/Sparta-Project-1)
3. Download the files displayed.

### Live-Site
Would you like to play the game?  [here](https://syedhussain2.github.io/Sparta-Project-1/)

### Challenges and the Solutions
1). One of the biggest challenge was to make the food appear on the canvas without changing its location constantly each time the frames is refreshed. The food was repositioning itself because the input was inside the function gameupdate. In order for me to resolve this issue the code had to be reworked some of the code. The following changes helped solve the problem.


```javascript
function updateSnakePos(){
    startX = startX + snake_dir_x
    startY = startY + snake_dir_y
  }
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function draw_food(){
    context = myGameArea.context;
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, gridsize-1, gridsize-1);
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
```

2). Adding a score count for each time the snake eats the food or it grows was challenging, however after careful research the following solution was reached: In order for the scoring system to work, a variable was made for the score. (Var score;) , and a function which updates the score each time the snake grows

```javascript
function drawScore() {
    context = myGameArea.context;
    context.font = "16px Arial";
    context.fillStyle = "rgb(28, 132, 227)";
    score = maxlength - 5;
    context.fillText("Score: "+ score, 8, 20);
  }
```

### Learning points
1. Javascript has a lot of benefits, by developing this game it really helped me understand the fundamentals of Javascript and how to Sudocode to approach each problem individually. 
2. One of the major learning points from this week was if something is working, that doesnt mean its the correct way of solving the problem.
3. Planning the project was the core that lead to the success of the project. It is very important to plan and have effective time management.


>**Created by: Syed Hussain!**
