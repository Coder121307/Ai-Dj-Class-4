leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
LeftWristScore = 0;
song="";


function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is initilized');
}


function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        LeftWristScore = results[0].pose.keypoints[9].score;
        console.log("LeftWristScore ="+ LeftWristScore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWrist = results[0].pose.rightWrist.y;
        console.log("leftWristX = "+ leftWristX + "leftWristY = "+ leftWristY + "rightWristX = "+ rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("FF0000");
    stroke("FF0000");
    if(LeftWristScore > 0.2){

    
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimal = floor(InNumberleftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "volume = "+ volume;
    song.setVolume(volume);
    }
}

function play_sound(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
