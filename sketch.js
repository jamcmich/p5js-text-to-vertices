let font;
function preload() {
    font = loadFont('assets/Roboto-Bold.ttf');
}

function setup() {
    createCanvas(2000, 1000);
    stroke(0);
    fill(0, 0, 0);

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

    function CreatePointsFromString(str) {
        this.points = font.textToPoints(str, 0, 0, 600, {
            sampleFactor: 0.05,
            simplifyThreshold: 0
        });
    }

    function drawPoints(points, color = [0, 0, 0], weight = 5) {
        beginShape(POINTS);

        translate((width / 2) - 1000, (height / 2) + 300);

        points.forEach((point) => {
            stroke(...color);
            strokeWeight(weight);

            vertex(point.x, point.y);

            point.edges = 0;
        })
        endShape();
    }

    function drawLines(textObj, color= [0, 0, 0], distance = 50) {
        beginShape();
        stroke(...color);
        strokeWeight(1);

        for (let i = 0; i < textObj.points.length; i++) {
            // if the next node exists
            if (textObj.points[i + 1]) {
                if (dist(textObj.points[i].x, textObj.points[i].y, textObj.points[i + 1].x, textObj.points[i + 1].y) < distance) {
                    line(textObj.points[i].x, textObj.points[i].y, textObj.points[i + 1].x, textObj.points[i + 1].y);
                    textObj.points[i].edges += 1;
                    textObj.points[i + 1].edges += 1;
                } else {
                    // look for the closest neighbor
                    for (let j = 0; j < textObj.points.length; j++) {
                        if (dist(textObj.points[i].x, textObj.points[i].y, textObj.points[j].x, textObj.points[j].y) < distance) {
                            line(textObj.points[i].x, textObj.points[i].y, textObj.points[j].x, textObj.points[j].y);

                            console.log('test');
                        }
                    }
                }
            }
        }

        endShape();
    }

    function findDisconnectedPoints(textObj, color = [0, 0, 0], threshold) {
        beginShape(POINTS);

        for (let i = 0; i < textA.points.length; i++) {
            if (textA.points[i].edges < threshold) {
                stroke(255, 0, 0);
                strokeWeight(5);

                vertex(textA.points[i].x, textA.points[i].y);

                console.log(textA.points[i]);
            }
        }
        endShape();
    }

    let textA = new CreatePointsFromString('Hello');
    drawPoints(textA.points, [100, 100, 100]);
    drawLines(textA, [100, 100 ,100], 25);
    findDisconnectedPoints(textA, [255, 0, 0], 2);

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