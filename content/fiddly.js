/*
place breakpoint here:
    Tp.sendBytePacket(kr(Hc[e(305)], Xi[e(285)])),
declare this:
    window.send = Tp.sendBytePacket;
    window.squish = kr;
    window.token = Hc.token;
    window.magicNumber = 21;
*/

var uwu = "safe to run… probably";

window.addEventListener("keydown", (e) => {
    //key of your choice, I'm using `f` 
    if ((e.key == "f" || e.key == "F") && uwu == "safe to run… probably") {
        uwu = setInterval(() => {
            send(squish(token, magicNumber));
        }, 100);
    };
});

window.addEventListener("keyup", (e) => {
    if ((e.key == "f" || e.key == "F")) {
        clearInterval(uwu);
        uwu = "safe to run… probably";
    };
});
