//button sound making
alert("Shubham this side. Thanks for visiting my site. I just appriciate you to test my work. 🥳🥳🥳 Please use your PC. As it can be only operated on PC.")

var noOfDrumButtons = document.querySelectorAll(".drum").length;

for(var i = 0; i<noOfDrumButtons ; i++){

    document.querySelectorAll(".drum")[i].addEventListener("click" , function(){
        // this.style.color="white";
        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML)
        buttonAnimation(buttonInnerHTML);

    });
}

// search var audio = in google you will get something new to learn

// var audio = new Audio("sounds/tom-1.mp3");
//         audio.play();


document.addEventListener("keydown", function(event){
    makeSound(event.key);
    buttonAnimation(event.key);
});



// key sound making

function makeSound(key){

    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();               
            break;
            case "a":
                var tom2 = new Audio("sounds/tom-2.mp3");
                tom2.play();
                break;
            case "s":
                var tom3 = new Audio("sounds/tom-3.mp3");
                tom3.play();
                break;
            case "d":
                var tom4 = new Audio("sounds/tom-4.mp3");
                tom4.play();
                break;
            case "j":
                var snare = new Audio("sounds/snare.mp3");
                snare.play();
                break;
            case "k":
                var crash = new Audio("sounds/crash.mp3");
                crash.play();
                break;
            case "l":
                var kick = new Audio("sounds/kick-bass.mp3");
                kick.play();
                break;
            default:console.log(buttonInnerHTML);
    }
}





function buttonAnimation(currentKey){
   var activeButton = document.querySelector("." + currentKey);
   activeButton.classList.add("pressed");
   setTimeout(function(){
    activeButton.classList.remove("pressed")
   }, 100);
}