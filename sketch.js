let font;
function preload() {
    font = loadFont('assets/Roboto-Bold.ttf');
}

let points;
let bounds;
function setup() {
    createCanvas(1000, 1000);
    stroke(0);
    fill(0, 0, 0);

    points = font.textToPoints('A', 0, 0, 600, {
        sampleFactor: 0.1,
        simplifyThreshold: 0
    });
    bounds = font.textBounds(' A ', 0, 0, 600);

    function shuffle(arr) {
        var j, x, i;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    }

    shuffle(points);

    console.log(points[0]);
}
// line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)

function draw() {
    background(225, 225, 225);

    // draw vertices
    beginShape(POINTS);
    stroke(0, 0, 0);
    strokeWeight(5);

    translate((width / 2) - 300, (height / 2) + 300);

    for (let i = 0; i < points.length; i++) {
        vertex(points[i].x, points[i].y);
    }
    endShape();

    // draw lines
    beginShape();
    stroke(100, 100, 100);
    strokeWeight(1);
    for (let i = 0; i < points.length; i++) {
        line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
    }
    endShape();
}