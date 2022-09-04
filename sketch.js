let nodes = [];
class Points {
    constructor() {
        this.points = [];
        this.bounds = {};
    }

    createPoints(str, size = 200, sample = 0.1) {
        // create points array from text
        this.points = font.textToPoints(str, 0, 0, size, {
            sampleFactor: sample,
            simplifyThreshold: 0
        });

        // create text bounding box
        this.bounds = font.textBounds(str, 0, 0, size);
        noFill();
        stroke(255, 0, 0);
        // center the text using bounding box dimensions
        translate((width / 2) - (this.bounds.w / 2), (height / 2) + (this.bounds.h / 2));
        rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);

        // for each point, create a new Node instance
        this.points.forEach((point) => {
            // add each Node to a Nodes array
            let node = new Node(point.x, point.y, [255, 0, 0], undefined);
            node.createNode();
            nodes.push(node);
        });
    }
}

class Node {
    constructor(x, y, color = [0, 0, 0], weight = 5) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.weight = weight;
    }

    createNode() {
        beginShape(POINTS);
        stroke(...this.color);
        strokeWeight(this.weight);
        vertex(this.x, this.y);
        endShape();
    }
}

// class Edge {
//     constructor() {
//         this.x1 = 0;
//         this.y1 = 0;
//         this.x2 = 0;
//         this.y2 = 0;
//     }
//
//     draw() {
//
//     }
// }

let font;
function preload() {
    font = loadFont('assets/Roboto-Bold.ttf');
}

function setup() {
    let canvas = createCanvas(700, 700);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    stroke(0);
    background(200, 200, 200);

    // // shuffle points array
    // function shuffle(arr) {
    //     var j, x, i;
    //     for (i = arr.length - 1; i > 0; i--) {
    //         j = Math.floor(Math.random() * (i + 1));
    //         x = arr[i];
    //         arr[i] = arr[j];
    //         arr[j] = x;
    //     }
    //     return arr;
    // }
    // let shuffled = [...textA.points];
    // shuffle(shuffled);

    noLoop();
}


// TODO: Make each function a property of a parent constructor
function draw() {
    background(225, 225, 225);

    let points = new Points();
    points.createPoints('Hello', undefined, undefined);

    // function createPointsFromString(str) {
    //     let points = font.textToPoints(str, 0, 0, 600, {
    //         sampleFactor: 0.05,
    //         simplifyThreshold: 0
    //     });
    //
    //     let bounds = font.textBounds(str, 0, 0, 600);
    //
    //     let nodes = [];
    //     for (let point in points) {
    //         nodes.push(new Node(point.x, point.y));
    //     }
    // }

    // function drawPoints(points, bounds, color = [0, 0, 0], weight = 5) {
    //     beginShape(POINTS);
    //
    //
    //     points.forEach((point) => {
    //         stroke(...color);
    //         strokeWeight(weight);
    //
    //         vertex(point.x, point.y);
    //
    //         point.edges = 0;
    //     })
    //     endShape();
    // }

    // function drawLines(textObj, color= [0, 0, 0], distance = 50) {
    //     beginShape();
    //     stroke(...color);
    //     strokeWeight(1);
    //
    //     for (let i = 0; i < textObj.points.length; i++) {
    //         // if the next node exists
    //         if (textObj.points[i + 1]) {
    //             if (dist(textObj.points[i].x, textObj.points[i].y, textObj.points[i + 1].x, textObj.points[i + 1].y) < distance) {
    //                 line(textObj.points[i].x, textObj.points[i].y, textObj.points[i + 1].x, textObj.points[i + 1].y);
    //                 textObj.points[i].edges += 1;
    //                 textObj.points[i + 1].edges += 1;
    //             } else {
    //                 // look for the closest neighbor
    //                 for (let j = 0; j < textObj.points.length; j++) {
    //                     if (dist(textObj.points[i].x, textObj.points[i].y, textObj.points[j].x, textObj.points[j].y) < distance) {
    //                         line(textObj.points[i].x, textObj.points[i].y, textObj.points[j].x, textObj.points[j].y);
    //
    //                         console.log('test');
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //
    //     endShape();
    // }

    // function findDisconnectedPoints(textObj, color = [0, 0, 0], threshold) {
    //     beginShape(POINTS);
    //
    //     for (let i = 0; i < textA.points.length; i++) {
    //         if (textA.points[i].edges < threshold) {
    //             stroke(255, 0, 0);
    //             strokeWeight(5);
    //
    //             vertex(textA.points[i].x, textA.points[i].y);
    //
    //             console.log(textA.points[i]);
    //         }
    //     }
    //     endShape();
    // }

    // let textA = new CreatePointsFromString('Hello');
    // drawPoints(textA.points, textA.bounds,[100, 100, 100]);
    // drawLines(textA, [100, 100 ,100], 25);
    // findDisconnectedPoints(textA, [255, 0, 0], 2);

    // draw shape from vertices
    // beginShape();
    // stroke(0, 0, 0);
    // strokeWeight(1);

    // let closestDistance;
    // let closestPoint;
    // for (let i = 0; i < points.length; i++) {
    //     let distance = dist(points[i].x, points[i].y, points[points.length - 1].x, points[points.length - 1].y);
    //
    //     if (distance !== 0) {
    //         if (distance < closestDistance || !closestDistance) {
    //             closestDistance = distance;
    //             closestPoint = points[i];
    //
    //             console.log(closestDistance);
    //         }
    //     }
    // }
    // console.log(closestPoint);

    // strokeWeight(10)
    // line(points[0].x, points[0].y, closestPoint.x, closestPoint.y);

    // for (let i = 0; i < 75; i++) {
    //     if (points[i + 1]) { // draw line if next point exists
    //         line(textA.points[i].x, textA.points[i].y, textA.points[i + 1].x, textA.points[i + 1].y);
    //     } else if (!textA.points[i + 1]) { // if next point doesn't exist, draw line from the last point to the closest point
    //         line(textA.points[textA.points.length - 1].x, textA.points[textA.points.length - 1].y, textA.points[0].x, textA.points[0].y);
    //     }
    // }
    // endShape();

    // draw lines
    // beginShape();
    // stroke(100, 100, 100);
    // strokeWeight(1);
    //
    // let min = 0;
    // let max = shuffled.length;
    // for (let i = 0; i < 10; i++) {
    //     let rand = Math.floor((Math.random() * ((max + 1) - min)) + min);
    //
    //     if (shuffled[i + 1] && shuffled[rand]) {
    //         line(shuffled[rand].x, shuffled[rand].y, shuffled[rand + 1].x, shuffled[rand + 1].y)
    //     }
    // }
    // endShape();

    console.log('done');
}