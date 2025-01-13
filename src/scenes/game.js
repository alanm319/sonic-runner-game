import k from "../kaplayCtx";
import {makeSonic} from "../entities/sonic";
import {makeMotobug}  from "../entities/motobug";
import {makeRing} from "../entities/ring";
export default function game(citySfx) {
    k.setGravity(5100);
    //const citySfx = k.play("live_and_learn", {volume:0.2, loop: true});
    citySfx.volume = 0.4;
    
    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
        k.add([k.sprite("chemical-bg"), k.pos(bgPieceWidth * 2, 0), k.scale(2), k.opacity(0.8)]),
    ];

    const platformWidth = 1280;
    const platforms = [
        k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
        k.add([k.sprite("platforms"), k.pos(platformWidth * 4, 450), k.scale(4)]),
    ];

    let score = 0;
    let scoreMultiplyer = 0;

    const scoreText = k.add([
        k.text("Score: 0", {font: "mania", size: 72}),
        k.pos(20, 20),
    ]);

    const sonic = makeSonic(k.vec2(200, 745));
    sonic.setControls();
    sonic.setEvents();
    sonic.onCollide("enemy", (enemy) => {
        if (!sonic.isGrounded()) {
            k.play("destroy", { volume: 0.2});
            k.play("hyper-ring", {volume: 0.2});
            k.destroy(enemy);
            sonic.play("jump");
            sonic.jump();
            scoreMultiplyer++;
            score += 10 * scoreMultiplyer 
            scoreText.text = `score: ${score}`;
            if (scoreMultiplyer === 1) {
                sonic.ringCollectUI.text = "+10";
            } else {
                sonic.ringCollectUI.text = `x${scoreMultiplyer}`;
            }
            k.wait(1, () =>sonic.ringCollectUI.text = "");
            return;
        }
        k.play("hurt", {volume: 0.5});
        k.setData("current-score", score);
        k.go("gameover", citySfx);
    });
    sonic.onCollide("ring", (ring) => {
        k.play("ring", {volume: 0.5});
        k.destroy(ring);
        score++;
        scoreText.text = `score: ${score}`;
        sonic.ringCollectUI.text = "+1";
        k.wait(1, ()=> sonic.ringCollectUI.text = "");
    });
    
    let gameSpeed = 1000;
    k.loop(1, () => {
        gameSpeed += 10;
    });

    const spawnMotobug = () => {
        const motobug = makeMotobug(k.vec2(1950, 773));
        motobug.onUpdate( () => {
            if (gameSpeed < 3000) {
                motobug.move(-(gameSpeed + 300), 0);
                return;
            }
            motobug.move(-gameSpeed, 0);
        });

        motobug.onExitScreen(() => {
            if (motobug.pos.x < 0) {
                k.destroy(motobug);
            }
        });

        const waitTime = k.rand(0.5, 2.5);
        const highRing = k.rand(0, 1) < 0.75;
        k.wait(waitTime, () => {
            spawnMotobug(highRing);
        });
    };
    spawnMotobug();

    const spawnRing = (highRing_ = false) => {
        const ringHeight = highRing_? 500 : 745;
        const ring = makeRing(k.vec2(1950, ringHeight));
        ring.onUpdate( () => {
            ring.move(-gameSpeed, 0);
        });

        ring.onExitScreen(() => {
            if (ring.pos.x < 0) {
                k.destroy(ring);
            }
        });
        
        const waitTime = k.rand(0.01, 3);
        const highRing = k.rand(0, 1) < 0.25;
        k.wait(waitTime, () => {
            spawnRing(highRing);
        });
    };
    spawnRing();

    k.add([
        k.rect(1920, 3000),
        k.opacity(0),
        k.area(),
        k.pos(0, 832),
        k.body({isStatic: true}),
    ]);

    k.onUpdate(() => {
        if (sonic.isGrounded()) {
            scoreMultiplyer = 0;
        }
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
            platforms.push(platforms.shift());
        }

        platforms[0].move(-gameSpeed, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);
    });
}