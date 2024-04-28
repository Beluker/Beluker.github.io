const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
c.imageSmoothingEnabled = false;
const img = new Image();
img.src = "https://beluker.github.io/images/android-chrome-512x512.png";

const w = canvas.width = 500;
const h = canvas.height = 500;

var polygons = [];

var points = [];

var polygon1 = [{x: 100, y: 100}, {x: 250, y: 250}, {x: 400, y: 100}, {x: 300, y: 400}, {x: 75, y: 150}, {x: 100, y: 100}];
var polygon2 = [{x: 0, y: 0}, {x: 50, y: 0}, {x: 0, y: 75}, {x: 0, y: 0}];
var polygon3 = [{x: 75, y: 350}, {x: 125, y: 400}, {x: 375, y: 475}, {x: 75, y: 350}];
var polygon4 = [{x: 250, y: 100}, {x: 300, y: 50}, {x: 350, y: 100}, {x: 200, y: 225}, {x: 250, y: 100}];
polygons.push(polygon1);
polygons.push(polygon2);
polygons.push(polygon3);
polygons.push(polygon4);
var points = [];

function lerp(A, B, t){
    var i = {};
    i.x = A.x + (A.x - B.x) * t;
    i.y = A.y + (A.y - B.y) * t;
    return i;
}

function Projectile(position, vector){
    this.b = 0;
    this.v = 5;
    this.s = 5;
    this.position = position;
    this.vector = vector;

    this.draw = function(position){
        c.fillStyle = "blue"
        var y_multiplier = this.vector.y / this.vector.x;
        var x_multiplier = this.vector.x / this.vector.y;
        c.globalAlpha = 1;
        c.beginPath();
        c.arc(position.x, position.y, this.s, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.strokeStyle = "red";
        var v = {
            x: this.vector.x / (Math.hypot(this.vector.x, this.vector.y) / this.v),
            y: this.vector.y / (Math.hypot(this.vector.x, this.vector.y) / this.v)
        };
        c.moveTo(this.position.x, this.position.y);
        c.lineTo(this.position.x + v.x, this.position.y + v.y);
        c.stroke();
    }

    this.reflect = function(i, j){
        var A = polygons[i][j];
        var B = polygons[i][j + 1];
        var normal = {}, dot = {};
        normal.x = B.y - A.y;
        normal.y = -(B.x - A.x);

        var vector = Object.assign({}, this.vector);

        dot.top = vector.x * normal.x + vector.y * normal.y;
        dot.bottom = normal.x * normal.x + normal.y * normal.y;
        const x = vector.x - 2 * (dot.top / dot.bottom) * normal.x;
        const y = vector.y - 2 * (dot.top / dot.bottom) * normal.y;

        this.vector.x = x;
        this.vector.y = y;
    }

    this.check_collision = function(){
        for(var i = 0; i < polygons.length; i ++){
            this.i = i;
            var polygon = polygons[i];
            var count = 0;
            var closest = Infinity, index = null;
            var offset = {};
            var distances = [];
            offset.x = (this.vector.x / (Math.hypot(this.vector.x, this.vector.y)) * this.v);
            offset.y = (this.vector.y / (Math.hypot(this.vector.x, this.vector.y)) * this.v);
            for(var j = 0; j < polygon.length - 1; j ++){
                var a = {
                    x: polygon[j].x,
                    y: polygon[j].y
                }
                var b = {
                    x: polygon[j + 1].x,
                    y: polygon[j + 1].y
                }
                if((this.position.x + offset.x < (a.x + (this.position.y + offset.y - a.y) / (b.y - a.y) * (b.x - a.x))) && (this.position.y + offset.y < a.y != this.position.y + offset.y < b.y)){
                    count ++;
                }
            }
            if(count % 2 == 0){

            } else {
                var distances = [], closest = Infinity, index = null;
                for(var j = 0; j < polygon.length - 1; j ++){
                    this.j = j;
                    var v = {
                        x: this.vector.x / (Math.hypot(this.vector.x, this.vector.y)) * this.v,
                        y: this.vector.y / (Math.hypot(this.vector.x, this.vector.y)) * this.v
                    };
                    var A = this.position;
                    var B = { 
                        x: this.position.x + v.x * 1,
                        y: this.position.y + v.y * 1
                    }
                    var C = {
                        x: polygon[j].x,
                        y: polygon[j].y
                    }
                    var D = {
                        x: polygon[j + 1].x,
                        y: polygon[j + 1].y
                    }
                    var top = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
                    var bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
                    var t = top / bottom;
                    if(t > 0 && t < 1){
                        var o = lerp(C, D, t);
                        var s = {}, d = {}, i = {};
                        d.x = o.x - this.position.x;
                        d.y = o.y - this.position.y;
                        var dis = Math.hypot(d.x, d.y);
                        s.dis = dis;
                        i.i = this.i;
                        i.j = this.j;
                        s.i = i;
                        distances.push(s);
                    }
                }
                for(var j = 0; j < distances.length; j ++){
                    if(distances[j].dis < closest) closest = distances.dis, index = distances[j].i;
                }
                console.log(polygons[index.i][index.j], polygons[index.i][index.j + 1]);
                // this.reflect(polygons[index.i][index.j], polygons[index.i][index.j + 1]);
                this.reflect(index.i, index.j);
            }
        } 
    }

    this.update = function(){
        this.check_collision();
        if(this.position.x + this.s > w || this.position.x  - this.s < 0){
            this.vector.x = -this.vector.x;
        }
        if(this.position.y + this.s > h || this.position.y  - this.s < 0){
            this.vector.y = -this.vector.y;
        }
        this.position.x += (this.vector.x / (Math.hypot(this.vector.x, this.vector.y)) * this.v);
        this.position.y += (this.vector.y / (Math.hypot(this.vector.x, this.vector.y)) * this.v);
        this.draw(this.position);
    }
}

var projectiles = [];
projectiles.push(new Projectile({x: 120, y: 100}, {x: 1, y: 1}));

function drawPolygons(){
    for(var i = 0; i < polygons.length; i ++){
        var polygon = polygons[i];
        c.lineWidth = 1;
        c.strokeStyle = "black";
        c.beginPath();
        for(var j = 0; j < polygon.length; j ++){
            c.lineTo(polygon[j].x, polygon[j].y);
        }
        c.stroke();

        // for(var i = 0; i < points.length; i ++){

        // }
    }
}

function step(){
    requestAnimationFrame(step);
    c.globalAlpha = 1;
    c.clearRect(0, 0, w, h)
    c.globalAlpha = 1;
    drawPolygons();
    for(var i = 0; i < projectiles.length; i ++){
        projectiles[i].update();
    }
}

step();



