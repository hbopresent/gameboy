var Gameboy = (function(window, document) {
  var screenLED = document.getElementById("screenLED");
  var gameDisplay = document.getElementById("gameDisplay");
  var gameListPage = document.getElementById("gameListPage");
  var aimer = document.getElementById("aimer");
  var keyUp = document.getElementById("keyUp");
  var keyDown = document.getElementById("keyDown");
  var keyLeft = document.getElementById("keyLeft");
  var keyRight = document.getElementById("keyRight");
  var gameboyBtnA = document.getElementById("gameboyBtnA");
  var gameboyBtnB = document.getElementById("gameboyBtnB");
  var settingBtnA = document.getElementById("settingBtnA");
  var settingBtnB = document.getElementById("settingBtnB");
  var gameListAry = ["Super Mario", "Dragon Ball", "StarCraft", "Diablo", "NBA 2K17", "Pokemon GO"];
  var index = 0;
  var direction = null;
  // var gameloop = null;
  // var count = 0;

  // render game interface
  var startGameboy = function() {
    // renderModule.drawSnake();
    // renderModule.createFood();
    // renderModule.paint();

    keyControl();
    // gameloop = setInterval( function() {
    //   count++;
    //   if(count <= 2) {
    //     renderModule.paint();
    //   }
    // }, 100);
  };

  // key controller
  var keyControl = function() {
    document.onkeydown = function(e) {
      var keycode = e.code;
      switch(keycode) {
        case "ArrowLeft":
          direction = "left";
          setTriggerStyle(keycode);
          moveAimer(direction);
          break;
        case "ArrowUp":
          direction = "up";
          setTriggerStyle(keycode);
          moveAimer(direction);
          break;
        case "ArrowRight":
          direction = "right";
          setTriggerStyle(keycode);
          moveAimer(direction);
          break;
        case "ArrowDown":
          direction = "down";
          setTriggerStyle(keycode);
          moveAimer(direction);
          break;
        case "Numpad1":
          setTriggerStyle(keycode);
          aimer.style.animation = "animation2 ease-out 0.3s forwards";
          setTimeout(playVideo, 400);
          break;
        case "Numpad2":
          setTriggerStyle(keycode);
          break;
        case "KeyZ":
          setTriggerStyle(keycode);
          break;
        case "KeyX":
          setTriggerStyle(keycode);
          break;
      }
    }
  };

  // clear animation
  var clearAnimation = function(e) {
    if(e.animationName == "animation2") {
      aimer.style.animation = "";
    }
  };

  // move aimer
  var moveAimer = function(direction) {
    // move to top
    if(direction == "up") {
      if(aimer.style.top == "0px" || aimer.style.top == "") {}
      else {
        aimer.style.top = (aimer.offsetTop - 55) + "px";
        index -= 1;
        stylizeGameList(index);
      }
    }
    // move to bottom
    if(direction == "down") {
      var offset = ((gameListPage.children.length-2) * 55);
      if(aimer.style.top == offset + "px") {}
      else {
        aimer.style.top = (aimer.offsetTop + 55) + "px";
        index += 1;
        stylizeGameList(index);
      }
    }
  };

  var setTriggerStyle = function(keycode) {
    switch(keycode) {
      case "ArrowLeft":
        keyLeft.classList.add("triggerStyle");
        break;
      case "ArrowUp":
        keyUp.classList.add("triggerStyle");
        break;
      case "ArrowRight":
        keyRight.classList.add("triggerStyle");
        break;
      case "ArrowDown":
        keyDown.classList.add("triggerStyle");
        break;
      case "Numpad1":
        gameboyBtnA.classList.add("triggerStyle");
        break;
      case "Numpad2":
        gameboyBtnB.classList.add("triggerStyle");
        break;
      case "KeyZ":
        settingBtnA.classList.add("triggerStyle");
        break;
      case "KeyX":
        settingBtnB.classList.add("triggerStyle");
        break;
    }
  };

  var clearTriggerAni = function(e) {
    if(e.animationName == "triggerStyle") {
      e.target.classList.remove("triggerStyle");
    }
  }

  var stylizeGameList = function(index) {
    for(var i = 0 ; i < gameListAry.length ; i++) {
      document.getElementById(gameListAry[i]).style.color = "#FFF";
    }
    document.getElementById(gameListAry[index]).style.color = "#ff00ea";
  };

  var playVideo = function() {
    var selectedGame = gameListAry[index];
    gameListPage.style.visibility = "hidden";
    if(selectedGame == "Dragon Ball") {
      document.getElementById("dragonBallVideo").style.visibility = "visible";
      document.getElementById("dragonBallVideo").play();
    }
  };

  var initialize = function() {
    keyUp.addEventListener("animationend", clearTriggerAni);
    keyRight.addEventListener("animationend", clearTriggerAni);
    keyDown.addEventListener("animationend", clearTriggerAni);
    keyLeft.addEventListener("animationend", clearTriggerAni);
    gameboyBtnA.addEventListener("animationend", clearTriggerAni);
    gameboyBtnB.addEventListener("animationend", clearTriggerAni);
    settingBtnA.addEventListener("animationend", clearTriggerAni);
    settingBtnB.addEventListener("animationend", clearTriggerAni);


    aimer.addEventListener("animationend", clearAnimation);
    gameListPage.focus();

    startGameboy();
  };

  return {
    init: initialize
  }
}(window, document));
Gameboy.init();
