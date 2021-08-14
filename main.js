Webcam.set({
    width: 350,
    height: 300, 
    img_format:"png",
    png_quality: 90
});
camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'capture_image' src = '" + data_uri + "'>";
    })
}

console.log("ml5_version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/HJbSkArMc/model.json',modelLoaded);

function modelLoaded(){
 console.log("modelLoaded");
} 

function speak() {
    var synthesis = window.speechSynthesis;
    speak_data1 = "The First Prediction Is " +prediction_1;
    speak_data2 = "And The Second Prediction Is " +prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synthesis.speak(utterthis);
}


function check() {
    Img = document.getElementById("capture_image");
    classifier.classify(Img, gotResult);

}

function gotResult(error,results) {
    if (error) {console.error(error);}
    else {console.log(results);
       document.getElementById("result_emotion_name").innerHTML = results[0].label;
       document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
       prediction_1 = results[0].label;
       prediction_2 = results[1].label;
       speak();
        if (results[0].label == "Nice One!") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";

        }
        if (results[0].label == "Not So Good") {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
            
        }
        if (results[0].label == "Good Job!") {
            document.getElementById("update_emoji").innerHTML = "&#128079;";
            
        }
        if (results[1].label == "Nice One!") {
            document.getElementById("update_emoji_2").innerHTML = "&#128077;";
        }

        
        if (results[1].label == "Not So Good") {
            document.getElementById("update_emoji_2").innerHTML = "&#128078;";  
        }
        
        
        if (results[1].label == "Good Job!") {
            document.getElementById("update_emoji_2").innerHTML = "&#128079;";
            
        }
    }


}