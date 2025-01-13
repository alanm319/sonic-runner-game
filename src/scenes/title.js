import k from "../kaplayCtx";

export default function title() {
    
    if (!k.getData("best-score")) {
        k.setData("best-score", 0);
    }

    k.add([
        k.text("SONIC RING RUN", {font: "mania", size: 96}),
        k.color(0, 0, 255),
        k.pos(k.center().x, k.center().y),
        k.anchor("center"),
    ]);

    const promptText = k.add([
        k.text("Press any button to start", {font: "mania", size: 32  }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y + 100),
    ]);

    k.onButtonPress("jump", () => {
        promptText.color = [255, 255, 0],
        k.play("select", {volume:1, loop: false});
        k.destroy(promptText);
        k.wait(0.1 , () => {
            k.add([
                k.text("Press any button to start", {font: "mania", size: 32  }),
                k.color(255, 0, 0),
                k.anchor("center"),
                k.pos(k.center().x, k.center().y + 100),
            ])
        });
        k.wait(1, ()=> k.go("main-menu"));
        //k.go("main-menu");
    });

}