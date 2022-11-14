const btnElm=document.getElementById('btn');
btnElm.addEventListener('click',go);
let a=0

function go(){
  
    if(a>=7){
      alert(`아이고... 간이 비명을 지릅니다! 당신의 점수는 ${a}점!`)
    }else if(7>a && a>3){
      alert(`술을 좀 줄이셔야겠어요. 당신의 점수는 ${a}점!`)
    }else{alert(`머..그래도 금주하세요. 당신의 점수는 ${a}점!`)}

  
    location.href='../2.메인페이지/index.html'
  }

  //체크박스가 4개면 심각, 3개면 줄이셔야겠군요, 2개면 적게드세요 1개면 노력해볼까요 0개면 그래도 금주해볼까요

  function getCheckedCnt()  {
    // 선택된 목록 가져오기
    const query = 'input[name="drink"]:checked';
    const selectedElements = 
        document.querySelectorAll(query);
    
    // 선택된 목록의 갯수 세기
    const selectedElementsCnt =
          selectedElements.length;
    
    // 출력
    return a=selectedElementsCnt
  }
  getCheckedCnt()
//체크버튼 누르면 리스트에 추가됨
//전송버튼누르면 리스트에 몇개가있는지 확인해서 결과를 표시한다

  //location.href='../2.메인페이지/index.html'

  