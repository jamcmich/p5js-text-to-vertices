let font;
function preload() {
    font = loadFont('assets/Roboto-Bold.ttf');
}

function setup() {
    createCanvas(1000, 1000);
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

function draw() {
    background(225, 225, 225);

    function CreatePointsFromString(str) {
        this.points = font.textToPoints(str, 0, 0, 600, {
            sampleFactor: 0.05,
            simplifyThreshold: 0
        });
    }

    function drawTextPoints(textObj) {
        beginShape(POINTS);
        stroke(0, 0, 0);
        strokeWeight(5);

        translate((width / 2) - 300, (height / 2) + 300);

        // draw points
        for (let i = 0; i < textObj.points.length; i++) {
            vertex(textObj.points[i].x, textObj.points[i].y);
        }

        // add edges property to each point in textObj
        textObj.points.forEach((point) => {
            point.edges = 0;
        })

        endShape();
    }

    function drawLinesBetweenPoints(textObj, distance = 50) {
        beginShape();
        stroke(0, 0, 0);
        strokeWeight(1);

        for (let i = 0; i < textObj.points.length; i++) {
            if (textObj.points[i + 1]) {
                if (dist(textObj.points[i].x, textObj.points[i].y, textObj.points[i + 1].x, textObj.points[i + 1].y) < distance) {
                    line(textObj.points[i].x, textObj.points[i].y, textObj.points[i + 1].x, textObj.points[i + 1].y);
                    textObj.points[i].edges += 1;
                    textObj.points[i + 1].edges += 1;

                    // if (textObj.points[i] === textObj.points[textObj.points.length - 1]) {
                    //     line(textObj.points[i].x, textObj.points[i].y, textObj.points[0].x, textObj.points[0].y);
                    // }
                }
            }
        }

        endShape();
    }

    let textA = new CreatePointsFromString('A');
    drawTextPoints(textA);
    drawLinesBetweenPoints(textA);

    for (let p in textA.points) {
        if (textA.points[p].edges < 2) {
            console.log(textA.points[p])
        }
    }

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