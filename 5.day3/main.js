var tt;
let count= 0
let score = document.getElementById("score")
$( function() {
  for(let i=0; i<10; i++) {
    $( `#draggable${i}` ).draggable();
    $( `#draggable${i}` ).on('dragstart', function(evt) {
         tt = event.target.id;                    
     });

    $( `#droppable${i}` ).droppable({
      drop: function( event, ui ) {

     
        $(`#roo${i}`).attr("src","홍학4.png");
        document.getElementById("soju" + tt.slice(4,5)).style.display = "none";
        count++
        if (count==10){
          alert("3주차 금주 완료!")
          next()
        }
        score.innerHTML= `<h2>${count}</h2>`
      }
    });
}


} );



  //nav bar button
  
  let backBtn = document.getElementById("backbtn")
  let homeBtn = document.getElementById("homebtn")
  let nextBtn = document.getElementById("nextbtn")
  
  
  function back(){
      location.href=('../4.day2/index.html');
  }
  
  function home(){
      location.href=('../2.메인페이지/index.html');
  }
  
  function next(){
      location.href=('../6.day4/index.html');
  }
  
  
  
