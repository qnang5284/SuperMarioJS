// initialize kaboom.js with stated settings
kaboom ( {
    background: [134, 135, 247],
    width: 320,
    height: 240,
    scale: 2,
});

// Let's load all the sprites L:\Entorno_Desarrollo\SuperMarioJS\assets
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

// Levels are created as an array of Strings, which forms some kind of "layout"
// We can add a new level as a new element of the array.
const LEVELS = [
    [
      "                                                                                                ",
      "                                                                                                ",
      "                                                                                                ",
      "                                                                                                ",
      "                                                                                                ",
      "                                                                                                ",
      "                                                                                                ",
      "      -?-b-                                                                                     ",
      "                                                    ?        ?                                  ",
      "                                                                                                ",
      "                                      _                 ?                                       ",
      "                                 _    |                                                         ",
      "                           _     |    |                _                                        ",
      "       E                   |     |    |   E   E        |                            H           ",
      "================     ===========================================================================",
      "================     ===========================================================================",
    ],
    [
      "                                                                                             ",
      "                                                                                             ",
      "                                                                                             ",
      "                                       ?                                                     ",
      "                                                                                             ",
      "                                   -?-                                                       ",
      "                                                                                             ",
      "      -?-b-                  -?-                                                             ",
      "                                                                                             ",
      "                                                                                             ",
      "                                                                                             ",
      "                                                                                             ",
      "       _                                            _                                        ",
      "       |                                            |          E    E            H           ",
      "================     ========================================================================",
      "================     ========================================================================",
    ]
  ];

// Then we need to define a relationship between each symbol in the layout and each sprites.
const levelConf = {
    // grid size, width and height of each square in the grid.
    width: 16,
    height: 16, 
    // pos specifies the position of the map in the Kaboom canvas. Typically, (0,0)
    pos: vec2(0, 0),

    // then we define each object as a list of components
    "=": () => [
        sprite("ground"),   // sprite assigned to the symbol
        area(),             // area the sprite occupies
        solid(),            // if set, the object can collide with others
        origin("bot"),      // don't know what this does yet
        "ground"            // name
    ],
    "-": () => [
        sprite("brick"),
        area(),
        solid(),
        origin("bot"),
        "brick"
    ],
    "H": () => [
        sprite("castle"),
        area({width: 1, height: 240}), 
        origin("bot"),
        "castle"
    ],
    "?": () => [
        sprite("questionBox"),
        area(),
        solid(),
        origin("bot"),
        'questionBox',
        'coinBox',
    ],
    "b": () => [
        sprite("questionBox"),
        area(),
        solid(),
        origin("bot"),
        'questionBox',
        'mushyBox'
    ],
    "!": () => [
        sprite("emptyBox"),
        area(),
        solid(),
        // bump(),              // custom component
        origin("bot"),
        'emptyBox'
    ],
    "c": () => [
        sprite("coin"),
        area(),
        solid(),
        //bump(64, 8),          // custom component
        cleanup(),
        lifespan(0.4, {fade: 0.01}),
        origin("bot"),
        "coin"
    ],
    "M": () => [
        sprite("bigMushy"),
        area(),
        solid(),
        //patrol(10000),        // custom component
        body(),                 // The sprite is affected by gravity
        cleanup(),
        origin("bot"),
        "bigMushy"
    ],
    "|": () => [
        sprite("pipeBottom"),
        area(),
        solid(),
        origin("bot"),
        "pipe"
    ],
    "_": () => [
        sprite("pipeTop"),
        area(),
        solid(),
        origin("bot"),
        "pipe"
    ],
    "E": () => [
        sprite("enemies", { anim: 'Walking'}),
        area({width: 16, height: 16}),
        solid(),
        body(),
        //patrol(50),
        //enemy(),              // custom component
        origin("bot"),
        "badGuy"
    ],
    "p": () => [
        sprite("mario", { frame: 0 }),
        area({ width: 16, height: 16 }),
        body(),
        //mario(),              // custom component
        //bump(150, 20, false),
        origin("bot"),
        "player"
    ]
};

// Let's add a scene, now.
// Kaboom allows us to group logic and levels together.
// The first scene will be a Start Game screen. The game will go to that
// Scene by default.
scene("start", () => {

    // add component
    add([
        text("Dale al enter", {size: 24}),
        pos(vec2(160, 120)),
        origin("center"),
        color(255, 255, 255),
    ]);

    // set an event, go to next scene at an enter key release.
    onKeyRelease("enter", () => {
        go("game"); 
    });
});

// the go() function allows to transition between scenes.
go("start");


scene("game", (levelNumber = 0) => {
    
    // Layers in the game scene, typically one for the background, another
    // for the actions taking place and the last is for User Interface
    layers([
        "bg",
        "game",
        "ui",
    ], "game");

    // define the level as a constant, with a map and a configuration
    const level = addLevel(LEVELS[levelNumber], levelConf);

    // sprites in the background and ui layers are not to be interacted with
    add([
        sprite("cloud"),
        pos(20, 50),
        layer("bg")
    ]);

    add([
        sprite("hill"),
        pos(32, 208),
        layer("bg"),
        origin("bot")
    ]);

    add([
        sprite("shrubbery"),
        pos(200, 208),
        layer("bg"),
        origin("bot")
    ]);

    add([
        text(`Level ${levelNumber + 1}`, {size: 24}),
        pos(vec2(160, 120)),
        color(255, 255, 255), 
        origin("center"),
        layer("ui"),
        lifespan(1, {fade: 0.5})
    ]);

    const player = level.spawn("p", 1, 10);

});