let num = 0;
const SPEED = 0.1
let data= new Array();
let state = 1
let score = document.getElementById("score")
let interval = setInterval(function(){
  num+=SPEED;
  if (state) {
    enlarge();
  }
  score.innerHTML=`<h2>${Math.floor(num)+1}</h2>`
  // score.innerText=`${Math.floor(num)+1}`
  //스케일이 마이너스가 되니까 뒤집히네 ㅋㅋㅋ아놔
}, 100)

//크기를 키우는 함수
//0보다 작아지면 이미지를 바꾼다.
function enlarge(){
  if (document.getElementById("img").style.scale <=8 && document.getElementById("img").style.scale >=0){
    document.getElementById("img").style.scale=`${num}`
  }else if (document.getElementById("img").style.scale >=8){
    alert("gameover!")
    state = 0
    location.href='../4.day2/index.html'

  }else{
    document.getElementById("img").src="./소주x.png"
    state = 0
    clearInterval(interval)
    alert("2일차 금주 성공!")
    setTimeout(function() {
     next()
  },1000)
  }
}

//인풋값을 받아온다...

function printName()  {
  const ideaValue = document.getElementById('ideainputbox').value;
  // document.getElementById("result").innerText= data;
  data.push(ideaValue)
  //인풋값의 갯수를 측정한다, 그 수 만큼 크기를 줄인다
  document.getElementById("ideainputbox").value= "";
  if (ideaValue) {
    num -= 1
  }
//랜덤으로 텍스트 표시하기
  for(let i=0; i<30; i++){
    let t= document.createElement("div");
    t.innerText = ideaValue
    t.className = "randomText"
    t.style.color = randomColor()
    t.style.fontSize= randomBH(10,40)+"px";
    t.style.left= Math.random()*screen.availWidth+ "px";
    t.style.top= Math.random()*screen.availHeight+ "px";
    document.body.appendChild(t);
  }
}

function randomColor(){
  const colors = ["darkblue","white",'black'];
  const randomValue = colors[Math.floor(Math.random() * colors.length)];
  return randomValue
}

function randomBH(min, max){
  min= Math.ceil(min);
  max=Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;

}


  //nav bar button
  
  let backBtn = document.getElementById("backbtn")
  let homeBtn = document.getElementById("homebtn")
  let nextBtn = document.getElementById("nextbtn")
  
  
  function back(){
      location.href=('../3.day1/index.html');
  }
  
  function home(){
      location.href=('../2.메인페이지/index.html');
  }
  
  function next(){
      location.href=('../5.day3/index.html');
  }
  
  
  
