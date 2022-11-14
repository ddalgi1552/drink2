let a = 0
let state = 1
let score = document.getElementById('score')
const MAX = 50
let flag = 0
function enterkey() {
    if(!flag){
        if (window.event.keyCode == 37 && state == 0) {
            document.getElementById("img").src = "./막걸리흔들기1.png";
            state = 1
            a++
        }
        if (window.event.keyCode == 39 && state == 1) {
            document.getElementById("img").src = "./막걸리흔들기2.png";
            state = 0
            a++
        }
    }
    if (a >= MAX && !flag) {
    
        document.getElementById("realback").style.backgroundImage=`url(${'./막걸리펑.jpg'})` ;
        console.log("실행되고있습니다")
        flag = 1
        setTimeout(function() {
            document.getElementById("img").style.scale="2";
            document.getElementById("img").style.transition="0.2s";
        })
        setTimeout(function() {
            document.getElementById("img").style.scale="1.5";
            document.getElementById("img").style.transition="0.2s";
        },300)
        setTimeout(function() {
            document.getElementById("img").style.scale="3";
            document.getElementById("img").style.transition="0.2s";
        },500)

        setTimeout(function() {
            document.getElementById("img").src = "./막걸리터짐.png";
        },600)
        setTimeout(function() {
            alert("1일차 무사히 성공!")
            next()
          }, 700);
    }
    return document.getElementById('score').innerHTML=`<h2>${a}</h2>`

}




window.addEventListener("keydown", (e) => {
    const key = document.getElementById(e.key);
    if (key) key.classList.add("pressed");
  });
  
  window.addEventListener("keyup", (e) => {
    const key = document.getElementById(e.key);
    if (key) key.classList.remove("pressed");
  });






  //nav bar button
  
let backBtn = document.getElementById("backbtn")
let homeBtn = document.getElementById("homebtn")
let nextBtn = document.getElementById("nextbtn")


function back(){
    location.href=('../2.메인페이지/index.html');
}

function home(){
    location.href=('../2.메인페이지/index.html');
}

function next(){
    location.href=('../4.day2/index.html');
}


