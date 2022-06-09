// initialize kaboom.js with stated settings
kaboom ( {
    background: [134, 135, 247],
    width: 320,
    height: 240,
    scale: 2,
});

// Let's load all the sprites
loadRoot("assets/sprites/");
// loadAseprite loads a sprite from Aseprite software. The json is created with Aseprite and contains lines referring to animations and such
// animations can be played with the .play() method. 
loadAseprite("mario", "Mario.png", "Mario.json");
loadAseprite("enemies", "enemies.png", "enemies.json");

// loadSprite just loads a sprite file from the folder
loadSprite("bigMushy", "bigMushy.png");
loadSprite("brick", "brick.png");
loadSprite("castle", "castle.png");
loadSprite("cloud", "cloud.png");
loadSprite("coin", "coin.png");
loadSprite("emptyBox", "emptyBox.png");
loadSprite("ground", "ground.png");
loadSprite("hill", "hill.png");
loadSprite("pipe", "pipe.png");
loadSprite("pipeBottom", "pipeBottom.png");
loadSprite("pipeTop", "pipeTop.png");
loadSprite("questionBox", "questionBox.png");
loadSprite("shrubbery", "shrubbery.png");

// Next: create level maps




