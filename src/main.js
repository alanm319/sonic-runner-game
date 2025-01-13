import k from "./kaplayCtx";
import game from "./scenes/game";
import mainMenu from "./scenes/mainMenu";
import gameover from "./scenes/gameover";
import title from "./scenes/title";

k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("platforms", "graphics/platforms.png");
k.loadSprite("sonic", "graphics/sonic.png", {
    sliceX: 8,
    sliceY: 2,
    anims: {
        run: {from: 0, to: 7, loop: true, speed: 30},
        jump: {from: 8, to: 15, loop: true, speed: 60},
    },
});
k.loadSprite("ring", "graphics/ring.png", {
    sliceX: 16,
    sliceY: 1,
    anims: {
        spin: {from: 0, to: 15, loop: true, speed: 30},
    },
});
k.loadSprite("motobug", "graphics/motobug.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
        run: {from: 0, to: 4, loop: true, speed: 8},
    },
});

k.loadFont("mania", "fonts/mania.ttf");

k.loadSound("live_and_learn", "sounds/live_and_learn.mp3");
k.loadSound("city", "sounds/city.mp3");
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("select", "sounds/select.mp3");

k.scene("title", title);
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("gameover", gameover);


k.go("title");