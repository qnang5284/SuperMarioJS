// initialize kaboom.js with stated settings
kaboom ( {
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
});

// sets the "canvas" for the game to run into
scene("game", () => {

});

// Starts game loop
start("game");