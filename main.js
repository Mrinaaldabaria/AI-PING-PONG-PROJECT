video="";
obj_name="";
objects=[];

function preload(){

}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(480,380);
}

function draw(){
    image(video, 0, 0,480, 380);
    if(status != ""){
        objectDetector.detect(video,gotResults);
        for (var i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill("red");
            percent = floor(objects [i].confidence * 100);
            text(objects [i].label +" " + percent + "%", objects [i].x + 15, objects [i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects [i].label == obj_name){
                video.stop();
                document.getElementById("number_of_objects").innerHTML = obj_name + " Found! ";
            }
            else{
                document.getElementById("number_of_objects").innerHTML = obj_name + " Not Found! ";
            }
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    obj_name = document.getElementById("object").value;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
