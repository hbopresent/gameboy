var Gameboy = (function(window, document) {
  var screenLED = document.getElementById("screenLED");
  var gameDisplay = document.getElementById("gameDisplay");
  var keyUp = document.getElementById("keyUp");
  var keyDown = document.getElementById("keyDown");
  var keyLeft = document.getElementById("keyLeft");
  var keyRight = document.getElementById("keyRight");
  var gameboyBtnA = document.getElementById("gameboyBtnA");
  var gameboyBtnB = document.getElementById("gameboyBtnB");
  var settingBtnA = document.getElementById("settingBtnA");
  var settingBtnB = document.getElementById("settingBtnB");
  var canvas = document.getElementById("gameCanvas");
  var gameStage = canvas.getContext("2d");
  var gameStageWidth = 250;
  var gameStageHeight = 225;
  var state = "gamboy";
  var direction = null;
  var gameloop = null;
  var count = 0;

  // render game interface
  var startGameboy = function() {
    renderModule.drawSnake();
    renderModule.createFood();
    renderModule.paint();
    keyControl();
    gameloop = setInterval( function() {
      count++;
      if(count <= 2) {
        renderModule.paint();
      }
    }, 100);
  };

  // key controller
  var keyControl = function() {
    document.onkeydown = function(e) {
      var keycode = e.keyCode;
      switch(keycode) {
        case 37:
          if(direction !== "right") {
            direction = "left";
          }
          break;
        case 38:
          if(direction !== "dowwn") {
            direction = "up";
          }
          break;
        case 39:
          if(direction !== "left") {
            direction = "right";
          }
          break;
        case 40:
          if(direction !== "up") {
            direction = "down";
          }
          break;
      }
    }
  };

  // snake module
  var snake = {
    body: [],
    size: 10,
    stylize: function(xCord, yCord) {
      console.log("xCord: " + xCord);
      console.log("yCord: " + yCord);
      gameStage.fillStyle = "green";
      gameStage.fillRect(xCord*this.size, yCord*this.size, this.size, this.size);
    }
  };

  // food module
  var food = {
    xCord: null,
    yCord: null,
    size: 10,
    stylize: function(xCord, yCord) {
      gameStage.fillStyle = "red";
      gameStage.fillRect(xCord*this.size, yCord*this.size, this.size, this.size);
    }
  };

  var renderModule = {
    paint: function() {
      gameStage.fillStyle = "transparent";
      gameStage.fillRect(0, 0, gameStageWidth, gameStageHeight);

      var snakeXCord = snake.body[0].xCord;
      var snakeYCord = snake.body[0].yCord;
      // console.log(snakeXCord);
      // console.log(snakeYCord);

      if(direction == 'right') {
        snakeXCord++;
      }
      else if(direction == 'left') {
        snakeXCord--;
      }
      else if (direction == 'up') {
        snakeYCord--;
      }
      else if(direction == 'down') {
        snakeYCord++;
      }

      if(snakeXCord == -1 || snakeYCord == -1 ||
        snakeXCord == gameStageWidth/snake.size ||
        snakeYCord == gameStageHeight/snake.size) {
          // renderModule.checkCollision(snakeXCord, snakeYCord, snake.body)
          // console.log("=================================");
          // console.log("snakeXCord: " + snakeXCord);
          // console.log("snakeYCord: " + snakeYCord);
          // console.log("gameStageWidth: " + gameStageWidth);
          // console.log("gameStageHeight: " + gameStageHeight);
          // console.log("gameStageWidth/snake.size: " + gameStageWidth/snake.size);
          // console.log("gameStageHeight/snake.size: " + gameStageHeight/snake.size);
          // console.log("=================================");
          gameStage.clearRect(0, 0, gameStageWidth, gameStageHeight);
          gameloop = clearInterval(gameloop);
          console.log("clear gameloop");
      }

      // check collison (snake & food)
      if(snakeXCord == food.xCord && snakeYCord == food.yCord) {
        var tail = {xCord: snakeXCord, yCord: snakeYCord};
        // score ++;
        renderModule.createFood(); //Create new food
      }
      else {
        console.log("====== before poping snake.body ======");
        console.log(snake.body);
        console.log("====== before adding tail ======");
        console.log(tail);

        var tail = snake.body.pop(); //pops out the last cell
        console.log("====== after adding tail ======");
        console.log(tail.xCord);
        console.log(tail.yCord);
        tail.xCord = snakeXCord;
        tail.yCord = snakeYCord;

        console.log("====== after poping snake.body ======");
        console.log(snake.body);
        console.log(snkae.body);
      }
      snake.body.unshift(tail);

      for(var i = 0; i < snake.body.length; i++) {
        snake.stylize(snake.body[i].xCord, snake.body[i].yCord);
        // console.log("snake.body[i]");
        // console.log(snake.body[i]);
      }
      food.stylize(food.xCord, food.yCord);
    },
    drawSnake: function() {
      var length = 4;
      for(var i = length-1 ; i >=0 ; i--) {
        snake.body.push({xCord: i, yCord: 0});
      }
    },
    createFood: function() {
      food.xCord = Math.floor((Math.random() * 25) + 1);
      food.yCord =  Math.floor((Math.random() * 22.5) + 1);

      for(let i = 0 ; i < snake.length ; i++) {
        var snakeX = snake.body[i].xCord;
        var snakeY = snake.body[i].yCord;
      }
      if(food.xCord === snakeX && food.yCord === snakeY) {
        food.xCord = Math.floor((Math.random() * 25) + 1);
        food.yCord = Math.floor((Math.random() * 22.5) + 1);
      }
    },
    checkCollision: function(x, y, snakeBody) {
      // console.log("check collision!!");
      // console.log("x: " + x);
      // console.log("y: " + y);

      for(var i = 0 ; i < snakeBody.length ; i++) {
        if(snakeBody[i].xCord === x && snakeBody[i].yCord === y) {
          console.log("return true!!!!!");
          return true;
        }
      }
      return false;
    }
  };



  var initialize = function() {
    direction = "right";
    startGameboy();
  };

  return {
    init: initialize
  }
}(window, document));
Gameboy.init();
