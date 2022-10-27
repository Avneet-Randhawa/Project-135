var Status = "";
var objecttoidenify = "";
objects = [];

function preload() {
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    synth = window.speechSynthesis;
}

function start() {
    objecttoidenify = document.getElementById("obj-name").value;
    objectDetector = ml5.objectDetector('cocossd', modeloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects!!!";
    document.querySelector("#found").innerHTML = objecttoidenify + " Not Found";
}

function modeloaded() {
    console.log("Model Is Loaded!!!");
    Status = true;
}

function got_results(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;

    }
}

function draw() {

    image(video, 0, 0, 380, 380);
    
    if (Status != "") {

        objectDetector.detect(video, got_results);
        document.getElementById("status").innerHTML = "Status : Objects Detected";

        for (i = 0; i < objects.length; i++) {
            stroke("rgb(255,0,0)");
            noFill();
            textFont("cursive");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == objecttoidenify) {
                console.log(objecttoidenify + " Found");
                document.getElementById("found").innerHTML = objecttoidenify + " Found";
                utterThis = new SpeechSynthesisUtterance(objects[i].label + " "+ "Found");
                synth.speak(utterThis);
                video.stop();
                objectDetector.detect(got_results);
                document.getElementById("found").innerHTML = objecttoidenify + " Found";
            }
        }
    }
}
