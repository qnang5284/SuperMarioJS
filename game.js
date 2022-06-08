// initialize kaboom.js with stated settings
kaboom ( {
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    background: [100, 170, 255, 1],
});

// Load all sprites from imgur
loadRoot("https://i.imgur.com/");
loadSprite("coin", "wbKxhcd.png");
loadSprite("brick", "pogC9x5.png");



// sets the "canvas" for the game to run into
scene("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj');

    // Create a map for this scene
    const map = [
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "                                                ",
        "           $                                    ",
        "                                                ",
        "                                                ",
        "==========================  ===========  =======",
    ];

    // Define configuration for each symbol in the map.
    const levelCfg = {
        width: 20, // in pixels
        height: 20,
        "=": [sprite("brick", solid())],
        '$': [sprite("coin")],
    };

    // set game level
    const gameLevel = addLevel(map, levelCfg);
});

// Starts game loop
go("game");