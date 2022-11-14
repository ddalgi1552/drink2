const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);
let state = 1

const product = [
  "술 1잔", '물', "술 2잔", "술 3잔", "벌칙주", "의리주", '링겔주', "러브샷", "물",
];

const colors = ["#FF7186", "#77963C", "#FF7186", "#77963C", "#AAD156", "#77963C", "#AAD156", "#77963C", "#AAD156", "#FF7186", "#FF7186"];



const newMake = () => {
    const [cw, ch] = [$c.width / 2, $c.height / 2];
    const arc = Math.PI / (product.length / 2);
  
    for (let i = 0; i < product.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = colors[i % (colors.length -1)];
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
      ctx.fill();
      ctx.closePath();
    }

    ctx.fillStyle = "#fff";
    ctx.font = "15px Pretendard";
    ctx.textAlign = "center";
    // ctx.style.lineHeight = "10px";

    for (let i = 0; i < product.length; i++) {
      const angle = (arc * i) + (arc / 2);

      ctx.save()  ;

      ctx.translate(
        cw + Math.cos(angle) * (cw - 50),
        ch + Math.sin(angle) * (ch - 50),
      );

      ctx.rotate(angle + Math.PI / 2);

      product[i].split(" ").forEach((text, j) => {
        ctx.fillText(text, 0, 30 * j);
      });

      ctx.restore();
    }
}

const rotate = () => {
  if(state){
    $c.style.transform = `initial`;
    $c.style.transition = `initial`;
    
    setTimeout(() => {
      state = 0
      const ran = Math.floor(Math.random() * product.length);

      const arc = 360 / product.length;
      const rotate = (ran * arc) + 3600 + (arc * 3) - (arc/4);
      
      $c.style.transform = `rotate(-${rotate}deg)`;
      $c.style.transition = `2s`;
      
      setTimeout(() => {
        modalOn(`${product[ran]}`)
        state = 1
      }, 2000);
        
      setTimeout(() => {
        if(`${product[ran]}`=="물"){
          document.getElementById("modal-Image").src="./모달5.png"
          document.getElementById("title-Text").innerText="탈출 성공!"

          setTimeout(() => {
            location.href='../7.day5/index.html'},3000);
      }
        else{
          //modal 이미지를 랜덤으로 지정하기 위한 array
          const modalArr=["./모달1.png","./모달2.png","./모달3.png","./모달4.png"]
          const randomModal = Math.floor(Math.random() * modalArr.length)

          document.getElementById("modal-Image").src=`${modalArr[randomModal]}`
          
        }
      }, 2500);
        
    }, 1);
  }
  
};
newMake();


  //nav bar button
  
  let backBtn = document.getElementById("backbtn")
  let homeBtn = document.getElementById("homebtn")
  let nextBtn = document.getElementById("nextbtn")
  
  
  function back(){
      location.href=('../5.day3/index.html');
  }
  
  function home(){
      location.href=('../2.메인페이지/index.html');
  }
  
  function next(){
      location.href=('../7.day5/index.html');
  }
  
  



//모달

const modal = document.getElementById("modal")

function modalOn(prod) {
    modal.style.display = "flex"
    document.getElementById("content").innerText =`당신의 결과는 ${prod} 마시기`
  
}

function isModalOn() {
    return modal.style.display === "flex"
}

function modalOff() {
    modal.style.display = "none"
}


const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
    modalOff()
})

modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("modal-overlay")) {
        modalOff()
    }
})

window.addEventListener("keyup", e => {
    if(isModalOn() && e.key === "Escape") {
        modalOff()
    }
})