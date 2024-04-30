const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;

const image = new Image();
image.src = 'https://ziggermanforum.neocities.org/apple-touch-icon.png';

var translated_offset = {};
translated_offset.x = 0;
translated_offset.y = 0;

c.translate(0, 0);


addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
});

const gravity = 0.4;

class Camera {
    constructor(parent, body){
        this.body = body;
        this.parent = parent
        this.position;

        this.position = {};
        this.position.x = this.parent.position.x - this.body.x / 2 + this.parent.body.x / 2;
        this.position.y = this.parent.position.y - this.body.y;
    }
    draw(){
        // c.globalAlpha = 0.2;
        // c.fillStyle = "aquamarine"
        // c.fillRect(this.position.x, this.position.y, this.body.x, this.body.y);
        // c.globalAlpha = 1;
    }
    pan(direction){
        //direction = "up" | "down" | "left" | "right"
        if(direction === "right" || direction === "left"){
            c.translate(-this.parent.velocity.x, 0);
            translated_offset.x += this.parent.velocity.x;
        }
    }
    pan_check(){
        if(this.position.x + this.body.x > w){
            this.pan("right");
        } else if(this.position.x < 0){
            this.pan("left");
        } 
        if(this.position.y + this.body.y > h){
            this.pan("down");
        } else if(this.position.y < 0){
            this.pan("up");
        } 
        
    }
    step(){
        this.draw();
        this.pan_check();
        this.position.x = this.parent.position.x - this.body.x / 2 + this.parent.body.x / 2;
        this.position.y = this.parent.position.y - this.body.y / 2 + this.parent.body.y / 2;
    }
}

class Player {
    constructor(x, y){
        this.grounded = true;

        this.position = {};
        this.position.x = x;
        this.position.y = y;

        this.body = {};
        this.body.x = 20;
        this.body.y = 20;

        this.velocity = {};
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.velocity.speed_multiplier = 1;
        this.velocity.maximum_magnitude = 7.5;
        this.velocity.climb_rate = 0.2;

        this.keys = {
            w: false,
            a: false,
            d: false
        };
    }
    draw(){
        // c.globalAlpha = 0.2;
        // c.fillStyle = "goldenrod";
        // c.beginPath();
        // c.arc( this.position.x + this.body.x / 2, this.position.y + this.body.y / 2, (h - this.position.y)  / 10, 0, Math.PI * 2, false);
        // c.fill();
        c.globalAlpha = 1;
        c.fillStyle = "salmon";
        c.fillRect (
            this.position.x, 
            this.position.y, 
            this.body.x, 
            this.body.y
        );
        c.fillRect (
            this.position.x - 5, 
            this.position.y + this.body.y - 5, 
            this.body.x + 10, 
            5
        );
        c.fillStyle = "aliceblue";
        c.fillRect (
            this.position.x + 4, 
            this.position.y + 4, 
            5, 
            5
        );
        c.fillRect (
            this.position.x + this.body.x - 8, 
            this.position.y + 4, 
            5, 
            5
        );
        c.fillStyle = "black";
        c.fillRect (
            this.position.x + 4, 
            this.position.y + 5.5, 
            5, 
            2
        );
        c.fillRect (
            this.position.x + this.body.x - 8, 
            this.position.y + 5.5, 
            5, 
            2
        );
    }
    handle_keys(){
        if(this.keys.w) this.velocity.y = -5;
        if(this.keys.a && Math.sqrt((this.velocity.x - this.velocity.climb_rate) ** 2) < this.velocity.maximum_magnitude) this.velocity.x -= this.velocity.climb_rate;
        else if(this.velocity.x < 0 && !this.keys.d) this.velocity.x += this.velocity.climb_rate;
        if(this.keys.d && Math.sqrt((this.velocity.x + this.velocity.climb_rate) ** 2) < this.velocity.maximum_magnitude) this.velocity.x += this.velocity.climb_rate;
        else if(this.velocity.x > 0 && !this.keys.a) this.velocity.x -= this.velocity.climb_rate;
    }
    step(){
        this.draw();
        this.handle_keys();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        if(this.position.y + this.body.y + this.velocity.y < h){
            this.velocity.y += gravity;
        } else {
            this.velocity.y = h - (this.position.y + this.body.y);
        }
    }
}

var player = new Player(240, h - 300);
var camera = new Camera(player, {x: 500, y: 200});

window.addEventListener("keydown", (e)=>{
    switch (e.key){
        case ("w" || "W"):
            if(player.grounded) player.keys.w = true;
        break

        case "a" || "A" :
        player.keys.a = true;
        break

        case "d" || "D" :
        player.keys.d = true;
        break
    }
});

window.addEventListener("keyup", (e)=>{
    switch (e.key){
        case "w" || "W" :
        player.keys.w = false;
        break

        case "a" || "A" :
        player.keys.a = false;
        break

        case "d" || "D" :
        player.keys.d = false;
        break
    }
});

function step(){
    requestAnimationFrame(step);
    c.fillStyle = "aliceblue";
    c.fillRect(translated_offset.x, 0, w, h);
    c.drawImage(image, 0, 0, image.width, image.height, -2000, 0, 4000, h);

    // c.fillStyle = "black";
    // c.fillRect(200, 100, 30, 55);

    player.step();
    camera.step();
}

step();
